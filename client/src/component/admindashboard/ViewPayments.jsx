import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button
} from "@mui/material";

const ViewPayments = () => {
  const [students, setStudents] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:8081/enrollments")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching enrollments:", err));
  }, []);

  // Send email reminder
  const sendReminder = async (studentEmail) => {
    try {
      const response = await fetch("http://localhost:8081/email/sendReminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: studentEmail }),
      });

      if (response.ok) {
        alert(`Reminder email sent to ${studentEmail}`);
      } else {
        alert("Failed to send reminder email");
      }
    } catch (error) {
      alert("Error sending reminder email");
      console.error(error);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>UserId</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>CourseId</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Action</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((enroll) => (
            <TableRow key={enroll.enrollId}>
              <TableCell>{enroll.userId}</TableCell>
              <TableCell>{enroll.email}</TableCell>
              <TableCell>{enroll.courseId}</TableCell>
              <TableCell
                sx={{
                  color: enroll.status === "PENDING" ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {enroll.status}
              </TableCell>
              <TableCell>
                {enroll.status === "PENDING" && (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => sendReminder(enroll.email)}
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
