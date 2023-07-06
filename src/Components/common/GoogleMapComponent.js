import React, { useState } from "react";
import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
import Card from "@mui/material/Card";
import { Typography } from '@mui/material';

function GoogleMapComponent({ markers }) {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
  lat: markers.length > 0 ? markers[0]?.lat : 0,
  lng: markers.length > 0 ? markers[0]?.lng : 0,
};


  const [activeMarker, setActiveMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  const handleMarkerClose = () => {
    setActiveMarker(null);
  };

  return (
    <Card>
      <LoadScript googleMapsApiKey="AIzaSyB191eL9We64h43nJL9ALTnAVmSsXrS76E">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker}
              onMouseOver={() => handleMarkerClick(marker)}
              onMouseOut={handleMarkerClose}
            >
              {activeMarker === marker && (
                <InfoWindow onCloseClick={handleMarkerClose}>

<div>
  <Typography variant="subtitle1"><b>Device Name</b>: {marker.device_Name}</Typography>
  <Typography variant="body2"><b>Last Online</b>: {marker?.last_online}</Typography>
  {/* <Typography variant="body2"><b>Sim Country</b>: {marker?.sim_country}</Typography> */}
  <Typography variant="body2"><b>Sim Operator</b>: {marker?.sim_operator}</Typography>
</div>

                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </Card>
  );
}

export default GoogleMapComponent;
