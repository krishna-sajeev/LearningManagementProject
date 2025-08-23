import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

const API_BASE = "http://localhost:8081";

const Attendance = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load courses on mount
  useEffect(() => {
    const loadCourses = async () => {
      setLoadingCourses(true);
      setError("");
      try {
        // your CourseController exposes /display
        const res = await axios.get(`${API_BASE}/courses`);
        setCourses(res.data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses");
      } finally {
        setLoadingCourses(false);
      }
    };
    loadCourses();
  }, []);

  const handleLoadStudents = async () => {
    if (!course || !date) return;
    setLoadingStudents(true);
    setError("");
    try {
      // EnrollmentController: /students/{courseId}
      const res = await axios.get(`${API_BASE}/students/${course}`);
      const list = (res.data || []).map((e, idx) => ({
        id: e.userId ?? idx,            // unique row key
        userId: e.userId,
        studentName: e.studentName,
        email: e.email,
        courseId: e.courseId,
      }));
      setStudents(list);
      // reset attendance map
      const initial = {};
      list.forEach(s => { initial[s.userId] = false; });
      setAttendance(initial);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load students");
    } finally {
      setLoadingStudents(false);
    }
  };

  const toggleAttendance = (userId) => {
    setAttendance(prev => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleSubmit = async () => {
    if (!course || !date || students.length === 0) {
      setError("Please select course, date and load students first");
      return;
    }
    setSaving(true);
    setError("");

    const payload = students.map(s => ({
      courseId: course,
      studentId: s.userId,
      studentName: s.studentName,
      email: s.email,
      date,                  // yyyy-MM-dd string; Spring maps to LocalDate
      present: !!attendance[s.userId],
    }));

    try {
      await axios.post(`${API_BASE}/attendance/save`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Attendance saved successfully!");
    } catch (err) {
      console.error("Error saving attendance:", err);
      setError(
        err?.response?.data || "Failed to save attendance"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Add Attendance
      </Typography>

      {error && (
        <Box mb={2}>
          <Alert severity="error">{String(error)}</Alert>
        </Box>
      )}

      <Box display="flex" alignItems="center" gap={3} mb={4} flexWrap="wrap">
        <FormControl sx={{ minWidth: 260 }}>
          <InputLabel>Select Course</InputLabel>
          <Select
            value={course}
            label="Select Course"
            onChange={(e) => setCourse(e.target.value)}
          >
            {loadingCourses && (
              <MenuItem value="" disabled>
                Loading…
              </MenuItem>
            )}
            {!loadingCourses &&
              courses.map((c) => (
                <MenuItem key={c} value={c}>
                  {c.toUpperCase()}
                </MenuItem>
              ))}
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
          onClick={handleLoadStudents}
          disabled={!course || !date || loadingStudents}
        >
          {loadingStudents ? (
            <>
              <CircularProgress size={18} sx={{ mr: 1 }} /> Loading…
            </>
          ) : (
            "Load Students"
          )}
        </Button>
      </Box>

      {students.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Student ID (userId)</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">Present</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.studentName}</TableCell>
                    <TableCell>{s.userId}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={!!attendance[s.userId]}
                        onChange={() => toggleAttendance(s.userId)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={3} textAlign="right">
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? (
                <>
                  <CircularProgress size={18} sx={{ mr: 1 }} />
                  Saving…
                </>
              ) : (
                "Submit Attendance"
              )}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Attendance;
