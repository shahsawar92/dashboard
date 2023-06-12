import React from "react";
import GoogleMapComponent from "./GoogleMapComponent";

function Map() {
  const latitude = 37.7749; // Replace with your latitude
  const longitude = -122.4194; // Replace with your longitude

  return <GoogleMapComponent latitude={latitude} longitude={longitude} />;
}

export default Map;
