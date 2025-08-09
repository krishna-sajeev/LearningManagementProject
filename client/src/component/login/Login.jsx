import React, { useState } from "react";
import { data, Link as RouterLink, useNavigate } from "react-router-dom";
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
import axios from "axios";

const Login = () => {
   let navigate=useNavigate();
const [user, setUser] = useState({
    email: " ",
    password: " ",
    role: " ",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send login data to backend
    console.log("Login submitted:", user);

  };

  let validateUser = () => {
  console.log(user);
  axios.post("http://localhost:8080/login", user)
    .then((res) => {
      console.log(res.data);
      if (res.data.token) {
        console.log(`/${user.role}/${user.role.toLowerCase()}-dashboard`)
        alert("Login successful");

        //  Store token and role in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", user.role); //  Save selected role
        localStorage.setItem("id",res.data.user.id)
        localStorage.setItem("userName", res.data.user.fullName); // Optional
        
        
        navigate(`/${user.role.toLowerCase()}/${user.role.toLowerCase()}-dashboard`);

      } else {
        alert("Login failed");
        setUser({ email: "", password: "", role: "" });
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      alert("Login failed due to bad credentials or server error");
    });
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
          
          onSubmit={handleSubmit}
          sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label=" Role"
            name="role"
            value={user.role}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="TUTOR">TUTOR</MenuItem>
            <MenuItem value="STUDENT">STUDENT</MenuItem>
          </TextField>

          <Button sx={{ mt: 1 /* margin top */ }} onClick={validateUser}>Log in</Button>

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
