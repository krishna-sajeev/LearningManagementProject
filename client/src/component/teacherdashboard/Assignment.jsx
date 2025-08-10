import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Assignment = () => {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Math Homework', course: 'Mathematics', batch: 'Batch A', dueDate: '2025-08-20', status: 'Active' },
    { id: 2, title: 'Science Project', course: 'Science', batch: 'Batch B', dueDate: '2025-08-25', status: 'Closed' },
  ]);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this assignment?');
    if (!confirmed) return;

    console.log(`Delete assignment with id: ${id}`);
  };

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
              <TableCell>Course</TableCell>
              <TableCell>Batch</TableCell> 
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.course}</TableCell>
                <TableCell>{assignment.batch}</TableCell> 
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>{assignment.status}</TableCell> 
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ marginRight: '0.5rem' }}
                    onClick={() => navigate(`/view-submission/${assignment.id}`)}
                  >
                    View Submission
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    style={{ marginRight: '0.5rem' }}
                    onClick={() => navigate(`/edit-assignment/${assignment.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(assignment.id)}
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
