import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

const stats = {
  totalUsers: 150,
  totalCourses: 12,
  totalPayments: "₹75,000",
  activeTutors: 8,
  enrolledStudents: 120,
};

const StatCard = ({ title, value }) => (
  //<Paper elevation={3} sx={{ p: 34, mt: 2 }}></Paper>
  <Paper elevation={3} sx={{ p:7,mt:2, textAlign: "center" }}>
    <Typography variant="h6" gutterBottom>{title}</Typography>
    <Typography variant="h5" color="primary">{value}</Typography>
  </Paper>
  
);

const GenerateReports = () => {
  return (
    <Box display="flex">
      <Sidebar role="admin" />
      <Box flexGrow={1}>
        <Header title="Generate Reports" />
        <Box p={8}>
          <Typography variant="h5" gutterBottom>
            Summary Report
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={8} sm={2} md={4}>
              <StatCard title="Total Users" value={stats.totalUsers} />
            </Grid>
            <Grid item xs={8} sm={3} md={4}>
              <StatCard title="Total Courses" value={stats.totalCourses} />
            </Grid>
            <Grid item xs={8} sm={3} md={4}>
              <StatCard title="Total Payments" value={stats.totalPayments} />
            </Grid>
            <Grid item xs={8} sm={3} md={4}>
              <StatCard title="Active Tutors" value={stats.activeTutors} />
            </Grid>
            <Grid item xs={8} sm={3} md={4}>
              <StatCard title="Enrolled Students" value={stats.enrolledStudents} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default GenerateReports;
