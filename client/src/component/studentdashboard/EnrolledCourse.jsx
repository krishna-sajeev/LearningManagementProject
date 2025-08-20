import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, CardActions, Typography, Button, Grid, Chip } from "@mui/material";
import jsPDF from "jspdf";

const EnrollmentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { course, paymentDetails } = location.state || {};

  if (!course || !paymentDetails) {
    return (
      <Typography variant="h6" sx={{ mt: 5, textAlign: "center" }}>
        No enrollment data found.
      </Typography>
    );
  }

  const downloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Payment Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Course: ${course.title}`, 20, 40);
    doc.text(`Instructor: ${course.instructor}`, 20, 50);
    doc.text(`Duration: ${course.duration}`, 20, 60);
    doc.text(`Start Date: ${course.startdate}`, 20, 70);

    doc.text(`\nPayment Details:`, 20, 90);
    doc.text(`Order ID: ${paymentDetails.orderId}`, 20, 100);
    doc.text(`Payment ID: ${paymentDetails.paymentId}`, 20, 110);
    doc.text(`Amount Paid: ₹${paymentDetails.amount / 100}`, 20, 120);
    doc.text(`Payment Status: ${paymentDetails.status}`, 20, 130);

    doc.save(`Receipt_${course.title}_${paymentDetails.paymentId}.pdf`);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Card sx={{ maxWidth: 800, margin: "auto", borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            🎉 Enrollment Successful!
          </Typography>

          <Typography variant="h6" sx={{ mb: 3 }}>
            You have successfully enrolled in:
          </Typography>

          <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
            {course.title}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            <Chip label={`Instructor: ${course.instructor}`} color="primary" variant="outlined" />
            <Chip label={`Duration: ${course.duration}`} color="secondary" variant="outlined" />
            <Chip label={`Start Date: ${course.startdate}`} variant="outlined" />
            <Chip label={`Fee Paid: ₹${course.fee}`} color="success" variant="outlined" />
          </Box>

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            💳 Payment Receipt
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Order ID:</strong> {paymentDetails.orderId}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Payment ID:</strong> {paymentDetails.paymentId}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Amount Paid:</strong> ₹{paymentDetails.amount / 100}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Payment Status:</strong> {paymentDetails.status}</Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", p: 3 }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/")}>
            Go to My Courses
          </Button>
          <Button variant="outlined" color="secondary" onClick={downloadReceipt}>
            Download Receipt PDF
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default EnrollmentSuccess;
