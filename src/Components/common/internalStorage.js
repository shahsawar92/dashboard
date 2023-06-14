import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Paper";
import { useLocation } from "react-router";
import {
  BASE_URL,
  fetchInternalFile,
  fetchInternalStorage,
} from "../../services/apiService";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { AlertTitle, Box, Button } from "@mui/material";
import { toast } from "react-toastify";

export default function InternalStorage() {
  const location = useLocation();
  const { userIdenc } = location.state || {};
  const [filesList, setFilesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = userIdenc;
  const [currentPath, setCurrentPath] = useState("");
  console.log("currentPath:", currentPath);

  const handleFileClick = async (file) => {
    const newPath = currentPath ? `${currentPath}/${file?.name}` : file?.name;
    try {
      if (file.isFile) {
        console.log("Do something with the file:", file.name);
      } else {
        setLoading(true);
        setError(null);
        setFilesList([]);

        const contactResponse = await fetchInternalStorage(userId, newPath);
        const parsedResponse = JSON.parse(contactResponse);
        if (contactResponse?.includes("error")) {
          setError(parsedResponse.error);
        } else {
          setFilesList(parsedResponse);
          setCurrentPath(newPath);
        }
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleDownload = async (file) => {
    const newPath = currentPath ? `${currentPath}/${file?.name}` : file?.name;
    const fullPath = `/storage/emulated/0/${newPath}`;
    try {
      const contactResponse = await fetchInternalFile(userId, fullPath);
      const parsedResponse = JSON.parse(contactResponse);
      window.open(
        BASE_URL + "command/download/" + parsedResponse.filename,
        "_blank"
      );
    } catch (error) {
      toast.Alert("Internal server error occurred. Please try again later.");
      if (error.response && error.response.status === 500) {
        // Handle the internal server error
        console.log("Internal server error occurred. Please try again later.");
        toast.Alert("Internal server error occurred. Please try again later.");
        // You can show an error message to the user or perform any necessary actions
      } else {
        setCurrentPath("");
        setError(error);
        setLoading(false);
      }
    }
  };

  const handleGoBack = async () => {
    try {
      setLoading(true);
      setError(null);
      setFilesList([]);

      const pathSegments = currentPath.split("/");
      pathSegments.pop();
      const parentPath = pathSegments.join("/");

      const contactResponse = await fetchInternalStorage(userId, parentPath);
      const parsedResponse = JSON.parse(contactResponse);
      if (contactResponse?.includes("error")) {
        setError(parsedResponse.error);
      } else {
        setFilesList(parsedResponse);
        setCurrentPath(parentPath);
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch storage list:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInternalStorageList = async () => {
      try {
        setLoading(true);
        setError(null);
        setFilesList([]);

        const contactResponse = await fetchInternalStorage(userId);
        const parsedResponse = JSON.parse(contactResponse);

        if (contactResponse?.includes("error")) {
          setError(parsedResponse.error);
        } else {
          setFilesList(parsedResponse);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch storage list:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchInternalStorageList();
  }, [userId]);

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
              <TableCell align="right">
                <Button variant="contained" onClick={handleGoBack}>
                  BACK
                </Button>
              </TableCell>
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

  if (!filesList || filesList?.files.length === 0) {
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>No Files fetched!</Typography>
                  <Button
                    variant="contained"
                    onClick={handleGoBack}
                    sx={{ marginLeft: "50px" }}
                  >
                    BACK
                  </Button>
                </Box>
              </Alert>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer component={Card}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="right">
              <Button variant="contained" onClick={handleGoBack}>
                BACK
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filesList?.files?.map((eachfile, key) => {
            return (
              <TableRow key={key}>
                <TableCell
                  style={{ cursor: "pointer" }}
                  align="left"
                  onClick={() => {
                    handleFileClick(eachfile);
                  }}
                >
                  {eachfile?.name}
                </TableCell>
                <TableCell align="center">
                  {eachfile?.isFile && (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleDownload(eachfile);
                      }}
                    >
                      Download
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
