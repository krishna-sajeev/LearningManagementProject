import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import axios from "axios";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    icon: "",
    status: "active",
    fee: "",
  });

  const handleChange = (e) => {
    
const value = e.target.name === "fee" ? parseFloat(e.target.value) : e.target.value;
setFormData({ ...formData, [e.target.name]: value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/addCourse", formData);
      alert("Course added successfully!");
      setFormData({
        title: "",
        description: "",
        instructor: "",
        duration: "",
        icon: "",
        status: "active",
        fee: "",
      });
    } catch (error) {
      console.error("Error adding course", error);
      alert("Failed to add course.");
    }
  };

  return (
    <Box
      sx={{
        marginLeft: "220px",
        marginTop: "64px",
        padding: 4,
        maxWidth: "600px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Add New Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Course Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          required
        />
        <TextField
          fullWidth
          label="Instructor"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          margin="normal"
          placeholder="e.g. 4 weeks"
          required
        />
        <TextField
          fullWidth
          label="Icon URL"
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          margin="normal"
          placeholder="Paste image URL or icon name"
        />
        <TextField
          fullWidth
          label="Fee"
          name="fee"
          value={formData.fee}
          onChange={handleChange}
          margin="normal"
          placeholder="e.g. 999"
          required
        />
        <TextField
          select
          fullWidth
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Course
        </Button>
      </form>
    </Box>
  );
};

export default AddCourse;
