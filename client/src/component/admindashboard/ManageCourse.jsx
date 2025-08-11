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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
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
    date: ""
  });

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/display");
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
        await axios.delete(`http://localhost:8080/courses/${id}`);
        setCourses(courses.filter((course) => course.id!== id));
      } catch (err) {
        console.error("Error deleting course:", err);
      }
    }
  };

  // Edit course open
  const handleEditClick = (course) => {
    setEditCourse(course);
    setOpenEdit(true);
  };

  // Save edit
  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/courses/${editCourse.id}`,
        editCourse
      );
      setCourses(
        courses.map((c) =>
          c.id === editCourse.id ? editCourse : c
        )
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell>{course.fee}</TableCell>
                <TableCell>{course.icon}</TableCell>
                <TableCell>{course.date}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(course)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(course.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


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
    </Container>
=
          <Paper elevation={3} sx={{ p: 34, mt: 2 }}>
            <Typography variant="body1">Course list will go here...</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item>
               <Link to="admincourse/add" style={{ textDecoration: "none" }}>
  <Button variant="contained" color="primary">Add Course</Button>
</Link>

              </Grid>
              <Grid item>
                <Button variant="outlined" color="secondary">Edit Course</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="error">Delete Course</Button>
              </Grid>
            </Grid>
          </Paper>
        
    
    

  );
};