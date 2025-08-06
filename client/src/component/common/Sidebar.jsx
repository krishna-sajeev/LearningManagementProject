import React from "react";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const links = {
    admin: [
      { name: "Manage Users", path: "/adminuser" },
      { name: "Manage Courses", path: "/admincourse" },
      { name: "Payments", path: "/adminpayments" },
      { name: "Reports", path: "/adminreports" },
      { name: "Logout", path: "/login" },
      { name: "Manage Courses", path: "/admincourse" }

    ],
    teacher: [
      { name: "Manage Student Detail", path: "/teacher/student-detail" },
      { name: "Assignments", path: "/teacher/assignment" },
      { name: "Attendance", path: "/teacher/attendance" },
      { name: "View Batch Schedule", path: "/teacher/schedule" },
      { name: "Logout", path: "/login" },
    ],
  };

  return (
    <Box
      width="220px"
      height="100vh"
      bgcolor="#2c3e50"
      color="#ecf0f1"
      p={2}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
      }}
    >
      <List>
        {links[role]?.map((link) => (
          <ListItemButton key={link.name} onClick={() => navigate(link.path)}>
            <ListItemText primary={link.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
