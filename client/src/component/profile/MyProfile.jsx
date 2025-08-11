import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar, Divider, List, ListItem, ListItemText, LinearProgress } from '@mui/material';
import axiosInstance from '../../axiosinteceptor';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const MyProfile = () => {
     let token=localStorage.getItem('token');
     let id = localStorage.getItem("id");
    const[user,setUser]=useState([]);
     useEffect(()=>{
      axiosInstance.get(`http://localhost:8080/my-profile/${id}`)
      .then((res)=>{
        console.log(res)
          setUser(res.data)
      })
      .catch((err)=>{
            console.log(err);
            
      })
    },[]);
  return (
    <>
        <Box sx={{ p: 4, maxWidth: '800px', margin: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
          {user.fullName?.charAt(0) || "U"}
        </Avatar>

        <Box>
          <Typography variant="h5" fontWeight="bold">{user.fullName}</Typography>
          <Typography variant="body1" color="text.secondary">{user.email}</Typography>
         
        </Box>
        
      </Box>
 <Accordion>
        
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          
          <Typography component="span">Contact Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Project idea
          </Typography>
        </AccordionDetails>
        </Accordion>
      <Divider sx={{ mb: 2 }} />
      {/* <Typography variant="h6" gutterBottom>Enrolled Courses</Typography>
      <List>
        {user.enrolledCourses.map((course, idx) => (
          <ListItem key={idx}>
            <Box sx={{ width: '100%' }}>
              <ListItemText primary={course.title} />
              <LinearProgress variant="determinate" value={course.progress} sx={{ height: 8, borderRadius: 5 }} />
            </Box>
          </ListItem>
        ))}
      </List> */}
    </Box>
    </>
  )
}

export default MyProfile