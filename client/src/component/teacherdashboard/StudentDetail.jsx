import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  Button,
} from "@mui/material";

const EnrolledCourses = () => {
  const [userId, setUserId] = useState(""); // input userId
  const [enrollments, setEnrollments] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Fetch enrollments by userId
  const fetchEnrollments = async () => {
    if (!userId.trim()) return;
    try {
      const response = await fetch(
        `http://localhost:8081/users/${userId}/enrollments`
      );
      if (!response.ok) throw new Error("Failed to fetch enrollments");
      const data = await response.json();
      setEnrollments(data);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setEnrollments([]);
      setSearchPerformed(true);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Enrolled Courses
      </Typography>

      {/* Search by userId */}
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <TextField
          label="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={fetchEnrollments}>
          Fetch Enrollments
        </Button>
      </Box>

      {/* Enrollment Table */}
      {enrollments.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Enroll ID</TableCell>
                <TableCell>Course ID</TableCell>
                <TableCell>Enroll Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.map((enroll) => (
                <TableRow key={enroll.enrollId}>
                  <TableCell>{enroll.enrollId}</TableCell>
                  <TableCell>{enroll.courseId}</TableCell>
                  <TableCell>{enroll.enrollDate}</TableCell>
                  <TableCell>{enroll.status}</TableCell>
                  <TableCell>{enroll.paymentId}</TableCell>
                  <TableCell>{enroll.user.fullName}</TableCell>
                  <TableCell>{enroll.user.email}</TableCell>
                  <TableCell>{enroll.user.mobileNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        searchPerformed && (
          <Typography variant="subtitle1" color="textSecondary">
            No enrollments found.
          </Typography>
        )
      )}
    </Box>
  );
};

export default EnrolledCourses;
