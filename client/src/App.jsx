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
import StudentDetail from "./component/teacherdashboard/StudentDetail";
import Assignment from "./component/teacherdashboard/Assignment";
import Attendence from "./component/teacherdashboard/Attendence";
import Batch from "./component/teacherdashboard/Batch";
import TeacherDashboard from "./component/teacherdashboard/TeacherDashboard";
import StudentDashboard from "./component/studentdashboard/StudentDashboard";
import Sidebar from "./component/common/Sidebar";

function App() {
  return (
   
      <Routes>
         <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/>
 <Route path="/adminuser" element={<ManageUser />} />
<Route path="/admincourse" element={<ManageCourse />} />
<Route path="/adminpayments" element={<ViewPayments />} />
<Route path="/adminreports" element={<GenerateReports />} /> 
<Route path="/admincourse" element={<ManageCourse />} />
<Route path="/admincourse/add" element={<AddCourse />} />




<Route path="/teacher/student-detail" element={<StudentDetail/>}/>
<Route path="/teacher/assignment" element={<Assignment/>}/>
<Route path="/teacher/attendance" element={<Attendence/>}/>
<Route path="/teacher/schedule" element={<Batch/>}/>
 <Route path="/student/student-dashboard" element={<StudentDashboard />}/> 

<Route path="/Sidebar" element={<Sidebar/>}/>
      </Routes>
  );
}

export default App;
