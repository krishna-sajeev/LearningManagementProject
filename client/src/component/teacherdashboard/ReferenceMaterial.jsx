import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ReferenceMaterial = () => {
  const [references, setReferences] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

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

  // Delete reference
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/api/references/deleteReference/${id}`
      );

      if (response.data.status === "success") {
        setSnackbar({
          open: true,
          message: "Reference deleted successfully!",
          severity: "success",
        });
        fetchReferences();
      } else {
        setSnackbar({
          open: true,
          message: response.data.message || "Error deleting reference",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting reference:", error);
      setSnackbar({
        open: true,
        message: "Server error while deleting reference",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar({ ...snackbar, open: false });

  return (
    <Box sx={{ padding: 3 }}>
      {/* Title & Add button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Reference Material</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/teacher/addrefernce")}
        >
          Add Material
        </Button>
      </Box>

      {/* Cards */}
      <Box display="flex" flexWrap="wrap">
        {references.map((ref) => (
          <Card key={ref.id} sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image={ref.imageUrl}
              alt={ref.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {ref.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Course:</strong> {ref.course?.title || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <a
                  href={ref.materialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Open Material
                </a>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary">
                 Access to Batch
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(ref.id)}
              >
                Delete Material
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

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
