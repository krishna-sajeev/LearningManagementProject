import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./component/login/Login";
import Register from "./component/register/Register"
import ForgotPassword from "./component/login/ForgotPassword"

 import AdminDashboard from "./component/admindashboard/AdminDashboard"; 
 import ManageUser from "./component/admindashboard/ManageUser";
 import ManageUsers from "./component/admindashboard/ManageUsers";
 import ViewPayments from "./component/admindashboard/ViewPayments";
 import GenerateReports from "./component/admindashboard/GenerateReports";
 import ManageCourses from "./component/admindashboard/ManageCourses";
 import ManageCourse from "./component/admindashboard/ManageCourse"
 import Certificate from "./component/admindashboard/Certificate";

import StudentDetail from "./component/teacherdashboard/StudentDetail";
import Assignment from "./component/teacherdashboard/Assignment";
import Attendence from "./component/teacherdashboard/Attendence";
import Batch from "./component/teacherdashboard/Batch";
// import TeacherDashboard from "./component/teacherdashboard/TeacherDashboard";
import StudentDashboard from "./component/studentdashboard/StudentDashboard";
import Sidebar from "./component/common/Sidebar";
// import StudentDashboard from "./component/studentdashboard/StudentDashboard";
// import Assignment from "./component/studentdashboard/Assignment";
import Layout from "./component/common/Layout";
import Project from "./component/studentdashboard/Project";
import MyProfile from "./component/profile/MyProfile";
import NewAssignment from "./component/teacherdashboard/NewAssignment";
import EditAssignment from "./component/teacherdashboard/EditAssignment";
import ViewSubmission from "./component/teacherdashboard/ViewSubmission";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 

           <Route path="admin/admin-dashboard" element={<AdminDashboard />} />
          {/* <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/> */}
          <Route path="/admin/adminuser" element={<ManageUser />} />
          <Route path="/admin/adminmanageusers" element={<ManageUsers />} />
          <Route path="admin/adminmanagecourse" element={<ManageCourses />} />
          <Route path="/admin/admincourses" element={<ManageCourse />} />
          <Route path="/admin/adminreports" element={<Certificate />} /> 
          <Route path="/adminpayments" element={<ViewPayments />} />
          <Route path="/adminreports" element={<GenerateReports />} />  
          {/* <Route path="/admincourse/add" element={<AddCourse />} /> */}
 

        {/* Admin Routes
        <Route path="/admin/admin-dashboard" element={<Layout role="admin"><AdminDashboard /></Layout>} />
        <Route path="/admin/adminuser" element={<Layout role="admin"><ManageUser /></Layout>} />
        <Route path="/admin/admincourse" element={<Layout role="admin"><ManageCourse /></Layout>} />
        <Route path="/admin/adminpayments" element={<Layout role="admin"><ViewPayments /></Layout>} />
        <Route path="/admin/adminreports" element={<Layout role="admin"><GenerateReports /></Layout>} />
        <Route path="/admin/admincourse/add" element={<Layout role="admin"><AddCourse /></Layout>} /> */}

        {/* Teacher Routes */}
        {/* <Route path="/teacher/teacher-dashboard" element={<Layout role="teacher"><TeacherDashboard /></Layout>} />
        <Route path="/teacher/student-detail" element={<Layout role="teacher"><StudentDetail /></Layout>} />
        <Route path="/teacher/assignment" element={<Layout role="teacher"><Assignment /></Layout>} />
        <Route path="/teacher/attendance" element={<Layout role="teacher"><Attendence /></Layout>} />
        <Route path="/teacher/schedule" element={<Layout role="teacher"><Batch /></Layout>} />
        <Route path="/new-assignment" element={<Layout role="teacher"><NewAssignment/></Layout>} />
        <Route path="/edit-assignment/:id" element={<Layout role="teacher"><EditAssignment/></Layout>}/>
        <Route path="/view-submission/:id" element={<Layout role="teacher"><ViewSubmission/></Layout>} /> */}



{/* <Route path="/teacher/student-detail" element={<StudentDetail/>}/>
<Route path="/teacher/assignment" element={<Assignment/>}/>
<Route path="/teacher/attendance" element={<Attendence/>}/>
<Route path="/teacher/schedule" element={<Batch/>}/> */}
 {/* <Route path="/student/student-dashboard" element={<StudentDashboard />}/> 
 <Route path="/student/assignment" element={<Assignments />}/> */}

        {/* Student Routes */}
        {/* <Route path="/student/student-dashboard" element={<Layout role="student"><StudentDashboard /></Layout>} />
        <Route path="/student/assignment" element={<Layout role="student"><Assignment /></Layout>} />
        <Route path="/student/project" element={<Layout role="student"><Project /></Layout>} />
        <Route path="/student/profile" element={<Layout role="student"><MyProfile /></Layout>} />
         */}

      </Routes>
  
  );
}

export default App;
