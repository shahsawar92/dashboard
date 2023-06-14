import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Paper";
import { useLocation } from "react-router";
import { fetchCallsList, fetchMessagesList } from "../../services/apiService";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { AlertTitle, Button } from "@mui/material";
import { useTableExport } from "../../services/customHooks/useExportTable";

export default function MessagesLogs() {
  const location = useLocation();
  const { userIdenc } = location.state || {};
  const [messagesList, setmessagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = userIdenc;
  const { tableRef, exportTableData } = useTableExport();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        setmessagesList([]);

        const contactResponse = await fetchMessagesList(userId);
        const parsedResponse = JSON.parse(contactResponse);

        if (contactResponse.includes("error")) {
          setError(parsedResponse.error);
        } else {
          setmessagesList(parsedResponse);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contact list:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);

  let tableRows = [];
  console.log("messages:", messagesList);

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
              <TableCell align="left">Messages</TableCell>
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

  if (!messagesList || messagesList?.sms?.length === 0) {
    return (
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Messages</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Alert severity="warning">
                  <Typography>No Messages Found!</Typography>
                </Alert>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  tableRows = messagesList?.sms?.map((eachmsg, key) => {
    console.log("eachmsg:", eachmsg.date);
    const dateObject = new Date(Number(eachmsg?.date));
    console.log("dateObject:", dateObject);

    const date = dateObject.toLocaleDateString();
    const time = dateObject.toLocaleTimeString();
    return (
      <TableRow key={key}>
        <TableCell>{eachmsg?.address}</TableCell>
        <TableCell>{eachmsg?.body}</TableCell>

        <TableCell>{date}</TableCell>
        <TableCell>{time}</TableCell>
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
              <TableCell>To</TableCell>
              <TableCell align="left">Body</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Sent Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
