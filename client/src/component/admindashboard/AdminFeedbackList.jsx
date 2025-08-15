import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";

const AdminFeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  //  Fetch all feedback
  const fetchFeedback = async (type = null) => {
    try {
      let url = "http://localhost:8080/feedbacklist";
      if (type) {
        url += `/type/${type}`;
      }
      const res = await axios.get(url);
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback(); // load all initially
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Student Feedback
      </Typography>

      {/* Filter Buttons */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => fetchFeedback()}
        sx={{ marginRight: 1 }}
      >
        All
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => fetchFeedback("TEACHER")}
        sx={{ marginRight: 1 }}
      >
        Teacher
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={() => fetchFeedback("COURSE")}
      >
        Course
      </Button>

      {/* Feedback Table */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Course ID</b></TableCell>
              <TableCell><b>User ID</b></TableCell>
              <TableCell><b>Review Type</b></TableCell>
              <TableCell><b>Review Date</b></TableCell>
              <TableCell><b>Star</b></TableCell>
              <TableCell><b>Comment</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.length > 0 ? (
              feedbacks.map((fb) => (
                <TableRow key={fb.id}>
                  <TableCell>{fb.id}</TableCell>
                  <TableCell>{fb.courseId}</TableCell>
                  <TableCell>{fb.userId}</TableCell>
                  <TableCell>{fb.reviewType}</TableCell>
                  <TableCell>{fb.reviewDate}</TableCell>
                  <TableCell>{fb.star}</TableCell>
                  <TableCell>{fb.comment}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No feedback available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminFeedbackList;
