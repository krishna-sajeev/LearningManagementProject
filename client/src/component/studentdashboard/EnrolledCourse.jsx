import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Grid,
  CircularProgress,
  Chip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !token) {
      alert("Please login first.");
      return;
    }

    axios
      .get(`http://localhost:8081/students/${userId}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, [userId, token]);

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading enrolled courses...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        🎓 My Enrolled Courses
      </Typography>

      {courses.length === 0 ? (
        <Typography variant="body1">
          You are not enrolled in any courses yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                {/* Course image */}
                <CardMedia
                  component="img"
                  height="180"
                  image={course.icon || "https://via.placeholder.com/300x180?text=Course+Image"}
                  alt={course.title}
                  sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />

                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {course.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ minHeight: 50 }}
                  >
                    {course.description}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    👨‍🏫 <strong>Instructor:</strong> {course.instructor}
                  </Typography>
                  <Typography variant="body2">
                    ⏱ <strong>Duration:</strong> {course.duration}
                  </Typography>

                  <Chip
                    label={`₹ ${course.fee}`}
                    color="primary"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<SchoolIcon />}
                    href={`/courses/${course.id}`}
                  >
                    View Details
                  </Button>
                  <Button size="small" variant="outlined" color="secondary" >
                    Continue
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default EnrolledCourses;
