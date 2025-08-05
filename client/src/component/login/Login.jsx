import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Layout from "../common/Layout";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Link,
} from "@mui/material";

const Login = () => {
const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send login data to backend
    console.log("Login submitted:", form);

  };

  return (
    <Layout>
      
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, mt: 10, borderRadius: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome 
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Please login to your account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label=" Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="tutor">Tutor</MenuItem>
            <MenuItem value="student">Student</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" color="primary" size="large">
           <Link href="/admin-dashboard"> Login</Link>
          </Button>

          <Box display="flex" justifyContent="space-between" mt={1}>
       {/* <Link component={RouterLink} to="/forgot-password" variant="body2">
  Forgot Password?
</Link> */}
<Link href="/forgot-password" variant="body2">
  Forgot Password?
</Link>
<Link href="/register" variant="body2">
              Don’t have an account? Register
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
    </Layout>
      
  );
};

export default Login;
