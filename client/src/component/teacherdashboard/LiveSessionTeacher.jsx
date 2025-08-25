import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const LiveSessionTeacher = () => {
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    date: "",
    liveUrl: "",
    instructorId: ""
  });
  const [selectedSession, setSelectedSession] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8081/display");
        setCourses(res.data);
      } catch (error) {
        console.error("Error loading courses:", error);
      }
    };
    fetchCourses();

    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/livesessions/live-display");
      setSessions(res.data);
    } catch (error) {
      console.error("Error loading sessions:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSession = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/livesessions/add", formData);
      if (res.data.status === "success") {
        setSnackbar({
          open: true,
          message: "Live session added successfully!",
          severity: "success",
        });
        
        setFormData({ courseId: "", date: "", liveUrl: "",instructorId: localStorage.getItem("id")  });
        
        fetchSessions();
      }
    } catch (error) {
       console.log(localStorage.getItem("id"))
      console.error("Error adding session:", error);
      setSnackbar({
        open: true,
        message: "Error adding live session",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/livesessions/delete/${id}`);
      setSnackbar({
        open: true,
        message: "Live session deleted successfully!",
        severity: "success",
      });
      fetchSessions();
      setSelectedSession("");
    } catch (error) {
      console.error("Error deleting session:", error);
      setSnackbar({
        open: true,
        message: "Error deleting session",
        severity: "error",
      });
    }
  };

  const selected = sessions.find((s) => s.id === parseInt(selectedSession));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Live Sessions
      </Typography>

      {/* Add Session Form */}
      <Box
        component="form"
        onSubmit={handleAddSession}
        sx={{ display: "grid", gap: 2, maxWidth: 500, mb: 4 }}
      >
        <FormControl fullWidth>
          <InputLabel>Select Course</InputLabel>
          <Select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
          >
            {courses.map((course) => (
              <MenuItem key={course.courseId} value={course.courseId}>
                {course.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          label="Live Session URL"
          name="liveUrl"
          value={formData.liveUrl}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="contained">
          Add Session
        </Button>
      </Box>

      {/* Existing Sessions */}
      <Typography variant="h6" gutterBottom>
        Existing Sessions
      </Typography>

      <FormControl fullWidth sx={{ maxWidth: 400, mb: 2 }}>
        <InputLabel>Select Session Date</InputLabel>
        <Select
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
        >
          {sessions.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.date}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selected && (
        <Box sx={{ border: "1px solid #ddd", p: 2, borderRadius: 2 }}>
          <Typography>
            <strong>Course:</strong> {selected.course?.title}
          </Typography>
          <Typography>
            <strong>Date:</strong> {selected.date}
          </Typography>
          <Typography>
            <strong>Live URL:</strong>{" "}
            <a
  href={selected.liveUrl.startsWith("http") ? selected.liveUrl : `https://${selected.liveUrl}`}
  target="_blank"
  rel="noopener noreferrer"
>
  {selected.liveUrl}
</a>
          </Typography>

          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => handleDelete(selected.id)}
          >
            Delete Session
          </Button>
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default LiveSessionTeacher;
