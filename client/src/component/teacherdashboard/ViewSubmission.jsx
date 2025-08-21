  // src/pages/ViewSubmission.jsx
  import React, { useState, useEffect } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import Button from '@mui/material/Button';
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';
  import TextField from '@mui/material/TextField';
  import Paper from '@mui/material/Paper';
  import axios from 'axios';

  const API_BASE = "http://localhost:8081"; // backend port

  const ViewSubmission = () => {
    const { assignmentId, submissionId } = useParams();
    const navigate = useNavigate();

    const [submissions, setSubmissions] = useState([]);
    const [submission, setSubmission] = useState(null);
    const [grade, setGrade] = useState('');
    const [feedback, setFeedback] = useState('');

    
    useEffect(() => {
      axios.get(`${API_BASE}/assignments/${assignmentId}/submissions`)
  .then(res => setSubmissions(res.data))
        .catch(err => console.error("Error fetching submissions", err));
    }, []);

    
    useEffect(() => {
  if (submissionId) {
    axios.get(`${API_BASE}/submissions/${submissionId}`)
      .then(res => {
        setSubmission(res.data);
        setGrade(res.data.grade ?? '');
        setFeedback(res.data.feedback ?? '');
      })
      .catch(() => setSubmission(null));
  }
}, [submissionId]);

    if (!submission) {
      return (
        <Box p={2}>
          <Typography variant="h6">Submission not found.</Typography>
          <Button sx={{ mt: 2 }} onClick={() => navigate('/teacher/assignment')}>
            Back to Assignments
          </Button>
        </Box>
      );
    }

    const currentIndex = submissions.findIndex((s) => s.submissionId === submission.submissionId);
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === submissions.length - 1;

   const handlePrev = () => {
  if (!isFirst) {
    navigate(`/view-submission/${assignmentId}/${submissions[currentIndex - 1].submissionId}`);
  }
};

  const handleNext = () => {
  if (!isLast) {
    navigate(`/view-submission/${assignmentId}/${submissions[currentIndex + 1].submissionId}`);
  }
};

    const handleDownload = () => {
      window.open(submission.submissionURL, '_blank', 'noopener,noreferrer');
    };

    const handleSave = () => {
      axios.put(`${API_BASE}/submissions/${submission.submissionId}`, {
        grade,
        feedback,
      })
      .then(res => {
        setSubmission(res.data);
        alert("Saved successfully!");
      })
      .catch(err => {
        console.error("Error saving grade/feedback", err);
        alert("Failed to save.");
      });
    };

    return (
      <Box p={2}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            Grading: {submission.studentId} - Assignment {submission.assignmentId}
          </Typography>

          <Box>
            <Button variant="outlined" onClick={handlePrev} disabled={isFirst} sx={{ mr: 1 }}>
              Previous Student
            </Button>
            <Button variant="outlined" onClick={handleNext} disabled={isLast}>
              Next Student
            </Button>
          </Box>
        </Box>

        {/* Submitted at */}
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Submitted on: {new Date(submission.submissionDate).toLocaleString()}
        </Typography>

        
        <Box display="flex" gap={2} flexWrap="wrap">
          
          <Paper sx={{ p: 2, flex: 2, minWidth: 300 }}>
  <Typography variant="subtitle1" gutterBottom>
    Submitted URL
  </Typography>

  {submission.submissionURL ? (
    <Typography variant="body2">
      <a 
  href={submission.submissionURL.startsWith("http") 
          ? submission.submissionURL 
          : `https://${submission.submissionURL}`} 
  target="_blank" 
  rel="noopener noreferrer"
  style={{ color: '#1976d2', textDecoration: 'underline' }}
>
  {submission.submissionURL}
</a>
    </Typography>
  ) : (
    <Typography variant="body2" color="textSecondary">
      No file submitted
    </Typography>
  )}
</Paper>

         
          <Paper sx={{ p: 2, flex: 1, minWidth: 260 }}>
            <Typography variant="subtitle1" gutterBottom>
              Grade Project
            </Typography>

            <TextField
              type="number"
              label="Grade out of 100"
              fullWidth
              value={grade}
              onChange={(e) => {
                const val = e.target.value === '' ? '' : Number(e.target.value);
                if (val === '' || (val >= 0 && val <= 100)) setGrade(val);
              }}
              inputProps={{ min: 0, max: 100 }}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Feedback"
              multiline
              rows={6}
              fullWidth
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
              Save Grade
            </Button>
          </Paper>
        </Box>
      </Box>
    );
  };

  export default ViewSubmission;
