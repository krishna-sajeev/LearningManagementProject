import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

const Sidebar = ({ role }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (link) => {
    if (link.name === "Logout") {
      localStorage.clear();
    }
    navigate(link.path);
    setMobileOpen(false); // close drawer on mobile after click
  };

  const sidebarLinks = {
    admin: [
      { name: "Manage Users", path: "/adminuser" },
      { name: "Manage Courses", path: "/admincourse" },
      { name: "Payments", path: "/adminpayments" },
      { name: "Reports", path: "/adminreports" },
      { name: "Logout", path: "/login" },
    ],
    teacher: [
      { name: "Manage Student Detail", path: "/teacher/student-detail" },
      { name: "Assignments", path: "/teacher/assignment" },
      { name: "Attendance", path: "/teacher/attendance" },
      { name: "View Batch Schedule", path: "/teacher/schedule" },
      { name: "Logout", path: "/login" },
    ],
    student: [
      { name: "My Profile", path: "/student/student-dashboard" },
      { name: "Enrolled Course", path: "/student/enrolled-course" },
      { name: "Feedback", path: "/student/feedback" },
      { name: "Live Session", path: "/student/live-session" },
      { name: "Recorded videos", path: "/student/recorded-videos" },
      { name: "Reference Material", path: "/student/reference-material" },
      { name: "Assignment", path: "/student/assignment" },
      { name: "Project", path: "/student/project" },
    ],
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Learning Platform
      </Typography>
      <List>
        {sidebarLinks[role]?.map((link) => (
          <ListItemButton key={link.name} onClick={() => handleNavigation(link)}>
            <ListItemText primary={link.name} />
          </ListItemButton>
        )) || (
          <ListItemText primary="No sidebar available for this role." />
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Top Navbar */}
      <AppBar component="nav" position="fixed" sx={{ bgcolor: "#2c3e50" }}>
  <Toolbar>
    {/* Menu Icon (only visible on small screens) */}
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { sm: "none" } }}
    >
      <MenuIcon />
    </IconButton>

    {/* App Title */}
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ flexGrow: 1 }}
    >
      Learning Platform
    </Typography>

    {/* Right-side Buttons */}
    <Box sx={{ display: { xs: "none", sm: "block" } }}>
      <Button sx={{ color: "#ecf0f1" }} onClick={() => navigate("/")}>
        Home
      </Button>
      <Button sx={{ color: "#ecf0f1" }} onClick={() => navigate("/about")}>
        About Us
      </Button>
      <Button sx={{ color: "#ecf0f1" }} onClick={() => navigate("/login")}>
        Login
      </Button>
    </Box>
  </Toolbar>
</AppBar>


      {/* Drawer (Sidebar) */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#2c3e50",
              color: "#ecf0f1",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Placeholder */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { sm: `${drawerWidth}px` } }}>
        <Toolbar />
        {/* Your actual page content will go here */}
        <Typography variant="h4">Welcome to the LMS Dashboard</Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
