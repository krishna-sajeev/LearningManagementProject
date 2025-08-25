import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../../axiosinteceptor';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

const LiveSession = () => {
  const [live, setLive] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  useEffect(() => {
    axiosInstance.get('http://localhost:8081/api/livesessions/live-display')
      .then((res) => {
        const sessionData = Array.isArray(res.data) ? res.data : [res.data];
        setLive(sessionData);
        console.log(sessionData)
       
             
      })
      .catch(console.error);
  }, []);
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Live URL</StyledTableCell>
            <StyledTableCell align="right">Instructor</StyledTableCell>
            <StyledTableCell align="right">Feedback</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {live.map((row) => (
            <StyledTableRow key={row.live_id}>
              <StyledTableCell>{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.liveUrl}</StyledTableCell>
              <StyledTableCell align="right">{row.course.instructor}</StyledTableCell>
              <StyledTableCell align='right'>
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
                onClick={() => navigate('/student/feedback', { state: { title: row.course.title } })}


                >
                  Feedback
                </Button>
            </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LiveSession;
