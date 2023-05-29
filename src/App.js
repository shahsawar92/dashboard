import React from "react";
import { Route, Routes } from "react-router-dom";
import UserComponent from "./Components/Users";
import ListComponent from "./Components/List";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserComponent />} />
      <Route path="/list" element={<ListComponent />} />
    </Routes>
  );
}

export default App;
