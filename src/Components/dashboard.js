import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DevicesContext } from "../contexts/dashboardContext";
import DevicesByVersion from "./charts/devicesByVersion";
import GoogleMapComponent from "./common/GoogleMapComponent";
import { ErrorMessage } from "../utils/helper";
import { fetchUsers, fetchUserspolling } from "../services/apiService";

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
  const { devices=[] } = useContext(DevicesContext);
    const [markers, setMarkers] = useState([]);
  const classes = useStyles();

  const devicesByAndroidVersion = devices?.reduce((groups, device) => {
    const android_version = device.android_version;
    groups[android_version] = groups[android_version] || [];
    groups[android_version].push(device);
    return groups;
  }, {});

  const data = Object.entries(devicesByAndroidVersion).map(([version, devices]) => ({
    version,
    devices: devices.length,
  }));


    useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUserspolling();
        const newMarkers = users?.map((obj) => {
          const location = JSON.parse(obj.location)?.location;
          return {
            lat: parseFloat(location?.latitude),
            lng: parseFloat(location?.longitude),
            device_Name: obj.device_name,
            last_online: obj.last_online,
            sim_country: obj.sim_country,
            sim_operator: obj.sim_operator,
          };
        });
        setMarkers(newMarkers);
      } catch (error) {
        console.error("dashboard error:", error);
      }
    };

    const interval = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []);

  console.log("markers", markers);
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Card className={classes.introCard}>
        <CardContent>
          <Typography variant="h4" component="h2" align="center">
            Welcome to the Dashboard!
          </Typography>
        </CardContent>
      </Card>
      {!devices?.length && (
        <ErrorMessage message="As there is some server issue, you are seeing demo data" />
      )}
      <Card>
        <CardContent>
          <Typography variant="h6" component="h3">
            Number of Android Devices by Model
          </Typography>
          <div className={classes.chartContainer}>
            <DevicesByVersion data={data.length ? data : []} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h3">
            Live Location of Devices
          </Typography>
          <div className={classes.chartContainer}>
            <GoogleMapComponent markers={devices?.length ? markers : []} />
          </div>
        </CardContent>
      </Card>
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
