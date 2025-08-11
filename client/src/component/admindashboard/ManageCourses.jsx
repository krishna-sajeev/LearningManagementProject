import React, { useState } from "react";
import { TextField, Button, Container, Paper, MenuItem } from "@mui/material";
import axios from "axios";

const ManageCourses = () => {
  const [course, setCourse] = useState({
    courseId: "",
    title: "",
    description: "",
    duration: "",
    instructor: "",
    status: "",
    fee: "",
    icon: "",
    date: "",
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/addCourse", course);
      alert("Course added successfully!");
      setCourse({
        courseId: "",
        title: "",
        description: "",
        duration: "",
        instructor: "",
        status: "",
        fee: "",
        icon: "",
        date: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error adding course");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 3, marginTop: 3 }}>
        
        <form onSubmit={handleSubmit}>
          <h1>Add Course</h1>
          <TextField label="Course ID" 
          name="courseId" 
          value={course.courseId} 
          onChange={handleChange} 
          fullWidth margin="normal"/>
          <TextField label="Title" name="title" value={course.title} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Description" name="description" value={course.description} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Duration" name="duration" value={course.duration} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Instructor" name="instructor" value={course.instructor} onChange={handleChange} fullWidth margin="normal" />
          <TextField select label="Status" name="status" value={course.status} onChange={handleChange} fullWidth margin="normal">
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
          <TextField label="Fee" name="fee" type="number" value={course.fee} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Icon URL" name="icon" value={course.icon} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Date"
           name="startdate" type="date"
            value={course.startdate}
             onChange={handleChange}
              fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Add Course</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ManageCourses;
