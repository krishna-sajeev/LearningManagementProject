import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editCourse, setEditCourse] = useState({
    userId: "",
    title: "",
    description: "",
    duration: "",
    instructor: "",
    status: "",
    fee: "",
    icon: "",
    date: "",
  });

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8081/display");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Delete course
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:8081/courses/${id}`);
        setCourses(courses.filter((course) => course.id !== id));
      } catch (err) {
        console.error("Error deleting course:", err);
      }
    }
  };

  // Open edit dialog
  const handleEditClick = (course) => {
    setEditCourse(course);
    setOpenEdit(true);
  };

  // Save edit
  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:8081/courses/${editCourse.id}`,
        editCourse
      );
      setCourses(
        courses.map((c) => (c.id === editCourse.id ? editCourse : c))
      );
      setOpenEdit(false);
    } catch (err) {
      console.error("Error updating course:", err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Courses
      </Typography>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          {Object.keys(editCourse).map((field) =>
            field !== "userId" ? (
              <TextField
                key={field}
                margin="dense"
                label={field}
                fullWidth
                value={editCourse[field]}
                onChange={(e) =>
                  setEditCourse({ ...editCourse, [field]: e.target.value })
                }
              />
            ) : null
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      
      {/* Courses Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>{course.date}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell>{course.fee}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEditClick(course)}
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(course.id)}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {courses.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No courses available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageCourse;
