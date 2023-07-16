import React from "react";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrincipalPage from "./PrincipalPage";




export default function Home(props) {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" />} />
          <Route exact path="/home" element={ <PrincipalPage />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
      <props.Copyright />
    </div>
  );
}