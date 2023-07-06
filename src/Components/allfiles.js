import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Paper";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { AlertTitle, Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import { BASE_URL, fetchInternalFile, getAllfiles } from "../services/apiService";
import { groupFilesByDate } from "../utils/helper";
// import { BASE_URL, getAllfiles, getdcimfile } from "../../../services/apiService";


export default function AllFiles() {
  const location = useLocation();
  const { userIdenc } = location.state || {};
  const [filesList, setFilesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = userIdenc;
  const [currentPath, setCurrentPath] = useState("");
  console.log("currentPath:", currentPath);
  const [empty, setEmpty] = useState(false);
console.log("filesList:", filesList);
  const handleFileClick = async (file) => {
    const newPath = currentPath ? `${currentPath}/${file?.name}` : file?.name;
    console.log("newPath:", newPath);
    try {
      if (file.isFile) {
        console.log("Do something with the file:", file.name);
      } else {
        setLoading(true);
        setError(null);
        setEmpty(false);
        setFilesList([]);
  
        const contactResponse = await getAllfiles(userId, newPath);
        console.log("response afterback:", contactResponse);
        const parsedResponse = JSON.parse(contactResponse);
        if (parsedResponse.files.length === 0) {
          setEmpty(true);
          setCurrentPath(newPath);
        } else {
          setFilesList(parsedResponse);
          setCurrentPath(newPath);
        }
        console.log("after setting current path:", currentPath);
      }
      setLoading(false);
    } catch (error) {
      console.log("catch:", error);
       setError(error);
      setLoading(false);
    }
  };
  
  const handleDownload = async (file) => {
    // const newPath = currentPath ? `${currentPath}/${file?.name}` : file?.name;
    // const fullPath = `/${newPath}`;

    try {
      const contactResponse = await fetchInternalFile(userId, file?.path);
      const parsedResponse = JSON.parse(contactResponse);
      window.open(
        BASE_URL + "command/download/" + parsedResponse.filename,
        "_blank"
      );
    } catch (error) {
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
      setCurrentPath(parentPath);
        console.log("parentPath after poped", parentPath);
      const contactResponse = await getAllfiles(userId, parentPath);
      const parsedResponse = JSON.parse(contactResponse);
      setEmpty(false);
      
      if (contactResponse?.includes("error")) {
        setError(parsedResponse.error);
        setCurrentPath(parentPath);
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

        const contactResponse = await getAllfiles(userId);
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

  if (empty) {
    return (
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>WhatsApp</TableCell>
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
// Group the files by date
const groupedFiles = groupFilesByDate(filesList?.files);

console.log("groupedFiles", groupedFiles);
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
{Object.entries(groupedFiles).map(([date, files], key) => (
  <React.Fragment key={key}>
    <TableRow>
      <TableCell colSpan={2} align="center">
        <b>{date}</b>
      </TableCell>
    </TableRow>
    {files.map((file, index) => (
      <TableRow key={index}>
        <TableCell
          style={{ cursor: "pointer" }}
          align="left"
          onClick={() => {
            handleFileClick(file);
          }}
        >
          {file.name}
        </TableCell>
        <TableCell align="center">
          {file.isFile && (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  handleDownload(file);
                }}
              >
                Download
              </Button>
              <p>{date}</p>
            </>
          )}
        </TableCell>
      </TableRow>
    ))}
  </React.Fragment>
))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
