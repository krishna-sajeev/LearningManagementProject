import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ReferenceMaterial = ({  }) => {
  const [references, setReferences] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      // 1. Get all enrolled courses for the student
      const enrollmentsRes = await axios.get(
        `http://localhost:8081/api/enrollments/${userId}`
      );

      const enrollments = enrollmentsRes.data;

      // 2. For each courseId, fetch reference materials
      const allRefs = [];
      for (const enrollment of enrollments) {
        const courseId = enrollment.courseId;

        const refRes = await axios.get(
          `http://localhost:8081/api/references/course/${courseId}`
        );

        // Append courseId & courseName for clarity
        const refsWithCourse = refRes.data.map((ref) => ({
          ...ref,
          courseTitle: enrollment.courseTitle || `Course ${courseId}`,
        }));

        allRefs.push(...refsWithCourse);
      }

      setReferences(allRefs);
    } catch (error) {
      console.error("Error fetching references:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reference Materials
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Preview</TableCell>
              <TableCell>Material</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {references.map((ref) => (
              <TableRow key={ref.id}>
                <TableCell>{ref.courseTitle}</TableCell>
                <TableCell>{ref.title}</TableCell>
                <TableCell>
                  {ref.imageUrl ? (
                    <img
                      src={ref.imageUrl}
                      alt={ref.title}
                      style={{ width: "80px", borderRadius: "6px" }}
                    />
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <a
                    href={ref.materialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Material
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ReferenceMaterial;
