import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const statusOptions = ['Active', 'Late Submission Permitted', 'Closed'];

const coursesWithBatches = {
  Mathematics: ['Batch A', 'Batch B', 'Batch C'],
  Science: ['Batch X', 'Batch Y'],
  English: ['Batch 1', 'Batch 2', 'Batch 3'],
};

const EditAssignment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    course: '',
    batch: '',
    dueDate: '',
    status: 'Active',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    // Simulated data with batch included
    const allAssignments = [
      { id: 1, title: 'Math Homework', course: 'Mathematics', batch: 'Batch A', dueDate: '2025-08-20', status: 'Active' },
      { id: 2, title: 'Science Project', course: 'Science', batch: 'Batch X', dueDate: '2025-08-25', status: 'Closed' },
    ];

    const found = allAssignments.find(item => item.id === Number(id));
    if (found) {
      setFormData(found);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'course') {
      setFormData({ ...formData, course: value, batch: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateDueDate = (dateStr) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const dueDate = new Date(dateStr);
    return dueDate >= today;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateDueDate(formData.dueDate)) {
      setSnackbar({
        open: true,
        message: 'Due date cannot be in the past.',
        severity: 'error',
      });
      return;
    }

    // TODO: Call API to update assignment here

    setSnackbar({
      open: true,
      message: 'Assignment updated successfully!',
      severity: 'success',
    });

    setTimeout(() => {
      navigate('/teacher/assignment');
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h1>Edit Assignment</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
        <TextField
          label="Assignment Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <TextField
          select
          label="Course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <MenuItem value="">
            <em>Select Course</em>
          </MenuItem>
          {Object.keys(coursesWithBatches).map(course => (
            <MenuItem key={course} value={course}>
              {course}
            </MenuItem>
          ))}
        </TextField>

        {formData.course && (
          <TextField
            select
            label="Batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            required
          >
            <MenuItem value="">
              <em>Select Batch</em>
            </MenuItem>
            {coursesWithBatches[formData.course].map(batch => (
              <MenuItem key={batch} value={batch}>
                {batch}
              </MenuItem>
            ))}
          </TextField>
        )}

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

        <TextField
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          {statusOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained">Update Assignment</Button>
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

export default EditAssignment;
