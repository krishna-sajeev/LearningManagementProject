// src/pages/ViewSubmission.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

const submissionsData = [
  {
    id: 1,
    studentName: 'John Smith',
    assignmentTitle: 'Math Homework',
    submittedAt: '2025-08-09 14:30',
    fileUrl: '/files/math_homework_john.pdf',
    grade: 85,
    feedback: 'Good work, but revise question 3.',
  },
  {
    id: 2,
    studentName: 'Jane Doe',
    assignmentTitle: 'Math Homework',
    submittedAt: '2025-08-09 15:00',
    fileUrl: '/files/math_homework_jane.pdf',
    grade: 90,
    feedback: 'Excellent job!',
  },
];

const ViewSubmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const [submission, setSubmission] = useState(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const found = submissionsData.find((s) => s.id === numericId);
    if (found) {
      setSubmission(found);
      setGrade(found.grade ?? '');
      setFeedback(found.feedback ?? '');
    } else {
      setSubmission(null);
    }
  }, [numericId]);

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

  const currentIndex = submissionsData.findIndex((s) => s.id === numericId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === submissionsData.length - 1;

  const handlePrev = () => {
    if (!isFirst) {
      navigate(`/view-submission/${submissionsData[currentIndex - 1].id}`);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      navigate(`/view-submission/${submissionsData[currentIndex + 1].id}`);
    }
  };

  const handleDownload = () => {
    // simple open in new tab; for real download add server headers or create an <a download>
    window.open(submission.fileUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSave = () => {
    // simulate API save
    console.log('Saving grade/feedback for', submission.id, { grade, feedback });

    // update local submission state so UI reflects saved values
    setSubmission((prev) => ({ ...prev, grade, feedback }));

    // in real app: call API & handle success / error
    alert('Saved ');
  };

  return (
    <Box p={2}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          Grading: {submission.studentName} - {submission.assignmentTitle}
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
        Submitted on: {submission.submittedAt}
      </Typography>

      {/* Main area: file + grading */}
      <Box display="flex" gap={2} flexWrap="wrap">
        {/* File preview / download */}
        <Paper sx={{ p: 2, flex: 2, minWidth: 300 }}>
          <Typography variant="subtitle1" gutterBottom>
            Submitted File
          </Typography>

          {/* If you want inline preview for PDFs/images you can embed here.
              For now we show file name + download button */}
          <Typography variant="body2">{submission.fileUrl.split('/').pop()}</Typography>

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleDownload}>
              Download File
            </Button>
          </Box>
        </Paper>

        {/* Grading box */}
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
              // clamp between 0 and 100
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
