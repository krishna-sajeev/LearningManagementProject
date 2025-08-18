import React, { useEffect, useState } from 'react';
 import { useLocation, useNavigate, useParams } from 'react-router-dom';
 import { Box, Typography, Button, Card, CardContent, CardActions, CardMedia, Chip, Grid, } from '@mui/material';
 import axiosInstance from '../../axiosinteceptor';

const CourseDetails = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};
  const [courseData, setCourseData] = useState(course);
  const user = localStorage.getItem("id");

 

  if (!courseData) {
    return (
      <Typography variant="h6" sx={{ mt: 5, textAlign: 'center' }}>
        Loading course details...
      </Typography>
    );
  }

  const handleEnroll = () => {
    axiosInstance.post("http://localhost:8081/enroll", {
      userId: user,
      courseId: courseData.id
    })
    .then(res => {
      console.log("Enrollment successful:", res.data);
    //  navigate('/payment', { state: { course: courseData } });
    })
    .catch(err => console.error("Enrollment failed:", err));
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Card sx={{ maxWidth: 1200, margin: 'auto', borderRadius: 4, boxShadow: 6, overflow: 'hidden' }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              sx={{
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
                '&:hover': { transform: 'scale(1.05)' },
              }}
              image={courseData.icon}
              alt={courseData.title}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                {courseData.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                {courseData.description}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                <Chip label={`Instructor: ${courseData.instructor}`} color="primary" variant="outlined" />
                <Chip label={`Duration: ${courseData.duration}`} color="secondary" variant="outlined" />
                <Chip label={`Start Date: ${courseData.startdate}`} variant="outlined" />
                <Chip label={`Fee: ₹${courseData.fee}`} color="success" variant="outlined" />
                <Chip label={courseData.status} color={courseData.status?.toLowerCase() === 'active' ? 'success' : 'warning'} variant="outlined" />
              </Box>

              <CardActions sx={{ mt: 2 }}>
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
                  onClick={handleEnroll}
                >
                  Enroll Now
                </Button>
              </CardActions>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
export default CourseDetails;
