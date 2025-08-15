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
  TextField,

} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
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
    date: ""
  });

  // Fetch courses
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

    {/* Your table code here */}

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

    {/* The Paper section should be here */}
    <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
      <Typography variant="body1">Course list will go here...</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <Link to="/admin/adminmanagecourse" style={{ textDecoration: "none" }}>
            Add Course
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
  </Container>
);

};
export default ManageCourse;