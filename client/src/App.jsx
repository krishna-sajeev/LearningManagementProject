import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./component/login/Login";
import Register from "./component/register/Register";
import ForgotPassword from "./component/login/ForgotPassword";
import AboutUs from "./component/common/AboutUs";
import AdminDashboard from "./component/admindashboard/AdminDashboard";
import ManageCourse from "./component/admindashboard/ManageCourse";
import ManageCourses from "./component/admindashboard/ManageCourses";
import ManageUser from "./component/admindashboard/ManageUser";
import ManageUsers from "./component/admindashboard/ManageUsers";
import ViewPayments from "./component/admindashboard/ViewPayments";
import GenerateReports from "./component/admindashboard/GenerateReports";
import AdminFeedbackList from "./component/admindashboard/AdminFeedbackList"
import Certificate from "./component/admindashboard/Certificate";
import AdminProfile from "./component/admindashboard/AdminProfile";

import Assignment from "./component/teacherdashboard/Assignment";
import Attendence from "./component/teacherdashboard/Attendence";
import TeacherDashboard from "./component/teacherdashboard/TeacherDashboard";

import StudentDashboard from "./component/studentdashboard/StudentDashboard";
import Project from "./component/studentdashboard/Project";
import Assignments from "./component/studentdashboard/Assignments";
import Course from "./component/studentdashboard/Course";
import EnrolledCourse from "./component/studentdashboard/EnrolledCourse";
import Feedback from "./component/studentdashboard/Feedback";
import LiveSession from "./component/studentdashboard/LiveSession";
import RecordedVideos from "./component/studentdashboard/RecordedVideos";
import ReferenceMaterial from "./component/studentdashboard/ReferenceMaterial";

import Layout from "./component/common/Layout";
import MyProfile from "./component/profile/MyProfile";

import StudentDetail from "./component/teacherdashboard/StudentDetail";
import NewAssignment from "./component/teacherdashboard/NewAssignment";
import EditAssignment from "./component/teacherdashboard/EditAssignment";
import ViewSubmission from "./component/teacherdashboard/ViewSubmission";
// import ManageUsers from "./component/admindashboard/ManageUsers";
// import ManageCourses from "./component/admindashboard/ManageCourses";
// import Certificate from "./component/admindashboard/Certificate";
// import Feedback from "./component/studentdashboard/Feedback";

import AddReference from "./component/teacherdashboard/AddReference";
import LiveSessionTeacher from "./component/teacherdashboard/LiveSessionTeacher";
import CourseDetails from "./component/studentdashboard/CourseDetails";
import UpdateMaterial from "./component/teacherdashboard/UpdateMaterial";
import ReferenceMaterialTeacher from "./component/teacherdashboard/ReferenceMaterialTeacher";





function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Admin Routes */}

         {/* <Route path="admin/admin-dashboard" element={<Layout role="admin"><AdminDashboard /></Layout>} />
        <Route path="/adminuser" element={<Layout role="admin"><ManageUser /></Layout>} />
        <Route path="/admincourse" element={<Layout role="admin"><ManageCourse /></Layout>} />
        <Route path="/adminpayments" element={<Layout role="admin"><ViewPayments /></Layout>} />
        <Route path="/adminreports" element={<Layout role="admin"><GenerateReports /></Layout>} /> */}
        {/* <Route path="/admin/admincourse/add" element={<Layout role="admin"><AddCourse /></Layout>} />  */}

        

        <Route path="/admin/admin-dashboard" element={<Layout role="admin"><AdminDashboard /></Layout>} />
        <Route path="/admin/adminuser" element={<Layout role="admin"><ManageUser /></Layout>} />
        <Route path="/admin/adminpayments" element={<Layout role="admin"><ViewPayments /></Layout>} />
        <Route path="/admin/adminfeedback" element={<Layout role="admin"><AdminFeedbackList /></Layout>} />
        <Route path="/admin/adminmanageusers" element={<Layout role="admin"><ManageUsers /></Layout>} />
        <Route path="/admin/adminreport" element={<Layout role="admin"><Certificate /></Layout>} /> 
        <Route path="/admin/adminreports" element={<Layout role="admin"><GenerateReports /></Layout>} />  
         <Route path="/admin/adminmanagecourse" element={<Layout role="admin"><ManageCourse /></Layout>} />
       <Route path="/admin/adminmanagecourses" element={<Layout role="admin"><ManageCourses /></Layout>} />
       <Route path="/admin/adminprofile" element={<Layout role="admin"><AdminProfile /></Layout>} />

        {/* Teacher Routes */}
        <Route path="/teacher/teacher-dashboard" element={<Layout role="teacher"><TeacherDashboard /></Layout>} />
        <Route path="/teacher/student-detail" element={<Layout role="teacher"><StudentDetail /></Layout>} />
        <Route path="/teacher/assignment" element={<Layout role="teacher"><Assignment /></Layout>} />
        <Route path="/teacher/attendance" element={<Layout role="teacher"><Attendence /></Layout>} />
        <Route path="/new-assignment" element={<Layout role="teacher"><NewAssignment/></Layout>} />
        <Route path="/edit-assignment/:id" element={<Layout role="teacher"><EditAssignment/></Layout>}/>
        <Route path="/view-submission/:id" element={<Layout role="teacher"><ViewSubmission/></Layout>} />
        <Route path="/teacher/livesession" element={<Layout role="teacher"><LiveSessionTeacher/></Layout>}/>
        <Route path="/teacher/refernce_material" element={<Layout role="teacher"><ReferenceMaterialTeacher/></Layout>}/>
         <Route path="/teacher/addrefernce" element={<Layout role="teacher"><AddReference/></Layout>}/>
         <Route path="/teacher/updateMaterial/:id" element={<Layout role="teacher"><UpdateMaterial/></Layout>} />


        {/* Student Routes */}
        <Route path="/student/student-dashboard" element={<Layout role="student"><StudentDashboard /></Layout>} />
        <Route path="/student/assignment" element={<Layout role="student"><Assignments /></Layout>} />
        <Route path="/student/project" element={<Layout role="student"><Project /></Layout>} /> 
        <Route path="/profile" element={<Layout role=":role"><MyProfile /></Layout>} />
         <Route path="/student/course" element={<Layout role="student"><Course /></Layout>} /> 
         <Route path="/student/enrolled-course" element={<Layout role="student"><EnrolledCourse /></Layout>} />
         <Route path="/student/feedback" element={<Layout role="student"><Feedback /></Layout>} />
         <Route path="/student/live-session" element={<Layout role="student"><LiveSession/></Layout>} />
         <Route path="/student/recorded-videos" element={<Layout role="student"><RecordedVideos /></Layout>} />
         <Route path="/student/reference-material" element={<Layout role="student"><ReferenceMaterial /></Layout>} />
        <Route path="/student/feedback" element={<Layout role="student"><Feedback /></Layout>} />
        <Route path="/student/:title" element={<Layout role="student"><CourseDetails /></Layout>} />
        <Route path="/student/live-session" element={<Layout role="student"><LiveSession /></Layout>} />

      </Routes> 
  
  );
}

export default App;
