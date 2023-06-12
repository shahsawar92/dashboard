import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Paper";
import { useLocation } from "react-router";
import { fetchInstalledApps } from "../../services/apiService";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

function createData(name, phone) {
  return { name, phone };
}

export default function InstalledAppList() {
  const location = useLocation();
  const { userIdenc } = location.state || {};
  const [appsList, setappsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = userIdenc;

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);
        setError(null);
        setappsList([]);

        const contactResponse = await fetchInstalledApps(userId);
        console.log("contact response:", contactResponse);
        const parsedResponse = JSON.parse(contactResponse);

        if (contactResponse.includes("error")) {
          setError(parsedResponse.error);
        } else {
          setappsList(parsedResponse);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contact list:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchContactData();
  }, [userId]);

  let tableRows = [];
  console.log("contact list:", appsList);

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

  if (!appsList || appsList.length === 0) {
    return <Typography>No contacts found!</Typography>;
  }

  tableRows = appsList?.installed_apps?.map((eachapp, key) => {
    return (
      <TableRow key={key}>
        <TableCell>{eachapp}</TableCell>
        {/* <TableCell>{eachcontact?.number}</TableCell> */}
      </TableRow>
    );
  });

  return (
    <TableContainer component={Card}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Name</TableCell> */}
            <TableCell align="left">Installed Apps</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}
