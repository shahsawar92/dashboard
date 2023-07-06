import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApiProvider } from "./contexts/apiContext";
import { DevicesProvider } from "./contexts/dashboardContext";
import ResponsiveDrawer from "./Components/layout/sidebar";
import SignIn from "./Components/Login/SignIn";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./utils/auth";
import DefaultRouter from "./router/router";

function App() {
  return (
    <ApiProvider>
      <DevicesProvider>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <ResponsiveDrawer>
                  <DefaultRouter /> 
                </ResponsiveDrawer>
              </RequireAuth>
            }
          />
        </Routes>
      </DevicesProvider>
    </ApiProvider>
  );
}

export default App;