import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const NewAssignment = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ title: '', details: '', course: '', dueDate: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch courses from backend on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8081/display');
        setCourses(response.data); 
      } catch (error) {
        console.error('Error fetching courses:', error);
        setSnackbar({ open: true, message: 'Failed to load courses', severity: 'error' });
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateDueDate = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateStr);
    return dueDate >= today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateDueDate(formData.dueDate)) {
      setSnackbar({ open: true, message: 'Due date cannot be in the past.', severity: 'error' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/addAssignment', formData);
      if (response.data.status === 'Successfully Added') {
        setSnackbar({ open: true, message: 'Assignment saved successfully!', severity: 'success' });
        setTimeout(() => navigate('/teacher/assignment'), 1500);
      } else {
        setSnackbar({ open: true, message: response.data.status || 'Error saving assignment.', severity: 'error' });
      }
    } catch (error) {
      console.error('Error saving assignment:', error);
      setSnackbar({ open: true, message: 'Server error. Please try again later.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h1>New Assignment</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
        <TextField label="Assignment Title" name="title" value={formData.title} onChange={handleChange} required />
        <TextField
          label="Assignment Details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          multiline
          rows={4}
          placeholder="Enter detailed description of the assignment"
          required
        />
        <TextField select label="Course" name="course" value={formData.course} onChange={handleChange} required>
          <MenuItem value=""><em>Select Course</em></MenuItem>
          {courses.map(course => (
            <MenuItem key={course.id} value={course.title}>
              {course.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: todayStr }}
          required
        />
        <Button type="submit" variant="contained">Save Assignment</Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewAssignment;
