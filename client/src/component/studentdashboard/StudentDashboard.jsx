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
import Course from './Course';




// Main Student Dashboard Component
const StudentDashboard = () => {
  

  return (
    <>
      <Sidebar role="student" />
    
        <Typography variant="h5" gutterBottom align="center">
    Welcome Student
  </Typography>
 <Course/>
</>
  )
}
export default StudentDashboard;
