import React from "react";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DevicesContext } from "../contexts/dashboardContext";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  introCard: {
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    backgroundColor: "#0e6186 !important",
    color: "#FFFFFF !important",
  },
  infoCard: {
    height: 150,
    marginBottom: 20,
    backgroundColor: "#ECEFF1 !important",
    color: "#37474F",
  },
}));

const Dashboard = () => {
  const { devices } = React.useContext(DevicesContext);
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Card className={classes.introCard}>
        <CardContent>
          <Typography variant="h4" component="h2" align="center">
            Welcome to the Dashboard!
          </Typography>
        </CardContent>
      </Card>
      {/* <Card className={classes.infoCard}>
        <CardContent>
          <Typography variant="h6" component="h3">
            Number of Devices Connected
          </Typography>
          <Typography variant="body1">
            There are {devices.length} devices connected.
          </Typography>
        </CardContent>
      </Card> */}
      {devices?.map((device) => (
        <DeviceBox key={device._id} device={device} />
      ))}
    </Container>
  );
};
const DeviceBox = ({ device }) => {
  const classes = useStyles();
  const lastOnlineTime = new Date(device.last_online).toLocaleTimeString();
  const lastOnlineDate = new Date(device.last_online).toLocaleDateString();
  return (
    <Card className={classes.infoCard}>
      <CardContent>
        <Typography variant="h6" component="h3">
          {device.device_name}
        </Typography>
        <Typography variant="body1">
          Android Version: {device.android_version}
        </Typography>
        <Typography variant="body1">
          Last Online Time: {lastOnlineTime}
        </Typography>
        <Typography variant="body1">
          Last Online Date: {lastOnlineDate}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Dashboard;
