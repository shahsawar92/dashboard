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
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { AlertTitle, Button } from "@mui/material";
import { useTableExport } from "../../services/customHooks/useExportTable";
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
  const { tableRef, exportTableData } = useTableExport();
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
    let errorMessage = "Client is not responding. Please try again later.";

    return (
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Latitude</TableCell>
              <TableCell align="left">Longitude</TableCell>
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

  if (!locationList || Object.entries(locationList.location).length === 0) {
    return (
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <Alert severity="warning">
                <Typography>No location fetched!</Typography>
              </Alert>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

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
              <TableCell>Latitude</TableCell>
              <TableCell align="left">Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.entries(locationList?.location)?.map(([key, value]) => {
                return <TableCell key={key}>{value}</TableCell>;
              })}
              <TableCell align="left">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${locationList?.location?.latitude},${locationList?.location?.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AddLocationAltIcon style={{ fontSize: "2rem" }} />
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
