package com.learningmanagement.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID attendanceId;

    @JsonProperty("courseId")
    private String courseId;

    @JsonProperty("studentName")
    private String studentName;

    @JsonProperty("studentId")
    private int studentId;

    @JsonProperty("email")
    private String email;

    @JsonProperty("date")
    private LocalDate date;

    @JsonProperty("present")
    private boolean present;

    public Attendance() {}

    public Attendance(String courseId, int studentId, String studentName, String email, LocalDate date, boolean present) {
        this.courseId = courseId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.email = email;
        this.date = date;
        this.present = present;
    }

    // Getters & Setters
    public UUID getAttendanceId() { return attendanceId; }
    public void setAttendanceId(UUID attendanceId) { this.attendanceId = attendanceId; }

    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }

    public int getStudentId() { return studentId; }
    public void setStudentId(int studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public boolean isPresent() { return present; }
    public void setPresent(boolean present) { this.present = present; }
}
