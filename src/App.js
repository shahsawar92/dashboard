import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApiProvider } from "./contexts/apiContext";
import { DevicesProvider } from "./contexts/dashboardContext";
import ResponsiveDrawer from "./Components/layout/sidebar";
function App() {
  return (
    <ApiProvider>
      <DevicesProvider>
        <ResponsiveDrawer />
      </DevicesProvider>
    </ApiProvider>
  );
}

export default App;
