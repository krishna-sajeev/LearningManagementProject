import React from "react";
import { Box, Typography, Container, Card, CardContent, List, ListItem } from "@mui/material";

const AboutUs = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            About Us
          </Typography>

          {/* Overview */}
          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" paragraph>
            The LMS is a comprehensive online platform designed to facilitate
            effective learning and teaching. It aims to provide a user-friendly
            and engaging environment for students and educators.
          </Typography>

          {/* Mission & Vision */}
          <Typography variant="h6" gutterBottom>
            Our Mission & Vision
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to deliver a seamless and robust educational
            experience that empowers learners and educators. Our vision is to be
            a leading platform in the e-learning industry, driving innovation in
            education.
          </Typography>

          {/* Key Features */}
          <Typography variant="h6" gutterBottom>
            Key Features
          </Typography>
          <List>
            <ListItem>• Course Management</ListItem>
            <ListItem>• Student Progress Tracking</ListItem>
            <ListItem>• Tutor Support</ListItem>
            <ListItem>• Interactive Learning</ListItem>
          </List>

          {/* Contact */}
          <Typography variant="h6" gutterBottom>
            Get In Touch
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> 123 Learning Lane, Education City, ED 45678
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> contact@lms.com
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> +1 (234) 567-8901
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutUs;
