import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/login/Login";
import Register from "./component/register/Register"
import ForgotPassword from "./component/login/ForgotPassword"
function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          

      </Routes>
    </Router>
  );
}

export default App;
