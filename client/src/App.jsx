import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/login/Login";
import Register from "./component/register/Register"
import ForgotPassword from "./component/login/ForgotPassword"

import AdminDashboard from "./component/admindashboard/AdminDashboard";
import ManageCourse from "./component/admindashboard/ManageCourse";
import ManageUser from "./component/admindashboard/ManageUser";
import ViewPayments from "./component/admindashboard/ViewPayments";
import GenerateReports from "./component/admindashboard/GenerateReports";
import AddCourse from './component/admindashboard/AddCourse';
import Myprofile from "./component/student/StudentDashboard/Myprofile";
import StudentDashboard from "./component/student/StudentDashboard/StudentDashboard";
import Sidebar from "./component/common/Sidebar";

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
 <Route path="/adminuser" element={<ManageUser />} />
<Route path="/admincourse" element={<ManageCourse />} />

<Route path="/adminpayments" element={<ViewPayments />} />
<Route path="/adminreports" element={<GenerateReports />} /> 

<Route path="/admincourse" element={<ManageCourse />} />
<Route path="/admincourse/add" element={<AddCourse />} />

 <Route path="/student-dashboard" element={<StudentDashboard />}/> 
<Route path="/MyProfile" element={<Myprofile />} />

<Route path="/Sidebar" element={<Sidebar/>}/>


      </Routes>
    </Router>
  );
}

export default App;
