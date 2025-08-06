import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

const StudentDashboard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Fetch user name from localStorage (or token/user context)
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <>
      <Sidebar role="student" />
      <Header title="Student Dashboard" />

      <Box
        sx={{
          marginLeft: "260px",
          marginTop: "64px",
          padding: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome, {userName || "Student"}!
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box p={3} bgcolor="#e3f2fd" borderRadius={2}>
              <Typography variant="h6">Available Courses</Typography>
              <Typography variant="body2" mt={1}>
                Browse and enroll in available courses.
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }} href="/courses">
                View Courses
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box p={3} bgcolor="#fce4ec" borderRadius={2}>
              <Typography variant="h6">Enrolled Courses</Typography>
              <Typography variant="body2" mt={1}>
                Access the courses you've enrolled in.
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }} href="/my-courses">
                My Courses
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box p={3} bgcolor="#e8f5e9" borderRadius={2}>
              <Typography variant="h6">Payment Status</Typography>
              <Typography variant="body2" mt={1}>
                Check your fee payment and installment history.
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }} href="/payment-status">
                View Payments
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StudentDashboard;
