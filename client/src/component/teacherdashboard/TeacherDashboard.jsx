import React from 'react';
import { Box, Typography, Grid } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Manage Student Detail",
      path: "/teacher/student-detail",
      description: "View and manage details of students enrolled in your courses."
    },
    {
      title: "Add and Grade Assignment",
      path: "/teacher/assignment",
      description: "Create assignments, view submissions, and provide grades."
    },
    {
      title: "Mark Attendance",
      path: "/teacher/attendance",
      description: "Take attendance for your students in each class."
    },
    {
      title: "Upload Live Session",
      path: "/teacher/livesession",
      description: "Schedule or upload details of live teaching sessions."
    },
    {
      title: "Add Recorded Video",
      path: "/teacher/recordedvideo",
      description: "Upload and manage pre-recorded video lectures."
    },
    {
      title: "Add Reference Material",
      path: "/teacher/refernce_material",
      description: "Upload notes, slides, and reference materials for students."
    }
  ];

  return (
    <>
      <Sidebar role="teacher" />
      <Header title="Teacher Dashboard" />
      
      <Box
        sx={{
          marginLeft: "260px",     
          marginTop: "64px",       
          padding: 3,             
        }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome Teacher
        </Typography>

        <Grid container spacing={2}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                p={2}
                bgcolor="#f0f0f0"
                borderRadius={2}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#e0e0e0" }
                }}
                onClick={() => navigate(feature.path)}
              >
                <Typography variant="h6">{feature.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default TeacherDashboard;
