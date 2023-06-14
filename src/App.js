import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ResponsiveDrawer from "./components/layout/sidebar";
import { ApiProvider } from "./contexts/apiContext";
import { DevicesProvider } from "./contexts/dashboardContext";
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
