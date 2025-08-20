import React, { useState, useEffect } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

const StudentDetail = () => {
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8081/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  
  const fetchStudentsByCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:8081/students/${courseId}`);
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data);
      setSearchPerformed(false); // reset searchPerformed when fetching by course
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
      setSearchPerformed(false);
    }
  };

  const handleCourseChange = (value) => {
    setCourse(value);
    fetchStudentsByCourse(value);
  };

  
  const handleSearch = async () => {
    if (!searchName.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8081/students/search?name=${searchName}`
      );
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
      setSearchPerformed(true);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Student Details
      </Typography>

      
      <Box display="flex" alignItems="center" gap={3} mb={4}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Course</InputLabel>
          <Select
            value={course}
            onChange={(e) => handleCourseChange(e.target.value)}
            label="Select Course"
          >
            {courses.map((c) => (
              <MenuItem key={c} value={c}>
                {c.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Search Student"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      
      {students.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Course ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.enrollId}>
                  <TableCell>{s.userId}</TableCell>
                  <TableCell>{s.studentName}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.contactNumber}</TableCell>
                  <TableCell>{s.courseId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        searchPerformed && (
          <Typography variant="subtitle1" color="textSecondary">
            No students found.
          </Typography>
        )
      )}
    </Box>
  );
};

export default StudentDetail;
