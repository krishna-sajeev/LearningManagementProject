import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const Assignment = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  // Fetch all assignments
  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:8081/viewAssignments');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  // Delete assignment by ID
  const handleDelete = async (id) => {
    if (!id) return;

    const confirmed = window.confirm('Are you sure you want to delete this assignment?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8081/deleteAssignment/${id}`);
      setAssignments(assignments.filter(a => a.assignmentId !== id));
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: '1rem'
        }}
      >
        <h1 style={{ margin: 0 }}>Assignment</h1>
        <Button
          variant="contained"
          style={{ height: 70 }}
          onClick={() => navigate('/new-assignment')}
        >
          + New Assignment
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Assignment Title</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.assignmentId}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.details}</TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>{assignment.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ marginRight: '0.5rem' }}
                    onClick={() => navigate(`/view-submission/${assignment.assignmentId}`)}

                  >
                    View Submission
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    style={{ marginRight: '0.5rem' }}
                    onClick={() => navigate(`/edit-assignment/${assignment.assignmentId}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(assignment.assignmentId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Assignment;
