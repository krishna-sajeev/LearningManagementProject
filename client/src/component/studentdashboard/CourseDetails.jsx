import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Box, Typography, Button, Card, CardContent, CardActions, CardMedia,
  Chip, Grid, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import axiosInstance from '../../axiosinteceptor';

// Utility: load Razorpay SDK dynamically
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const CourseDetails = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};
  const [courseData, setCourseData] = useState(course);
  const user = localStorage.getItem("id");

  // Popup state
  const [openDialog, setOpenDialog] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  useEffect(() => {
    if (!courseData) {
      axiosInstance.get(`http://localhost:8081/course/${title}`)
        .then(res => setCourseData(res.data))
        .catch(err => console.error(err));
    }
  }, [courseData, title]);

  if (!courseData) {
    return (
      <Typography variant="h6" sx={{ mt: 5, textAlign: 'center' }}>
        Loading course details...
      </Typography>
    );
  }

  // Step 1: Ask for payment type
  const handleEnrollClick = () => {
    setOpenDialog(true);
  };

  // Step 2: After selecting payment type → start Razorpay
  const handlePaymentProceed = async (type) => {
    setPaymentType(type);
    setOpenDialog(false);

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load. Check your internet.");
      return;
    }

    try {
      // Create order from backend
      const orderRes = await axiosInstance.post("http://localhost:8081/api/payments/create-order", {
        courseId: courseData.courseId
      });
      const orderData = orderRes.data;

      // Razorpay Checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "LMS Platform",
        description: courseData.title,
        order_id: orderData.orderId,
        prefill: {
          name: localStorage.getItem("username") || "Guest User",
          email: localStorage.getItem("email") || "guest@example.com",
          contact: "9999999999",
        },
        
        notes: { courseId: courseData.courseId, status: type },
        
        handler: async (response) => {
          try {
            console.log(type)
            // verify payment with backend
            const verifyRes = await axiosInstance.post(
              "http://localhost:8081/api/payments/verify",
              response
              
            );

            console.log(verifyRes.data)
            if (verifyRes.data.status === "verified") {
              // Save enrollment with paymentId + status
              await axiosInstance.post("http://localhost:8081/enroll", {
                userId: user,
                courseId: courseData.courseId,
                enrollDate: new Date().toISOString().split("T")[0],  // gives "2025-08-23"
                status: type, // FULL / INSTALLMENT
                paymentId: verifyRes.data.paymentId
              });

              alert(`✅ Enrolled with ${type} payment!`);
              navigate("/student/enrolled-course");
            } else {
              alert("❌ Payment verification failed");
            }
          } catch (err) {
            console.error("Error saving enrollment:", err);
            alert("Something went wrong, please try again.");
          }
        },
        theme: { color: "#3399cc" }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Error creating Razorpay order:", err);
      alert("Failed to start payment. Try again.");
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Card sx={{ maxWidth: 1200, margin: 'auto', borderRadius: 4, boxShadow: 6, overflow: 'hidden' }}>
        <Grid container>
          {/* Left - Image */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              sx={{ height: '100%', objectFit: 'cover' }}
              image={courseData.icon}
              alt={courseData.title}
            />
          </Grid>

          {/* Right - Details */}
          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                {courseData.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                {courseData.description}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                <Chip label={`Instructor: ${courseData.instructor}`} color="primary" variant="outlined" />
                <Chip label={`Duration: ${courseData.duration}`} color="secondary" variant="outlined" />
                <Chip label={`Start Date: ${courseData.startdate}`} variant="outlined" />
                <Chip label={`Fee: ₹${courseData.fee}`} color="success" variant="outlined" />
                <Chip
                  label={courseData.status}
                  color={courseData.status?.toLowerCase() === 'active' ? 'success' : 'warning'}
                  variant="outlined"
                />
              </Box>

              <CardActions sx={{ mt: 2 }}>
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
                  }}
                  onClick={handleEnrollClick}
                >
                  Enroll Now
                </Button>
              </CardActions>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {/* 🔥 Payment Type Popup */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Select Payment Option</DialogTitle>
        <DialogContent>
          <Typography>How would you like to pay for this course?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlePaymentProceed("FULL")} variant="contained" color="success">
            Full Payment
          </Button>
          <Button onClick={() => handlePaymentProceed("INSTALLMENT")} variant="outlined" color="primary">
            Installment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseDetails;
