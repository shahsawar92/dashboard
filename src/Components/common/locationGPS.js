import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Paper";
import { useLocation } from "react-router";
import { fetchLocationList } from "../../services/apiService";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

function createData(name, phone) {
  return { name, phone };
}

export default function LocationList() {
  const location = useLocation();
  const { userIdenc } = location.state || {};
  const [locationList, setlocationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = userIdenc;

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        setError(null);
        setlocationList([]);

        const LocationResponse = await fetchLocationList(userId);
        const parsedResponse = JSON.parse(LocationResponse);

        if (LocationResponse.includes("error")) {
          setError(parsedResponse.error);
        } else {
          setlocationList(parsedResponse);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contact list:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [userId]);

  let tableRows = [];

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

  if (!locationList || locationList.length === 0) {
    return <Typography>No contacts found!</Typography>;
  }

  tableRows = locationList?.location?.map((eachlocation, key) => {
    return (
      <TableRow key={key}>
        <TableCell>{eachlocation?.name}</TableCell>
        <TableCell>{eachlocation?.number}</TableCell>
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
