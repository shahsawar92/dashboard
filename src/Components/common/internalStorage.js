import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Paper";
import { useLocation } from "react-router";
import { fetchInternalStorage } from "../../services/apiService";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { Button } from "@mui/material";

function createData(name, phone) {
  return { name, phone };
}

const rows = [createData("hey", "123")];

export default function InternalStorage() {
  const [currentPath, setCurrentPath] = useState("");
  const location = useLocation();
  const { userIdenc } = location.state || {};
  const [filesList, setFilesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = userIdenc;

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
        console.log("storage api response:", contactResponse);
        const parsedResponse = JSON.parse(contactResponse);
        console.log("parsed response when clicked anything:", parsedResponse);
        if (contactResponse?.includes("error")) {
          setError(parsedResponse.error);
        } else {
          setFilesList(parsedResponse);
          setCurrentPath(newPath);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch storage list:", error);
      setError(error);
      setLoading(false);
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
      console.log("storage api response:", contactResponse);
      const parsedResponse = JSON.parse(contactResponse);
      console.log("parsed response when going back:", parsedResponse);
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
        console.log("storage api response:", contactResponse);
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

  if (!filesList || filesList?.files.length === 0) {
    return (
      <Alert severity="info">
        {" "}
        <Typography>
          No files found!{" "}
          <Button variant="contained" onClick={handleGoBack}>
            BACK
          </Button>
        </Typography>
      </Alert>
    );
  }

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
          {filesList?.files?.map((eachfile, key) => {
            return (
              <TableRow key={key}>
                <TableCell
                  style={{ cursor: "pointer" }}
                  align="center"
                  onClick={() => {
                    handleFileClick(eachfile);
                  }}
                >
                  {eachfile?.name}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
