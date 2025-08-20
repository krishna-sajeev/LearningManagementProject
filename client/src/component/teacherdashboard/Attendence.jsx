import React, { useState } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Box,
} from "@mui/material";

const Attendance = () => {
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  // Dummy students per course (replace with API calls later)
  const courseStudents = {
    math101: [
      { id: 1, name: "Alice Johnson", studentId: "M101", email: "alice@mail.com" },
      { id: 2, name: "Bob Smith", studentId: "M102", email: "bob@mail.com" },
    ],
    cs102: [
      { id: 3, name: "Charlie Brown", studentId: "C201", email: "charlie@mail.com" },
      { id: 4, name: "Diana Prince", studentId: "C202", email: "diana@mail.com" },
    ],
    eng201: [
      { id: 5, name: "Edward Stark", studentId: "E301", email: "edward@mail.com" },
      { id: 6, name: "Fiona White", studentId: "E302", email: "fiona@mail.com" },
    ],
  };

  const handleLoadStudents = () => {
    if (course) {
      setStudents(courseStudents[course] || []);
      setAttendance({});
    }
  };

  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = () => {
    const presentStudents = students
      .filter((s) => attendance[s.id])
      .map((s) => ({
        studentId: s.studentId,
        name: s.name,
        email: s.email,
      }));

    const payload = {
      course,
      date,
      presentStudents,
    };

    console.log("Submitting Attendance:", payload);
    alert("Attendance submitted! (check console)");
    
  };

  return (
    <Box p={4}>
      
      <Typography variant="h4" gutterBottom>
       Add Attendance
      </Typography>

      
      <Box display="flex" alignItems="center" gap={3} mb={4}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Course</InputLabel>
          <Select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            label="Select Course"
          >
            <MenuItem value="math101">Math 101</MenuItem>
            <MenuItem value="cs102">CS 102</MenuItem>
            <MenuItem value="eng201">English 201</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleLoadStudents}
          disabled={!course || !date}
        >
          Load Students
        </Button>
      </Box>

      {/* Student Table */}
      {students.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">Present</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.studentId}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={attendance[s.id] || false}
                        onChange={() => toggleAttendance(s.id)}
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Submit Button */}
          <Box mt={3} textAlign="right">
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
            >
              Submit Attendance
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Attendance;
