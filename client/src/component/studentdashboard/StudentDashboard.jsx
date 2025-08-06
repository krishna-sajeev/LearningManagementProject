import React from 'react'
import { Box, Typography, Grid } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

const StudentDashboard = () => {
  return (
    <>
     <Sidebar role="student" />
      <Header title="Student Dashboard" />
      
      <Box
        sx={{
          marginLeft: "260px",     // sidebar width
          marginTop: "64px",       // header height
          padding: 3,              // standard spacing
        }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome Teacher
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              My Profile
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              Enrolled Course
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              Feedback
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              Live Session
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              Recorded videos
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              Reference Material
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              Assignment
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              Project
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default StudentDashboard