import React from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

const dummyPayments = [
  { id: 1, student: "John Doe", course: "React JS", amount: "₹5000", status: "Paid" },
  { id: 2, student: "Jane Smith", course: "Java", amount: "₹4500", status: "Pending" },
  { id: 3, student: "Rahul Kumar", course: "Python", amount: "₹6000", status: "Paid" },
];

const ViewPayments = () => {
  return (
    <Box display="flex">
      <Sidebar role="admin" />
      <Box flexGrow={1}>
        <Header title="View Payment Status" />
        <Box p={3}>
          <Typography variant="h5" gutterBottom>
            Payment Details
          </Typography>
<Paper elevation={3} sx={{ p: 34, mt: 2 }}>
        
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.student}</TableCell>
                    <TableCell>{payment.course}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewPayments;
