import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions
} from "@mui/material";
import axiosInstance from "../../axiosinteceptor";

// Load Razorpay SDK dynamically
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const CourseDetail = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};
  const [courseData, setCourseData] = useState(course);
  const user = localStorage.getItem("id");

  // Popup state
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  useEffect(() => {
    if (!courseData) {
      axiosInstance
        .get(`http://localhost:8081/course/${title}`)
        .then((res) => setCourseData(res.data))
        .catch((err) => console.error(err));
    }
  }, [courseData, title]);

  if (!courseData) {
    return (
      <Typography variant="h6" sx={{ mt: 5, textAlign: "center" }}>
        Loading course details...
      </Typography>
    );
  }

  // Click Enroll Now
  const handleEnrollClick = () => {
    setOpenPaymentDialog(true);
  };

  // Payment type selected
  const handlePaymentType = (type) => {
    setPaymentType(type);
    setOpenPaymentDialog(false);

    const amount = type === "FULL" ? courseData.fee : Math.floor(courseData.fee / 2);
    startPayment(amount, type);
  };

  // Start Razorpay payment
  const startPayment = async (amount, type) => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load. Check your internet.");
      return;
    }

    try {
      const orderRes = await axiosInstance.post(
        "http://localhost:8081/api/payments/create-order",
        { courseId: courseData.courseId, amount }
      );
      const orderData = orderRes.data;

      const options = {
        key: orderData.key,
        amount : type === "FULL" ? courseData.fee : Math.floor(courseData.fee / 2),
        currency: orderData.currency,
        name: "LMS Platform",
        description: `${courseData.title} - ${type === "FULL" ? "Full Payment" : "50% Installment"} (₹${amount})`,
        order_id: orderData.orderId,
        prefill: {
          name: localStorage.getItem("username") || "Guest User",
          email: localStorage.getItem("email") || "guest@example.com",
          contact: "9999999999",
        },
        notes: { courseId: courseData.courseId, status: type, paidAmount: amount },
        handler: async (response) => {
          try {
            const verifyRes = await axiosInstance.post(
              "http://localhost:8081/api/payments/verify",
              response
            );
            if (verifyRes.data.status === "verified") {
              await axiosInstance.post("http://localhost:8081/enroll", {
                userId: user,
                courseId: courseData.courseId,
                enrollDate: new Date().toISOString().split("T")[0],
                status: type,
                paidAmount: amount,
                paymentId: verifyRes.data.paymentId,
              });
              alert(`✅ Enrolled with ${type} payment of ₹${amount}!`);
              navigate("/student/enrolled-course");
            } else {
              alert("❌ Payment verification failed");
            }
          } catch (err) {
            console.error("Error saving enrollment:", err);
            alert("Something went wrong.");
          }
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Error creating Razorpay order:", err);
      alert("Failed to start payment.");
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Card sx={{ maxWidth: 1200, margin: "auto", borderRadius: 4, boxShadow: 6, overflow: "hidden" }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              sx={{ height: "100%", objectFit: "cover" }}
              image={courseData.icon}
              alt={courseData.title}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                {courseData.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
                {courseData.description}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                <Chip label={`Instructor: ${courseData.instructor}`} color="primary" variant="outlined" />
                <Chip label={`Duration: ${courseData.duration}`} color="secondary" variant="outlined" />
                <Chip label={`Start Date: ${courseData.startdate}`} variant="outlined" />
                <Chip label={`Fee: ₹${courseData.fee}`} color="success" variant="outlined" />
                <Chip
                  label={courseData.status}
                  color={courseData.status?.toLowerCase() === "active" ? "success" : "warning"}
                  variant="outlined"
                />
              </Box>

              <Button
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(45deg, #2196f3, #21cbf3)",
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: 2,
                }}
                onClick={handleEnrollClick}
              >
                Enroll Now
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {/* Payment Type Dialog */}
      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)}>
        <DialogTitle>Select Payment Type</DialogTitle>
        <DialogActions>
          <Button onClick={() => handlePaymentType("FULL")} variant="contained" color="success">
            Full Payment
          </Button>
          <Button onClick={() => handlePaymentType("INSTALLMENT")} variant="outlined" color="primary">
            Installment (50% Now)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseDetail;
