import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const statusOptions = ['Active', 'Late Submission Permitted', 'Closed'];

const EditAssignment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    details: '',
    course: '',
    dueDate: '',
    status: 'Active',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Fetch assignment from backend
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get('http://localhost:8081/viewAssignments');
        const assignment = response.data.find(a => a.assignmentId === Number(id));
        if (assignment) {
          setFormData({
            title: assignment.title,
            details: assignment.details,
            course: assignment.course, // pre-filled course
            dueDate: assignment.dueDate,
            status: assignment.status,
          });
        }
      } catch (error) {
        console.error('Error fetching assignment:', error);
      }
    };
    fetchAssignment();
  }, [id]);

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
      setSnackbar({
        open: true,
        message: 'Due date cannot be in the past.',
        severity: 'error',
      });
      return;
    }

    try {
      await axios.put(`http://localhost:8081/updateAssignment/${id}`, formData);
      setSnackbar({
        open: true,
        message: 'Assignment updated successfully!',
        severity: 'success',
      });

      setTimeout(() => {
        navigate('/teacher/assignment');
      }, 1500);
    } catch (error) {
      console.error('Error updating assignment:', error);
      setSnackbar({
        open: true,
        message: 'Failed to update assignment.',
        severity: 'error',
      });
    }
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
          label="Assignment Details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          multiline
          rows={4}
          placeholder="Enter detailed description of the assignment"
          required
        />

       
  

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
