import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
  Alert,
  Box,
  Divider,
} from "@mui/material";

const ReferenceMaterial = () => {
  const [references, setReferences] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch references
  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/references/display"
      );
      setReferences(response.data);
    } catch (error) {
      console.error("Error fetching references:", error);
      setSnackbar({
        open: true,
        message: "Failed to load references",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar({ ...snackbar, open: false });

  // Group references by subject/course
  const groupedReferences = references.reduce((acc, ref) => {
    const courseTitle = ref.course?.title || "Other";
    if (!acc[courseTitle]) acc[courseTitle] = [];
    acc[courseTitle].push(ref);
    return acc;
  }, {});

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reference Materials
      </Typography>

      {Object.keys(groupedReferences).map((courseTitle, idx) => (
        <Box key={idx} mb={4}>
          {/* Subject Heading with Separator */}
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            {courseTitle}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Cards for each reference */}
          <Box display="flex" flexWrap="wrap">
            {groupedReferences[courseTitle].map((ref) => (
              <Card key={ref.id} sx={{ width: 280, margin: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={ref.imageUrl}
                  alt={ref.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {ref.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <a
                      href={ref.materialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                      }}
                    >
                      Open Material
                    </a>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ))}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReferenceMaterial;
