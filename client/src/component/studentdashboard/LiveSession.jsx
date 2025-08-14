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

const LiveSession = () => {
  const [live, setLive] = useState([]);
  const [user, setUser] = useState([]);

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
    axiosInstance.get('http://localhost:8080/live-session')
      .then((res) => {
        const sessionData = Array.isArray(res.data) ? res.data : [res.data];
        setLive(sessionData);

        if (res.data.instructorId) {
          axiosInstance.get(`http://localhost:8080/users/${res.data.instructorId}`)
            .then((result) => setUser(result.data))
            
            .catch(console.error);
            
        }
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
          </TableRow>
        </TableHead>
        <TableBody>
          {live.map((row) => (
            <StyledTableRow key={row.live_id}>
              <StyledTableCell>{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.liveURL}</StyledTableCell>
              <StyledTableCell align="right">{user.fullName}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LiveSession;
