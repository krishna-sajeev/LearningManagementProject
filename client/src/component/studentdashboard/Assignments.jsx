import React, { useEffect, useState } from 'react';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axiosInstance from '../../axiosinteceptor';
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';

const Assignments = () => {
  const [courses, setCourses] = useState([]);
  const [submissionUrls, setSubmissionUrls] = useState({});
    const user = localStorage.getItem("id");

  // Use a map to handle the URL state for each individual assignment
  const handleUrlChange = (assignmentId, event) => {
    setSubmissionUrls({
      ...submissionUrls,
      [assignmentId]: event.target.value,
    });
  };

  useEffect(() => {
    axiosInstance.get('http://localhost:8081/viewAssignments')
      .then((res) => {
        console.log(res);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (id) => {
    axiosInstance.post("http://localhost:8081/submit", {
      studentId: user,
      assignmentId: id,
      submissionDate: new Date().toISOString(),
       submissionUrl : submissionUrls[id]
    })
    .then(res => {
      console.log("Enrollment successful:", res.data);
    //  navigate('/payment', { state: { course: courseData } });
    })
    .catch(err => console.error("Enrollment failed:", err));
  };


  return (
    <>
      <Sidebar role="student" />
      <div id="assignment">
        <h2>Assignment and Casestudy</h2>
        {courses.map((course) => (
          // 1. Add a unique 'key' prop to the top-level element in the map
          <Accordion key={course.assignmentId}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              // 2. Make aria-controls and id unique for accessibility
              aria-controls={`panel-${course.assignmentId}-content`}
              id={`panel-${course.assignmentId}-header`}
            >
              <Typography component="span">
                Assignment {course.assignmentId}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* This Typography is fine as it's a sibling to the div below */}
              <Typography>
                {course.details}
              </Typography>
              
              {/* 3. Wrap related content in a div to prevent invalid nesting */}
              <div>
                <Typography>
                  <i>Due date : <b>{course.dueDate}</b></i> <br />
                  Upload the file in github or Google drive and add URL here
                </Typography>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                  <InputLabel htmlFor={`url-input-${course.assignmentId}`}>URL</InputLabel>
                  <OutlinedInput
                      id={`url-input-${course.assignmentId}`}
                      value={submissionUrls[course.assignmentId] || ''} 
                      onChange={(e) => handleUrlChange(course.assignmentId, e)}
                      label="URL"
                    />
                </FormControl>
              </div>
             <Button
                               variant="contained"
                               size="large"
                               sx={{
                                 background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                                 color: '#fff',
                                 px: 4,
                                 py: 1.5,
                                 fontSize: '1.1rem',
                                 fontWeight: 'bold',
                                 borderRadius: 2,
                                 '&:hover': {
                                   background: 'linear-gradient(45deg, #1976d2, #00bcd4)',
                                   transform: 'scale(1.05)',
                                 },
                                 transition: 'all 0.3s ease',
                               }}
                              onClick={handleSubmit(course.assignmentId,)}
                             >
                               Submit Now
                             </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default Assignments;