import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ResponsiveDrawer from "./components/layout/sidebar";
import { ApiProvider } from "./contexts/apiContext";

function App() {
  return (
    <ApiProvider>
      <ResponsiveDrawer />
    </ApiProvider>
  );
}

export default App;
