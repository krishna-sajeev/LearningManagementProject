package com.learningmanagement.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.util.UUID;

@Entity
public class Enroll {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonProperty("enrollId")
    private UUID enrollId;

    @JsonProperty("courseId")
    private String courseId;

    @JsonProperty("userId")
    private int userId;

    @JsonProperty("enrollDate")
    private LocalDate enrollDate;

    @JsonProperty("payementId")
    private UUID payementId;

    @JsonProperty("email")
    private String email;

    @JsonProperty("contactNumber")
    private String contactNumber;

    @JsonProperty("studentName")
    private String studentName;

    private STATUS status;

    public enum STATUS {
        ACTIVE, COMPLETED, DROPPED
    }

    public Enroll(UUID enrollId, String courseId, int userId, LocalDate enrollDate, UUID payementId,
                  String email, String contactNumber, STATUS status) {
        this.enrollId = enrollId;
        this.courseId = courseId;
        this.userId = userId;
        this.enrollDate = enrollDate;
        this.payementId = payementId;
        this.email = email;
        this.contactNumber = contactNumber;
        this.status = status;
    }

    public Enroll() {
    }

    public UUID getEnrollId() {
        return enrollId;
    }

    public void setEnrollId(UUID enrollId) {
        this.enrollId = enrollId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public LocalDate getEnrollDate() {
        return enrollDate;
    }

    public void setEnrollDate(LocalDate enrollDate) {
        this.enrollDate = enrollDate;
    }

    public UUID getPayementId() {
        return payementId;
    }

    public void setPayementId(UUID payementId) {
        this.payementId = payementId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public STATUS getStatus() {
        return status;
    }

    public void setStatus(STATUS status) {
        this.status = status;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
}
