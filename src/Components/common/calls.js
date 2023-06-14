import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Paper";
import { useLocation } from "react-router";
import { fetchCallsList } from "../../services/apiService";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { AlertTitle, Button } from "@mui/material";
import { useTableExport } from "../../services/customHooks/useExportTable";

export default function CallLogs() {
  const location = useLocation();
  const { userIdenc } = location.state || {};
  const [callLogsList, setcallLogsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = userIdenc;
  const { tableRef, exportTableData } = useTableExport();

  useEffect(() => {
    const fetchCallLogs = async () => {
      try {
        setLoading(true);
        setError(null);
        setcallLogsList([]);

        const contactResponse = await fetchCallsList(userId);
        const parsedResponse = JSON.parse(contactResponse);

        if (contactResponse.includes("error")) {
          setError(parsedResponse.error);
        } else {
          setcallLogsList(parsedResponse);
        }

        setLoading(false); // Set loading to false after successful data fetch
      } catch (error) {
        console.error("Failed to fetch contact list:", error);
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading to false even in case of an error
      }
    };

    fetchCallLogs();
  }, [userId]);

  let tableRows = [];
  console.log("call logs:", callLogsList);

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
              <TableCell>Type</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="left">Duration</TableCell>
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

  if (!callLogsList || callLogsList?.call_logs?.length === 0) {
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
                <Typography>No call logs found found!</Typography>
              </Alert>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  tableRows = callLogsList?.call_logs?.map((eachcontact, key) => {
    const dateObject = new Date(eachcontact?.date);
    const date = dateObject.toLocaleDateString();
    const time = dateObject.toLocaleTimeString();
    const timeinmin = eachcontact?.durationInSec / 60;
    return (
      <TableRow key={key}>
        <TableCell>{eachcontact?.type}</TableCell>
        <TableCell>{eachcontact?.number}</TableCell>
        <TableCell>{timeinmin}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{time}</TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Card}>
      <Button variant="contained" onClick={() => exportTableData}>
        {" "}
        Export{" "}
      </Button>
      <Table aria-label="simple table" ref={tableRef}>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="left">Phone Number</TableCell>
            <TableCell align="left">Duration</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
