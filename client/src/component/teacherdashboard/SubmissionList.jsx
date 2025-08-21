// src/pages/SubmissionList.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';

const API_BASE = "http://localhost:8081";

const SubmissionList = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/assignments/${assignmentId}/submissions`)
      .then(res => setSubmissions(res.data))
      .catch(err => console.error("Error fetching submissions", err));
  }, [assignmentId]);

  return (
    <div>
      <h2>Submissions for Assignment {assignmentId}</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((sub) => (
              <TableRow key={sub.submissionId}>
                <TableCell>{sub.studentId}</TableCell>
                <TableCell>{new Date(sub.submissionDate).toLocaleString()}</TableCell>
                <TableCell>{sub.grade ?? "-"}</TableCell>
                <TableCell>{sub.feedback ?? "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/view-submission/${assignmentId}/${sub.submissionId}`)}
                  >
                    Grade
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button sx={{ mt: 2 }} onClick={() => navigate('/teacher/assignment')}>
        Back to Assignments
      </Button>
    </div>
  );
};

export default SubmissionList;
