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
    private UUID payementId ;

    private STATUS status;

    public enum STATUS{
        ACTIVE,COMPLETED,DROPPED
    }

    public Enroll(UUID enrollId, String courseId, int userId, LocalDate enrollDate, UUID payementId, STATUS status) {
        this.enrollId = enrollId;
        this.courseId = courseId;
        this.userId = userId;
        this.enrollDate = enrollDate;
        this.payementId = payementId;
        this.status = status;
    }

    public Enroll() {
    }

    public UUID getPayementId() {
        return payementId;
    }

    public void setPayementId(UUID payementId) {
        this.payementId = payementId;
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

    public STATUS getStatus() {
        return status;
    }

    public void setStatus(STATUS status) {
        this.status = status;
    }
}
