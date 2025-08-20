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

const RecordedVideoTeacher = () => {
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    url: "",
  });
  const [selectedVideo, setSelectedVideo] = useState("");
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

    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/recordedvideos/display");
      setVideos(res.data);
    } catch (error) {
      console.error("Error loading videos:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/recordedvideos/add", formData);
      if (res.data.status === "success") {
        setSnackbar({
          open: true,
          message: "Recorded video added successfully!",
          severity: "success",
        });
        setFormData({ courseId: "", title: "", url: "" });
        fetchVideos();
      }
    } catch (error) {
      console.error("Error adding video:", error);
      setSnackbar({
        open: true,
        message: "Error adding recorded video",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/recordedvideos/delete/${id}`);
      setSnackbar({
        open: true,
        message: "Recorded video deleted successfully!",
        severity: "success",
      });
      fetchVideos();
      setSelectedVideo("");
    } catch (error) {
      console.error("Error deleting video:", error);
      setSnackbar({
        open: true,
        message: "Error deleting video",
        severity: "error",
      });
    }
  };

  const selected = videos.find((v) => v.id === parseInt(selectedVideo));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Recorded Videos
      </Typography>

      {/* Add Video Form */}
      <Box
        component="form"
        onSubmit={handleAddVideo}
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
              <MenuItem key={course.id} value={course.id}>
                {course.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Video Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <TextField
          label="Video URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="contained">
          Add Video
        </Button>
      </Box>

      {/* Existing Videos */}
      <Typography variant="h6" gutterBottom>
        Existing Recorded Videos
      </Typography>

      <FormControl fullWidth sx={{ maxWidth: 400, mb: 2 }}>
        <InputLabel>Select Video</InputLabel>
        <Select
          value={selectedVideo}
          onChange={(e) => setSelectedVideo(e.target.value)}
        >
          {videos.map((v) => (
            <MenuItem key={v.id} value={v.id}>
              {v.title}
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
            <strong>Title:</strong> {selected.title}
          </Typography>
          <Typography>
            <strong>Video URL:</strong>{" "}
            <a
              href={selected.url.startsWith("http") ? selected.url : `https://${selected.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selected.url}
            </a>
          </Typography>

          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => handleDelete(selected.id)}
          >
            Delete Video
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

export default RecordedVideoTeacher;
