import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Link,
  Alert
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Layout from "../common/Layout";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    mobileNumber: "",
  });

  const [error, setError] = useState("");
  const [backendMessage, setBackendMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setBackendMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
   

    if (!/^\d{10}$/.test(form.mobileNumber)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {

      const res = await axios.post("http://localhost:8081/register", form);

  if (res.data && res.data.status) {
    setBackendMessage(res.data.status);
    alert(res.data.status); // Alert from backend message

    if (res.data.status.toLowerCase().includes("success")) {
      setTimeout(() => navigate("/login"), 1500);
    }
  }
} catch (err) {
  let message = "Registration failed. Please try again.";
  
  if (err.response && err.response.data && err.response.data.status) {
    message = err.response.data.status;
  }
  
  setBackendMessage(message);
  alert(message); // Alert from backend message
}

  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "#fff" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Register
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {backendMessage && (
  <Alert
    severity={
      typeof backendMessage === "string" &&
      backendMessage.toLowerCase().includes("success")
        ? "success"
        : "error"
    }
    sx={{ mb: 2 }}
  >
    {backendMessage}
  </Alert>
)}
          <form onSubmit={handleSubmit}>
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              margin="normal"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <TextField
              name="mobileNumber"
              label="Mobile Number"
              type="tel"
              fullWidth
              margin="normal"
              value={form.mobileNumber}
              onChange={handleChange}
              required
            />
            <TextField
              select
              name="role"
              label="Select Role"
              fullWidth
              margin="normal"
              value={form.role}
              onChange={handleChange}
              required
            >

              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="TEACHER">Teacher</MenuItem>
              <MenuItem value="STUDENT">Student</MenuItem>
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Layout>
  );
};

export default Register;
