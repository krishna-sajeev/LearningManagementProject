import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Avatar, Divider, Accordion, AccordionDetails, AccordionSummary, 
  List, ListItem, ListItemText, LinearProgress, Paper, Grid 
} from '@mui/material';
import axiosInstance from '../../axiosinteceptor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Layout from '../common/Layout';

const MyProfile = () => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`http://localhost:8081/my-profile/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [id, token]);

  if (loading) {
    return <Typography>Loading profile...</Typography>;
  }

  return (
    <Layout role = {role} >
    <Box sx={{ p: 4, maxWidth: '900px', margin: 'auto' }}>
      
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
          {user.fullName?.charAt(0) || "U"}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight="bold">{user?.fullName || "Unknown User"}</Typography>
          <Typography variant="body1" color="text.secondary">{user?.email || "N/A"}</Typography>
          
        </Box>
      </Box>

      

      {/* Contact Details */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="contact-details" id="contact-header">
          <Typography component="span">Contact Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Mobile Number: {user?.mobileNumber || "N/A"}</Typography>
          <Typography>Email: {user?.email || "N/A"}</Typography>
           <Typography>Role: {user?.role || "N/A"}</Typography>
        </AccordionDetails>
      </Accordion>

      {/* Enrolled Courses */}
      {user.enrolledCourses?.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>Enrolled Courses</Typography>
          <List>
            {user.enrolledCourses.map((course, idx) => (
              <ListItem key={idx}>
                <Box sx={{ width: '100%' }}>
                  <ListItemText 
                    primary={course.title} 
                    secondary={`Progress: ${course.progress || 0}%`} 
                  />
                  <LinearProgress 
                    variant="determinate" 
                    value={course.progress || 0} 
                    sx={{ height: 8, borderRadius: 5 }} 
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

     
    </Box>
    </Layout>
  );
};

export default MyProfile;
