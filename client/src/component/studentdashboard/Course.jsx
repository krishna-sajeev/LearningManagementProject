import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Button
} from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import axiosInstance from '../../axiosinteceptor';

const Course = () => {
    let token=localStorage.getItem('token');
  const[courses,setCourses]=useState([]);
   useEffect(()=>{
    axiosInstance.get('http://localhost:8080/display')
    .then((res)=>{
      console.log(res)
        setCourses(res.data)
    })
    .catch((err)=>{
          console.log(err);
          
    })
  },[]);
  return (
    <>
    <Box sx={{ textAlign: 'center', mt: 5, mb: 2 }}>
  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
    Available Courses
  </Typography>
  <Box
    sx={{
      width: 120,
      height: 4,
      backgroundColor: '#3498db',
      margin: '8px auto 0',
      borderRadius: 2,
    }}
  />
</Box>
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', mt: 4 }}
      >
        
{courses.map((course) => (
         <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="course">
           ICT
          </Avatar>
        }
       
        title={course.title}
        subheader={course.startdate}
      />
      <CardMedia
        component="img"
        height="194"
        image={course.icon}
        alt="Course Banner"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {course.description}
        </Typography>
      </CardContent>
      <Box sx={{ mt: 4 , marginBottom:5,marginLeft:5}}>
          <Button variant="contained" size="large">
            Explore More
          </Button>
        </Box>
        
    </Card>
    
   ))}
        
      </Box>
    </>
  );
};

export default Course