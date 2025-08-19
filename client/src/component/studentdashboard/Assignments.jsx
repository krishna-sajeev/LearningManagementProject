import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axiosInstance from "../../axiosinteceptor";
import { Box, Button, TextField } from "@mui/material";

const Assignments = () => {
  const [courses, setCourses] = useState([]);
  const userid = localStorage.getItem("id");
  const [url, setURL] = useState("");

  useEffect(() => {
    axiosInstance
      .get("http://localhost:8081/viewAssignments")
      .then((res) => {
        console.log(res);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setURL(e.target.value);
  };

  const handleSubmit = (id) => {
    axiosInstance
      .post("http://localhost:8081/submit", {
        studentId: userid,
        assignmentId: id,
        submissionDate: new Date().toISOString(),
        submissionUrl: url, // ✅ send actual string, not object
      })
      .then((res) => {
        console.log("Submission successful:", res.data);
        alert(res.data.status);
        setURL(""); // clear after submission
      })
      .catch((err) => console.error("Submission failed:", err));
  };

  return (
    <>
      <Sidebar role="student" />
      <div id="assignment">
        <h2>Assignment and Casestudy</h2>
        {courses.map((course) => (
          <Accordion key={course.assignmentId}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <Typography component="span">
                Assignment {course.assignmentId}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{course.details}</Typography>
              <div>
                <Typography>
                  <i>
                    Due date : <b>{course.dueDate}</b>
                  </i>{" "}
                  <br />
                  Upload the file in GitHub or Google Drive and paste URL here
                </Typography>
              </div>

            
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(course.assignmentId);
                }}
                sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  label="URL"
                  variant="outlined"
                  fullWidth
                  name="submissionUrl"
                  value={url}
                  onChange={handleChange}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    background: "linear-gradient(45deg, #2196f3, #21cbf3)",
                    color: "#fff",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    borderRadius: 2,
                    "&:hover": {
                      background: "linear-gradient(45deg, #1976d2, #00bcd4)",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Submit Now
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default Assignments;
