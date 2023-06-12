import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DefaultRouter from "../../router/router";
import PersonIcon from "@mui/icons-material/Person";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { Users } from "../../utils/store/users.js";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { fetchUsers } from "../../services/apiService";
const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedItem, setselectedItem] = useState();

  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userList.length === 0) {
          const users = await fetchUsers();
          setUserList(users);
          console.log("Users", users);
        }
      } catch (error) {
        console.error("Error fetching user list (sidebar):", error);
      }
    };

    fetchData();
  }, [userList]);

  const handleUserClick = (user) => {
    setSelectedUser((prevUser) => (prevUser === user ? null : user));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const UsersList = () => {
    return (
      <List sx={{ marginTop: "32px" }}>
        {userList === []
          ? "<div>No User Connected</div>"
          : userList?.map((user, key) => (
              <React.Fragment key={user?._id}>
                <ListItem
                  key={user?._id}
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
                  <ListItemText primary={user.device_name} />
                  {selectedUser === user ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </ListItem>
                {selectedUser === user && list(user._id)}
              </React.Fragment>
            ))}
      </List>
    );
  };

  const handleListItemClick = (userId, { name, path }) => {
    setselectedItem(name);
    const userIdenc = userId;

    navigate(`/${path.toLowerCase()}/user/`, { state: { userIdenc } });
  };

  const ListSubItems = [
    { name: "Contacts", path: "contactlist" },
    { name: "Internal Storage", path: "internal-storage" },
    { name: "Calls", path: "calls" },
    { name: "Location", path: "location" },
    { name: "Installed Apps", path: "installed-apps" },

    // { name: "Messages", path: "messages" },
    // { name: "Media", path: "media" },
    // { name: "Browser History", path: "browserhistory" },
    // { name: "Calendar", path: "calendar" },
    // { name: "Notes", path: "notes" },
    // { name: "Accounts", path: "accounts" },
  ];

  const list = (userId) => (
    <>
      <List>
        {ListSubItems.map((text, index) => (
          <ListItem
            key={text.name}
            button
            onClick={() => handleListItemClick(userId, text)}
            sx={{
              paddingLeft: "48px",
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
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  );
  // end of old code

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#fff",
          color: "#000",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {selectedItem ? selectedItem : "Dashboard"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#2a313c",
              color: "#b4c7c5",
            },
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "24px",
              paddingRight: "24px",
              height: "64px",
              marginInlineEnd: "0",
              backgroundColor: "#00b1ff",
            }}
          >
            <LogoDevIcon
              style={{ color: "#fff", fontSize: "40px", marginTop: "7px" }}
            />
            {/* <h2 style={{ color: "#fff", marginTop: "7px" }}>Admin</h2> */}
            <Typography
              style={{ color: "#fff", marginTop: "7px" }}
              variant="h6"
              noWrap
              component="div"
            >
              Admin
            </Typography>
          </Box>
          {UsersList()}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#2a313c",
              color: "#b4c7c5",
            },
          }}
          open
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "24px",
              paddingRight: "24px",
              height: "64px",
              marginInlineEnd: "0",
              backgroundColor: "#00b1ff",
            }}
          >
            <LogoDevIcon
              style={{ color: "#fff", fontSize: "40px", marginTop: "7px" }}
            />
            <Typography
              style={{ color: "#fff", marginTop: "7px" }}
              variant="h6"
              noWrap
              component="div"
            >
              Admin
            </Typography>
          </Box>
          {UsersList()}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <DefaultRouter />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
