import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import { Users } from "../../utils/store/users.js";

export default function SidebarTest() {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    setSelectedUser((prevUser) => (prevUser === user ? null : user));
  };

  const UsersList = () => {
    return (
      <List sx={{ marginTop: "32px" }}>
        {Users.map((user, key) => (
          <React.Fragment key={key}>
            <ListItem
              button
              onClick={() => handleUserClick(user)}
              selected={selectedUser === user}
              sx={{
                paddingLeft: "24px",
                paddingRight: "24px",
                "&:hover": {
                  backgroundColor: "#343541",
                },
              }}
            >
              <ListItemIcon>
                <PersonIcon style={{ color: "#b4c7c5" }} />
              </ListItemIcon>
              <ListItemText primary={user.name} />
              {selectedUser === user ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            {selectedUser === user && list(user.id)}
          </React.Fragment>
        ))}
      </List>
    );
  };

  const handleListItemClick = (userId, text) => {
    navigate(`/user/${userId}/${text.toLowerCase()}`);
  };

  const list = (userId) => (
    <>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem
            key={text}
            button
            component={Link}
            to={`/user/${userId}/${text.toLowerCase()}`}
            onClick={() => handleListItemClick(userId, text)}
            sx={{
              paddingLeft: "32px",
              "&:hover": {
                backgroundColor: "#343541",
              },
            }}
          >
            <ListItemIcon>
              {index % 2 === 0 ? (
                <InboxIcon style={{ color: "#b4c7c5" }} />
              ) : (
                <MailIcon style={{ color: "#b4c7c5" }} />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            button
            component={Link}
            to={`/user/${userId}/${text.toLowerCase()}`}
            onClick={() => handleListItemClick(userId, text)}
            sx={{
              paddingLeft: "32px",
              "&:hover": {
                backgroundColor: "#343541",
              },
            }}
          >
            <ListItemIcon>
              {index % 2 === 0 ? (
                <InboxIcon style={{ color: "#b4c7c5" }} />
              ) : (
                <MailIcon style={{ color: "#b4c7c5" }} />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: "#2a313c",
          color: "#b4c7c5",
          width: 300,
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "24px",
            paddingRight: "24px",
            height: "50px",
            backgroundColor: "#00b1ff",
          }}
        >
          <LogoDevIcon
            style={{ color: "#fff", fontSize: "40px", marginTop: "7px" }}
          />
          <h2 style={{ color: "#fff", marginTop: "7px" }}>Admin</h2>
        </Box>
        <Box sx={{ flex: 1, overflowY: "auto" }}>{UsersList()}</Box>
      </Box>
    </Drawer>
  );
}
