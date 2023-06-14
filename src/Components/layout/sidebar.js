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
import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { fetchUsers } from "../../services/apiService";
import ContactsIcon from "@mui/icons-material/Contacts";
import StorageIcon from "@mui/icons-material/Storage";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AppsIcon from "@mui/icons-material/Apps";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { PhoneAndroid } from "@mui/icons-material";
import { Button, Select, MenuItem } from "@mui/material";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedItem, setselectedItem] = useState();
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const options = [
    { value: "all", label: "All Devices" },
    { value: "10", label: "Android 10" },
    { value: "11", label: "Android 11" },
    { value: "12", label: "Android 12" },
    { value: "13", label: "Android 13" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userList?.length === 0) {
          const users = await fetchUsers();
          setUserList(users);
          console.log("Users", users);
        }
      } catch (error) {
        console.error("Error fetching user list (sidebar):", error);
      }
    };

    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setSelectedUser(JSON.parse(storedUser)); // Set the stored selected user as the selectedUser state
    }
    fetchData();
  }, [userList]);

  const handleUserClick = (user) => {
    setSelectedUser((prevUser) => (prevUser === user ? null : user));
    localStorage.setItem("selectedUser", JSON.stringify(user));
  };
  const handleFilterClick = (selectedFilter) => {
    setFilter(selectedFilter);
  };
  const renderUserList = () => {
    let filteredUsers = userList;

    if (filter !== "all") {
      filteredUsers = userList?.filter(
        (user) => user.android_version === filter
      );
    }
    return (
      <>
        {filteredUsers.length ? (
          filteredUsers?.map((user) => (
            <React.Fragment key={user._id}>
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
                  <PhoneAndroid style={{ color: "#b4c7c5" }} />
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
          ))
        ) : (
          <ListItem sx={{ paddingLeft: "24px", paddingRight: "24px" }}>
            <ListItemIcon>
              <PhoneAndroid style={{ color: "#b4c7c5" }} />
            </ListItemIcon>
            <ListItemText primary="No Devices Connected" />
          </ListItem>
        )}
      </>
    );
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
    { name: "Messages", path: "messages" },
    { name: "Notifications", path: "notifications" },
  ];

  const iconMapping = {
    Contacts: ContactsIcon,
    "Internal Storage": StorageIcon,
    Calls: PhoneIcon,
    Location: LocationOnIcon,
    "Installed Apps": AppsIcon,
    Messages: MessageIcon,
    Notifications: NotificationsIcon,
  };

  const list = (userId) => (
    <>
      <List>
        {ListSubItems.map((text, index) => {
          const IconComponent = iconMapping[text.name] || InboxIcon;

          return (
            <ListItem
              key={text.name}
              button
              onClick={() => handleListItemClick(userId, text)}
              sx={{
                paddingLeft: "48px",
                "&:hover": {
                  backgroundColor: "#343541",
                },
                "&.Mui-selected": {
                  backgroundColor: "#393541",
                },
              }}
            >
              <ListItemIcon>
                <IconComponent style={{ color: "#b4c7c5" }} />
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItem>
          );
        })}
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
          {/* {UsersList()} */}
          {userList?.length && (
            <div
              sx={{
                display: "flex",
                maxWidth: 200,
                justifyContent: "space-between",
              }}
            >
              <Select
                value={filter}
                onChange={(event) => handleFilterClick(event.target.value)}
                size="small"
                variant="outlined"
                sx={{
                  color: "#b4c7c5",
                  borderColor: "#fff",
                  marginTop: "10px",
                  marginBottom: "10px",
                  marginLeft: "30px",
                  marginRight: "10px",
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          {renderUserList()}
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
          {userList?.length && (
            <Select
              value={filter}
              onChange={(event) => handleFilterClick(event.target.value)}
              size="small"
              variant="outlined"
              sx={{
                color: "#b4c7c5",
                borderColor: "#fff",
                marginTop: "10px",
                marginBottom: "10px",
                marginLeft: "30px",
                marginRight: "10px",
                "&:focus": {
                  borderColor: "#fff",
                },
                "&.Mui-focused": {
                  borderColor: "#fff",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
          {renderUserList()}
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
