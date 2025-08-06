import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

const AdminDashboard = () => {
  return (
    <>
      <Sidebar role="admin" />
      <Header title="Admin Dashboard" />
      
      <Box
        sx={{
          marginLeft: "260px",     // sidebar width
          marginTop: "64px",       // header height
          padding: 3,              // standard spacing
        }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome Admin
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              Manage Users
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              Manage Courses
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              View Payment Status
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={2}>
              Generate Reports
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdminDashboard;
