import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Link
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Layout from "../common/Layout";
const Register = () => {
  const [form, setForm] = useState({
    fullName:"",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    mobile:"",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
     if (!/^\d{10}$/.test(form.mobile)) {
    setError("Enter a valid 10-digit mobile number.");
    return;
  }
  console.log("Form submitted:", form);
  };

  return (
    <Layout>
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "#fff" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>


          <TextField
  name="fullName"
  label="Full Name"
  type="name"
  fullWidth
  margin="normal"
  value={form.fullName}
  onChange={handleChange}
  required
/>
          <TextField
            name="email"
            label="Email"
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
            error={Boolean(error)}
            helperText={error}
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

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Register
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
