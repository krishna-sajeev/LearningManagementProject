import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

const AdminProfile = () => {
  // Example static data (you can replace with API data later)
  const profile = {
    name: "Nisha",
    email: "nisha@example.com",
    phone: "123-456-7890",
    location: "New Delhi, India",
    role: "Admin",
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
    >
      <Card sx={{ width: 400, p: 3, borderRadius: 3, boxShadow: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ width: 100, height: 100, bgcolor: "#1976d2", mb: 2 }}>
            {profile.name.charAt(0)}
          </Avatar>
          <Typography variant="h5" gutterBottom>
            {profile.name}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <CardContent>
          <Typography variant="body1">
            <strong>Email:</strong> {profile.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {profile.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Location:</strong> {profile.location}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {profile.role}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminProfile;
