import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AddReference = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    materialUrl: "",
    courseId: "", 
  });
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
      } catch (err) {
        console.error("Error fetching courses:", err);
        setSnackbar({
          open: true,
          message: "Failed to load courses",
          severity: "error",
        });
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/references/addReference",
        formData
      );

      if (response.data.status === "Successfully Added") {
        setSnackbar({
          open: true,
          message: "Reference added successfully!",
          severity: "success",
        });
        setTimeout(() => navigate("/teacher/refernce_material"), 1500);
      } else {
        setSnackbar({
          open: true,
          message: response.data.error || "Error saving reference.",
          severity: "error",
        });
      }
    } catch (err) {
      console.error("Error saving reference:", err);
      setSnackbar({
        open: true,
        message: "Server error. Please try again later.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar({ ...snackbar, open: false });

  return (
    <div>
      <h1>Add Reference</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "1rem", maxWidth: "400px" }}
      >
        <TextField
          label="Material Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        <TextField
          label="Material URL"
          name="materialUrl"
          value={formData.materialUrl}
          onChange={handleChange}
          required
        />
        <TextField
          select
          label="Course"
          name="courseId" 
          value={formData.courseId}
          onChange={handleChange}
          required
        >
          <MenuItem value="">
            <em>Select Course</em>
          </MenuItem>
          {courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.title}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained">
          Save Reference
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddReference;
