import React, { createContext, useState } from "react";

// Create the devices context
export const DevicesContext = createContext();

// Create the devices provider
export const DevicesProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);

  const updateDevices = (devices) => {
    setDevices(devices);
  };

  return (
    <DevicesContext.Provider value={{ devices, updateDevices }}>
      {children}
    </DevicesContext.Provider>
  );
};
