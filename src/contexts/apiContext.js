// apiContext.js
import React, { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [apiEndpoint, setApiEndpoint] = useState("");

  const updateApiEndpoint = (endpoint) => {
    setApiEndpoint(endpoint);
  };

  return (
    <ApiContext.Provider value={{ apiEndpoint, updateApiEndpoint }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => useContext(ApiContext);
