import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button
} from "@mui/material";

const ViewPayments = () => {
  // Sample data
  const students = [
    // { id: 1, name: "John Doe", email: "john@example.com", mobile: "9876543210", course: "Java Full Stack", paymentType: "Monthly", status: "Paid" },
     { id: 2, name: "Priya Sharma", email: "nishakrishna1995@gmail.com", mobile: "9876543222", course: "React & Spring Boot", paymentType: "Quarterly", status: "Pending" },
    // { id: 3, name: "Amit Kumar", email: "amit@example.com", mobile: "9876543233", course: "Python Django", paymentType: "One-Time", status: "Pending" },
  ];

 
const sendReminder = async (studentEmail) => {
  try {
    const response = await fetch('http://localhost:8080/email/sendReminder', { //not wrkng
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: studentEmail }),
    });

    if (response.ok) {
      alert(`Reminder email sent to ${studentEmail}`);
    } else {
      alert('Failed to send reminder email');
    }
  } catch (error) {
    alert('Error sending reminder email');
    console.error(error);
  }
};

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Mobile</b></TableCell>
            <TableCell><b>Course</b></TableCell>
            <TableCell><b>Payment Type</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Action</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (    //now only user table
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.mobile}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell>{student.paymentType}</TableCell>
              <TableCell
                sx={{
                  color: student.status === "Pending" ? "red" : "green",
                  fontWeight: "bold"
                }}
              >
                {student.status}
              </TableCell>
              <TableCell>
                {student.status === "Pending" && (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => sendReminder(student.email)}
                  >
                    Send Reminder
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewPayments;
