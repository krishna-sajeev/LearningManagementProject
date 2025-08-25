import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Button,
  Chip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosinteceptor";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("http://localhost:8081/display")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleExplore = (course) => {
    navigate(`/student/${course.courseId}`, { state: { course } });
  };

  return (
    <>
      {/* Course Cards Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(550px, 7fr))",
          gap: 1,
          mt: 1,
        }}
      >
        {courses.map((course) => (
          <Card
            key={course.id}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              width: "60%",
              transition: "all 0.3s ease",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500], width: 32, height: 32 }}>
                  {course.title?.charAt(0) || "C"}
                </Avatar>
              }
              title={
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {course.title}
                </Typography>
              }
              subheader={
                <Typography variant="caption" color="text.secondary">
                  Starts: {course.date}
                </Typography>
              }
              sx={{ p: 1.5 }}
            />

            <CardMedia component="img" image={course.icon} alt="Course Banner" />

            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1, minHeight: 40 }}
                noWrap
              >
                {course.description}
              </Typography>

              <Chip
                label={course.level || "Beginner"}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mb: 1 }}
              />

              <Box>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    background: "linear-gradient(45deg, #3498db, #2ecc71)",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: 2,
                    "&:hover": {
                      background: "linear-gradient(45deg, #2980b9, #27ae60)",
                    },
                  }}
                  onClick={() => handleExplore(course)}
                >
                  Explore
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Course;
