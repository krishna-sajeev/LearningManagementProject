import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import ForgotPassword from "./component/login/ForgotPassword";

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
import Assignments from "./component/studentdashboard/Assignments";

import Layout from "./component/common/Layout";
import Project from "./component/studentdashboard/Project";
import MyProfile from "./component/studentdashboard/MyProfile";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<Layout role="admin"><AdminDashboard /></Layout>} />
        <Route path="/adminuser" element={<Layout role="admin"><ManageUser /></Layout>} />
        <Route path="/admincourse" element={<Layout role="admin"><ManageCourse /></Layout>} />
        <Route path="/adminpayments" element={<Layout role="admin"><ViewPayments /></Layout>} />
        <Route path="/adminreports" element={<Layout role="admin"><GenerateReports /></Layout>} />
        <Route path="/admincourse/add" element={<Layout role="admin"><AddCourse /></Layout>} />

        {/* Teacher Routes */}
        <Route path="/teacher-dashboard" element={<Layout role="teacher"><TeacherDashboard /></Layout>} />
        <Route path="/teacher/student-detail" element={<Layout role="teacher"><StudentDetail /></Layout>} />
        <Route path="/teacher/assignment" element={<Layout role="teacher"><Assignment /></Layout>} />
        <Route path="/teacher/attendance" element={<Layout role="teacher"><Attendence /></Layout>} />
        <Route path="/teacher/schedule" element={<Layout role="teacher"><Batch /></Layout>} />

        {/* Student Routes */}
        <Route path="/student/student-dashboard" element={<Layout role="student"><StudentDashboard /></Layout>} />
        <Route path="/student/assignment" element={<Layout role="student"><Assignments /></Layout>} />
        <Route path="/student/project" element={<Layout role="student"><Project /></Layout>} />
        <Route path="/student/profile" element={<Layout role="student"><MyProfile /></Layout>} />
        
      </Routes>
  
  );
}

export default App;
