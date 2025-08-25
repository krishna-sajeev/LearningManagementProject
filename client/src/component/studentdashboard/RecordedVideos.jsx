import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Link,
} from "@mui/material";
import axios from "axios";

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 1. Get all enrollments of student
      const enrollRes = await axios.get(
        `http://localhost:8081/api/enrollments/${userId}`
      );
      const enrolledCourses = enrollRes.data;
      setEnrollments(enrolledCourses);

      let allVideos = [];

      // 2. For each enrolled course, fetch recorded videos
      for (let course of enrolledCourses) {
        const videoRes = await axios.get(
          `http://localhost:8081/api/recordedvideos/${course.courseId}`
        );
        allVideos = [...allVideos, ...videoRes.data];
      }

      setVideos(allVideos);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1">Loading Dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Recorded Videos
      </Typography>

      {videos.length === 0 ? (
        <Typography>No recorded videos available yet.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Course</strong></TableCell>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Video</strong></TableCell>
                <TableCell><strong>Uploaded By</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>{video.course?.title || "N/A"}</TableCell>
                  <TableCell>{video.title}</TableCell>
                  <TableCell>
                    <Link
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Video
                    </Link>
                  </TableCell>
                  <TableCell>{video.course?.instructor || "Teacher"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default StudentDashboard;
