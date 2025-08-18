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

    @JsonProperty("email")
    private String email;


    @JsonProperty("enrollDate")
    private LocalDate enrollDate;

    @JsonProperty("paymentId")
    private UUID paymentId ;

    private STATUS status;

    public enum STATUS{
        ACTIVE,COMPLETED,DROPPED,PENDING
    }

    public Enroll(UUID enrollId, String courseId, String email,int userId, LocalDate enrollDate, UUID paymentId, STATUS status) {
        this.enrollId = enrollId;
        this.courseId = courseId;
        this.userId = userId;
        this.email=email;
        this.enrollDate = enrollDate;
        this.paymentId = paymentId;
        this.status = status;
    }

    public Enroll() {
    }

    public UUID getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(UUID paymentId) {
        this.paymentId = paymentId;
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

    public String getEmail(){return  email;}

    public void  setEmail(String email){this.email=email;}

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
