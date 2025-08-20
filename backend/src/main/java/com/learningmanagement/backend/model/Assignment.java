package com.learningmanagement.backend.model;

import jakarta.persistence.Entity;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("assignmentId")
    private int assignment_id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("details")
    private String details;

    @JsonProperty("dueDate")
    private Date dueDate;

    @JsonProperty("status")
    @Column(nullable = false)
    private String status = "Active"; // Default when creating

    public Assignment() {
        this.status = "Active"; // Ensure default if constructor is used
    }

    public Assignment(int assignment_id, String title, String details, Date dueDate, String status) {
        this.assignment_id = assignment_id;
        this.title = title;
        this.details = details;
        this.dueDate = dueDate;
        this.status = status != null ? status : "Active"; // Default if null
    }

    public int getAssignment_id() {
        return assignment_id;
    }

    public void setAssignment_id(int assignment_id) {
        this.assignment_id = assignment_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
