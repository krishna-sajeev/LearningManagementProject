import React from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

const ManageUser = () => {
  return (
    <Box display="flex">
      <Sidebar role="admin" />
      <Box flexGrow={1}>
        <Header title="Manage Users" />
        <Box p={3}>
          <Typography variant="h5" gutterBottom>
            User Management
          </Typography>
           <Paper elevation={5} sx={{ 
            p:30,
             mt:8 }}>
            <Typography variant="body1">User list will go here...</Typography>
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item>
                <Button variant="contained" color="primary">Add User</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="secondary">Edit User</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="error">Delete User</Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageUser;
