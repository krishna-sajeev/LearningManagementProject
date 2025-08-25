import React from "react";
import { Box, Typography, Card, Divider } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Course from "./Course";

const StudentDashboard = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      {/* Sidebar */}
      <Sidebar role="student" />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            bgcolor: "#fff",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #3498db, #2ecc71)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🎓 Student Dashboard
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: "text.secondary", mb: 4 }}
          >
            Your personalized learning space
          </Typography>

          {/* Section Divider */}
          <Divider sx={{ mb: 3 }} textAlign="left">
            <Typography variant="h6" fontWeight="bold" color="primary">
              📚 Explore Courses
            </Typography>
          </Divider>

          {/* Courses Section */}
          <Course />
        </Card>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
