import React from 'react'
import Sidebar from '../common/Sidebar';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Project = () => {

  return (
    <>
    <Sidebar role="student" />
     <div id = "project">
     <h2>Project </h2> 
      <Accordion>
        
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          
          <Typography component="span">Project phase 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Project idea
          </Typography>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          
          <Typography component="span">Project phase 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Scrum meeting
          </Typography>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          
          <Typography component="span">Project phase 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Scrum meeting
          </Typography>
        </AccordionDetails>
        </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          
          <Typography component="span">Project phase 4</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Final Presentation
          </Typography>
        </AccordionDetails>
        </Accordion>
       
    </div>
    </>
  )
}



export default Project;