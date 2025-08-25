import { Box, Button, MenuItem, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Feedback = () => {
  const location = useLocation();
  const title_name = location.state?.title || ""; // <-- get course title

  const [star, setStar] = useState(0);
  const [review, setReview] = useState({
    userId: "",
    reviewType: "",
    comment: "",
    title: "",
    star: 0,
    reviewDate: "",
  });

  const name = localStorage.getItem("userName");

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const feedback = (e) => {
    e.preventDefault();
    const payload = {
      ...review,
      userId: localStorage.getItem("id"),
      title: title_name,
      star: star,
      reviewDate: new Date().toISOString().split("T")[0],
    };
    console.log(payload);

    axios
      .post("http://localhost:8081/feedback", payload)
      .then((res) => {
        alert(res.data.status);
        nav
      })
      .catch((err) => {
        console.error(err);
        alert("Error submitting feedback");
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#929293ff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffffff",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Hi , {name} <br />
          We value your opinion.
        </Typography>
        <Typography sx={{ fontWeight: "bold", mb: 2 }}>
          Enrolled Course : {title_name}
        </Typography>

        <TextField
          select
          label="Review Type"
          name="reviewType"
          value={review.reviewType}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="COURSE">COURSE</MenuItem>
          <MenuItem value="TEACHER">TEACHER</MenuItem>
        </TextField>

        <Typography variant="body2" sx={{ mb: 2 }}>
          How would you rate your overall experience?
        </Typography>

        {/* Star Rating */}
        <div style={{ marginBottom: "15px" }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                color: star >= num ? "gold" : "lightgray",
                marginRight: "5px",
              }}
              onClick={() => setStar(num)}
            >
              ★
            </span>
          ))}
        </div>

        <Typography variant="body2" sx={{ mb: 1 }}>
          Kindly take a moment to tell us what you think.
        </Typography>

        <textarea
          name="comment"
          value={review.comment}
          onChange={handleChange}
          rows="4"
          style={{
            width: "100%",
            borderRadius: "8px",
            padding: "10px",
            border: "1px solid #ccc",
            resize: "none",
            marginBottom: "20px",
          }}
        ></textarea>

        <Button
          onClick={feedback}
          variant="contained"
          sx={{
            backgroundColor: "#2b559f",
            borderRadius: "20px",
            textTransform: "none",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#1f3f73",
            },
          }}
        >
          Share my feedback
        </Button>
      </Paper>
    </Box>
  );
};

export default Feedback;
