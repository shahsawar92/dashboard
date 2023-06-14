import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Paper";
import { useLocation } from "react-router";
import { fetchContactList } from "../../services/apiService";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { AlertTitle, Button } from "@mui/material";
import { useTableExport } from "../../services/customHooks/useExportTable";

function createData(name, phone) {
  return { name, phone };
}

export default function ContactList() {
  const location = useLocation();
  const { userIdenc } = location.state || {};
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = userIdenc;
  const { tableRef, exportTableData } = useTableExport();

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);
        setError(null);
        setContactList([]);

        const contactResponse = await fetchContactList(userId);
        console.log("contact response:", contactResponse);
        const parsedResponse = JSON.parse(contactResponse);

        if (contactResponse.includes("error")) {
          setError(parsedResponse.error);
        } else {
          setContactList(parsedResponse);
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
  console.log("contact list:", contactList);

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
              <TableCell>Name</TableCell>
              <TableCell align="left">Phone Number</TableCell>
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

  if (!contactList || contactList.length === 0) {
    return <Typography>No contacts found!</Typography>;
  }

  tableRows = contactList?.contact?.map((eachcontact, key) => {
    return (
      <TableRow key={key}>
        <TableCell>{eachcontact?.name}</TableCell>
        <TableCell>{eachcontact?.number}</TableCell>
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
      <TableContainer component={Card} ref={tableRef}>
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
    </>
  );
}
