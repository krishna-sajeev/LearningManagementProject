import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Alert,
  Link,
} from "@mui/material";
import axios from "axios";

const RecordedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/recordedvideos/display");
        setVideos(res.data);
      } catch (err) {
        setError("Failed to load recorded videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Recorded Video Library
      </Typography>

      <Grid container spacing={3}>
        {videos.length === 0 ? (
          <Typography variant="h6" sx={{ mt: 3, mx: "auto" }}>
            No recorded videos available.
          </Typography>
        ) : (
          videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                {/* Video Preview */}
                <CardMedia
                  component="iframe"
                  height="400"
                  src={
                    video.url.startsWith("http")
                      ? video.url
                      : `https://${video.url}`
                  }
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Course: {video.course?.title || "N/A"}
                  </Typography>

                  {/* Open in New Tab */}
                  <Link
                    href={
                      video.url.startsWith("http")
                        ? video.url
                        : `https://${video.url}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ display: "block", mt: 1, fontWeight: "bold" }}
                  >
                    🔗 Open in New Tab
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default RecordedVideos;
