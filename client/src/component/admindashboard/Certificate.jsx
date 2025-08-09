import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

const Certificate = () => {
  const [formData, setFormData] = useState({
   studentName: "",
  courseName: "",
  duration: "",
  startDate: "",
  endDate: ""
  });

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Send data to backend and download PDF
  const handleDownload = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/certificates",formData
      );
        const certId = response.data.id;

        const downloadResponse = await axios.get( `http://localhost:8080/certificates/certificate/download/${certId}`,
          { responseType: "blob" }
    );
    

     const blob = new Blob([downloadResponse.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${formData.studentName}_certificate.pdf`;
    link.click();
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Certificate Generator
        </Typography>

        <TextField
          label="Name"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Course"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleDownload}>
            Download Certificate
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Certificate;
