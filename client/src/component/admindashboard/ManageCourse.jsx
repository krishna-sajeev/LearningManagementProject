import React from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { Link } from "react-router-dom";

const ManageCourse = () => {
  return (
    <Box display="flex">
      <Sidebar role="admin" />
      <Box flexGrow={1}>
        <Header title="Manage Courses" />
        <Box p={3}>
          <Typography variant="h5" gutterBottom>
            Course Management
          </Typography>

          <Paper elevation={3} sx={{ p: 34, mt: 2 }}>
            <Typography variant="body1">Course list will go here...</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item>
               <Link to="/admin/admincourse/add" style={{ textDecoration: "none" }}>
  <Button variant="contained" color="primary">Add Course</Button>
</Link>

              </Grid>
              <Grid item>
                <Button variant="outlined" color="secondary">Edit Course</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="error">Delete Course</Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageCourse;
