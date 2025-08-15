import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./component/login/Login";
<<<<<<< HEAD
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
import AdminFeedbackList from "./component/admindashboard/AdminFeedbackList";
// import AdminDashboard from "./component/admindashboard/AdminDashboard";
// import ManageCourse from "./component/admindashboard/ManageCourse";
// import ManageUser from "./component/admindashboard/ManageUser";
// import ViewPayments from "./component/admindashboard/ViewPayments";
// import GenerateReports from "./component/admindashboard/GenerateReports";

// import AdminDashboard from "./component/admindashboard/AdminDashboard";
// import ManageCourse from "./component/admindashboard/ManageCourse";
// import ManageUser from "./component/admindashboard/ManageUser";
// import ViewPayments from "./component/admindashboard/ViewPayments";
// import GenerateReports from "./component/admindashboard/GenerateReports";
=======
import Register from "./component/register/Register";
import ForgotPassword from "./component/login/ForgotPassword";

import AdminDashboard from "./component/admindashboard/AdminDashboard";
import ManageCourse from "./component/admindashboard/ManageCourse";
import ManageUser from "./component/admindashboard/ManageUser";
import ViewPayments from "./component/admindashboard/ViewPayments";
import GenerateReports from "./component/admindashboard/GenerateReports";

import StudentDetail from "./component/teacherdashboard/StudentDetail";
import Assignment from "./component/teacherdashboard/Assignment";
import Attendence from "./component/teacherdashboard/Attendence";
import Batch from "./component/teacherdashboard/Batch";
import TeacherDashboard from "./component/teacherdashboard/TeacherDashboard";
>>>>>>> d7c5164d9e7fc2b1f61b07fca6db68bc9a102644

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
<<<<<<< HEAD


 import TeacherDashboard from "./component/teacherdashboard/TeacherDashboard"; 
 import Assignment from "./component/teacherdashboard/Assignment";
  import Attendence from "./component/teacherdashboard/Attendence";
   import Batch from "./component/teacherdashboard/Batch";
    import EditAssignment from "./component/teacherdashboard/EditAssignment";
     import NewAssignment from "./component/teacherdashboard/NewAssignment";
      import StudentDetail from "./component/teacherdashboard/StudentDetail";
       import ViewSubmission from "./component/teacherdashboard/ViewSubmission";


=======
import NewAssignment from "./component/teacherdashboard/NewAssignment";
import EditAssignment from "./component/teacherdashboard/EditAssignment";
import ViewSubmission from "./component/teacherdashboard/ViewSubmission";
import ManageUsers from "./component/admindashboard/ManageUsers";
import ManageCourses from "./component/admindashboard/ManageCourses";
import Certificate from "./component/admindashboard/Certificate";



>>>>>>> d7c5164d9e7fc2b1f61b07fca6db68bc9a102644
function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD
        <Route path="/forgot-password" element={<ForgotPassword />} /> 

          {/* <Route path="admin/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/adminuser" element={<ManageUser />} />
          <Route path="/admin/adminmanageusers" element={<ManageUsers />} />

          <Route path="admin/adminmanagecourse" element={<ManageCourses />} />
          <Route path="/admin/admincourse" element={<ManageCourse />} />
          <Route path="/admin/adminreports" element={<Certificate />} /> 

          <Route path="/admin/payments" element={<ViewPayments />} />
          <Route path="/admin/reports" element={<GenerateReports />} />   */}
          {/* <Route path="/admincourse/add" element={<AddCourse />} /> */}
         
=======
        <Route path="/forgot-password" element={<ForgotPassword />} />
>>>>>>> d7c5164d9e7fc2b1f61b07fca6db68bc9a102644

        {/* Admin Routes */}
        <Route path="/admin/admin-dashboard" element={<Layout role="admin"><AdminDashboard /></Layout>} />
        <Route path="/admin/adminuser" element={<Layout role="admin"><ManageUser /></Layout>} />
        <Route path="/admin/adminmanagecourse" element={<Layout role="admin"><ManageCourse /></Layout>} />
        <Route path="/admin/adminpayments" element={<Layout role="admin"><ViewPayments /></Layout>} />
        <Route path="/admin/adminreports" element={<Layout role="admin"><GenerateReports /></Layout>} />
<<<<<<< HEAD
        <Route path="/admin/adminfeedback" element={<Layout role="admin"><AdminFeedbackList /></Layout>} />


        <Route path="/admin/adminmanageusers" element={<Layout role="admin"><ManageUsers /></Layout>} />
        <Route path="/admin/adminmanagecourses" element={<Layout role="admin"><ManageCourses /></Layout>} />
        <Route path="/admin/adminreport" element={<Layout role="admin"><Certificate /></Layout>} /> 
        <Route path="/admin/adminpayments" element={<Layout role="admin"><ViewPayments /></Layout>} />
        
=======
        <Route path="/admin/adminmanageusers" element={<Layout role="admin"><ManageUsers /></Layout>} />
        <Route path="/admin/adminuser" element={<Layout role="admin"><ManageUser /></Layout>} />
          <Route path="/admin/adminmanagecourse" element={<Layout role="admin"><ManageCourses /></Layout>} />
          <Route path="/admin/adminreport" element={<Layout role="admin"><Certificate /></Layout>} /> 
          <Route path="/admin/adminpayments" element={<Layout role="admin"><ViewPayments /></Layout>} />
          <Route path="/admin/adminreports" element={<Layout role="admin"><GenerateReports /></Layout>} />  
          
>>>>>>> d7c5164d9e7fc2b1f61b07fca6db68bc9a102644
        {/* Teacher Routes */}
          <Route path="/teacher/teacher-dashboard" element={<Layout role="teacher"><TeacherDashboard /></Layout>} />
        <Route path="/teacher/student-detail" element={<Layout role="teacher"><StudentDetail /></Layout>} />
        <Route path="/teacher/assignment" element={<Layout role="teacher"><Assignment /></Layout>} />
        <Route path="/teacher/attendance" element={<Layout role="teacher"><Attendence /></Layout>} />
        <Route path="/teacher/schedule" element={<Layout role="teacher"><Batch /></Layout>} />
        <Route path="/new-assignment" element={<Layout role="teacher"><NewAssignment/></Layout>} />
        <Route path="/edit-assignment/:id" element={<Layout role="teacher"><EditAssignment/></Layout>}/>
        <Route path="/view-submission/:id" element={<Layout role="teacher"><ViewSubmission/></Layout>} /> 

        {/* Student Routes */}
        <Route path="/student/student-dashboard" element={<Layout role="student"><StudentDashboard /></Layout>} />
        <Route path="/student/assignment" element={<Layout role="student"><Assignments /></Layout>} />
        <Route path="/student/project" element={<Layout role="student"><Project /></Layout>} /> 
        <Route path="/student/profile" element={<Layout role="student"><MyProfile /></Layout>} />
         <Route path="/student/course" element={<Layout role="student"><Course /></Layout>} /> 
         <Route path="/student/enrolled-course" element={<Layout role="student"><EnrolledCourse /></Layout>} />
         <Route path="/student/feedback" element={<Layout role="student"><Feedback /></Layout>} />
         <Route path="/student/live-session" element={<Layout role="student"><LiveSession/></Layout>} />
         <Route path="/student/recorded-videos" element={<Layout role="student"><RecordedVideos /></Layout>} />
         <Route path="/student/reference-material" element={<Layout role="student"><ReferenceMaterial /></Layout>} />
        
<<<<<<< HEAD

=======
>>>>>>> d7c5164d9e7fc2b1f61b07fca6db68bc9a102644
      </Routes> 
  
  );
}

export default App;
