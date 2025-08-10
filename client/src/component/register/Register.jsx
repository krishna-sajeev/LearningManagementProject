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
    mobile: "",
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
    if (!/^\d{10}$/.test(form.mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/signup", form);

      if (res.data.status) {
        setBackendMessage(res.data.status);
        if (res.data.status.toLowerCase().includes("success")) {
          setTimeout(() => navigate("/login"), 1500);
        }
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.status) {
        setBackendMessage(err.response.data.status);
      } else {
        setBackendMessage("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
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
            <Alert severity={backendMessage.toLowerCase().includes("success") ? "success" : "error"} sx={{ mb: 2 }}>
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
              name="mobile"
              label="Mobile Number"
              type="tel"
              fullWidth
              margin="normal"
              value={form.mobile}
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
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="tutor">Tutor</MenuItem>
              <MenuItem value="student">Student</MenuItem>
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
