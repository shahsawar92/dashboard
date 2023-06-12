import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import Card from "@mui/material/Card";
function GoogleMapComponent({ latitude, longitude }) {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <Card>
      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </Card>
  );
}

export default GoogleMapComponent;
