import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Paper";
import { useLocation } from "react-router";
import { fetchCallsList, fetchcallLogsList } from "../../services/apiService";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

function createData(name, phone) {
  return { name, phone };
}

export default function CallLogs() {
  const location = useLocation();
  const { userIdenc } = location.state || {};
  const [callLogsList, setcallLogsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = userIdenc;

  useEffect(() => {
    const fetchContactData = async () => {
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

    fetchContactData();
  }, [userId]);

  let tableRows = [];
  console.log("contact list:", callLogsList);

  if (loading) {
    return (
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton animation="wave" height={20} width="80%" />
              </TableCell>
              <TableCell align="left">
                <Skeleton animation="wave" height={20} width="50%" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
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
    return (
      <Alert severity="error">
        <Typography>Error: {error.message}</Typography>
      </Alert>
    );
  }

  if (!callLogsList || callLogsList?.call_logs?.length === 0) {
    return (
      <Alert severity="warning">
        <Typography>No contacts found!</Typography>
      </Alert>
    );
  }

  tableRows = callLogsList?.call_logs?.map((eachcontact, key) => {
    return (
      <TableRow key={key}>
        <TableCell>{eachcontact?.name}</TableCell>
        <TableCell>{eachcontact?.number}</TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Card}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
