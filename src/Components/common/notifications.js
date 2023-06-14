import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Paper";
import { useLocation } from "react-router";
import { fetchNotifications } from "../../services/apiService";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { AlertTitle, Button } from "@mui/material";
import { useTableExport } from "../../services/customHooks/useExportTable";

export default function NotificationsList() {
  const location = useLocation();
  const { userIdenc } = location.state || {};
  const [notificationsList, setnotificationsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = userIdenc;
  const { tableRef, exportTableData } = useTableExport();

  useEffect(() => {
    const fetchNotificationsList = async () => {
      try {
        setLoading(true);
        setError(null);
        setnotificationsList([]);

        const parsedResponse = await fetchNotifications(userId);
        if (parsedResponse.includes("error")) {
          setError(parsedResponse.error);
        } else {
          setnotificationsList(parsedResponse);
        }

        setLoading(false); // Set loading to false after successful data fetch
      } catch (error) {
        console.error("Failed to fetch contact list:", error);
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading to false even in case of an error
      }
    };

    fetchNotificationsList();
  }, [userId]);

  let tableRows = [];
  console.log("notifications:", notificationsList);

  if (loading) {
    return (
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton animation="wave" height={20} width="20%" />
              </TableCell>
              <TableCell align="left">
                <Skeleton animation="wave" height={20} width="20%" />
              </TableCell>
              <TableCell align="left">
                <Skeleton animation="wave" height={20} width="20%" />
              </TableCell>
              <TableCell align="left">
                <Skeleton animation="wave" height={20} width="20%" />
              </TableCell>
              <TableCell align="left">
                <Skeleton animation="wave" height={20} width="20%" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Skeleton animation="wave" height={50} />
              </TableCell>
              <TableCell colSpan={2}>
                <Skeleton animation="wave" height={50} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (error) {
    let errorMessage = "Client is not responding. Please try again later.";

    return (
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Text</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  <Typography>{errorMessage}</Typography>
                </Alert>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (!notificationsList || notificationsList?.length === 0) {
    return (
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Call Logs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <Alert severity="warning">
                <Typography>No notifications found!</Typography>
              </Alert>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  tableRows = notificationsList?.map((eachcontact, key) => {
    const dateObject = new Date(eachcontact?.date);
    const date = dateObject.toLocaleDateString();
    const time = dateObject.toLocaleTimeString();
    return (
      <TableRow key={key}>
        <TableCell align="left">{eachcontact?.Package}</TableCell>
        <TableCell align="left">{eachcontact?.titleText}</TableCell>
        <TableCell align="left">{eachcontact?.notificationBodyText}</TableCell>
        <TableCell align="left">{date}</TableCell>
        <TableCell align="left">{time}</TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <Button
        variant="contained"
        onClick={() => exportTableData()}
        style={{
          marginBottom: "16px",
          marginLeft: "auto",
          marginRight: "16px",
          display: "block",
        }}
      >
        Export
      </Button>

      <TableContainer component={Card}>
        <Table aria-label="simple table" ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Text</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
