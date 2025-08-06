import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import Layout from "../common/Layout";
const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Email, 2: OTP + Password
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    setError("");
    try {
      // Send OTP API call
      const res = await axios.post("", {
        email: form.email,
      });
      setSuccess("OTP sent to your email");
      setStep(2);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    setError("");
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      // Reset Password API call
      await axios.post("", {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword,
      });
      setSuccess("Password reset successfully. Please login.");
      setStep(1);
      setForm({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError("Invalid OTP or error resetting password.");
    }
  };

  return (
    <Layout>
    <Box
      sx={{
        width: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>

      {step === 1 ? (
        <>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />
          <Button variant="contained" fullWidth onClick={handleSendOtp}>
            Send OTP
          </Button>
        </>
      ) : (
        <>
          <TextField
            label="OTP"
            name="otp"
            fullWidth
            margin="normal"
            value={form.otp}
            onChange={handleChange}
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            fullWidth
            margin="normal"
            value={form.newPassword}
            onChange={handleChange}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <Button variant="contained" fullWidth onClick={handleResetPassword}>
            Reset Password
          </Button>
        </>
      )}

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" mt={2}>
          {success}
        </Typography>
      )}
    </Box>
    </Layout>
  );
};

export default ForgotPassword;
