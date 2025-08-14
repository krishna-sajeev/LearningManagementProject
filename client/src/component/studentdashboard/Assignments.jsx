import React, { useEffect, useState } from 'react';
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axiosInstance from '../../axiosinteceptor';

const Assignments = () => {
  let token=localStorage.getItem('token');
    const[courses,setCourses]=useState([]);
     useEffect(()=>{
      axiosInstance.get('http://localhost:8081/display')
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
    <Sidebar role="student" />
     <div id = "assignment">
     <h2>Assignment and Casestudy </h2> 
     {courses.map((course) => (
      <Accordion>
        
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          
          <Typography component="span">Assignment {course.id}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {course.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      
         ))}
    </div>
    </>
  )
}

export default Assignments