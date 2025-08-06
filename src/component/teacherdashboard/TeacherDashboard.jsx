import React from 'react'
import { Box, Typography, Grid } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

const TeacherDashboard = () => {
  return (
    <>
     <Sidebar role="teacher" />
      <Header title="Teacher Dashboard" />
      
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
              Manage Student Detail
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              Upload Assignment
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              Mark Attendence
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              View Batch Schedule
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default TeacherDashboard