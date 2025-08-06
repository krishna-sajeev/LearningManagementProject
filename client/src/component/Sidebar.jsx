import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography, Box } from "@mui/material";
import { Dashboard, School, Payment, ExitToApp } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 260;

const Sidebar = () => {
  const navigate = useNavigate();

  // ✅ Fetch data from localStorage
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box p={2}>
        <Typography variant="h6">Welcome, {userName}</Typography>
      </Box>

      <List>
        {role === "STUDENT" && (
          <>
            <ListItem button component={Link} to="/student-dashboard">
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button component={Link} to="/courses">
              <ListItemIcon><School /></ListItemIcon>
              <ListItemText primary="View Courses" />
            </ListItem>

            <ListItem button component={Link} to="/my-courses">
              <ListItemIcon><School /></ListItemIcon>
              <ListItemText primary="My Courses" />
            </ListItem>

            <ListItem button component={Link} to="/payment-status">
              <ListItemIcon><Payment /></ListItemIcon>
              <ListItemText primary="Payment Status" />
            </ListItem>
          </>
        )}

        <ListItem button onClick={handleLogout}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
