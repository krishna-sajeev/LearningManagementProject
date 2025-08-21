package com.learningmanagement.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;
import java.util.UUID;

@Entity
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID submissionId;

    @JsonProperty("assignmentId")
    private int assignmentId;

    @JsonProperty("studentId")
    private String studentId;

    @JsonProperty("submissionURL")
    private String submissionURL;

    @JsonProperty("submissionDate")
    private Date submissionDate;

    @JsonProperty("grade")
    private Integer grade;

    @JsonProperty("feedback")
    private String feedback;

    // Getters & Setters
    public UUID getSubmissionId() { return submissionId; }
    public void setSubmissionId(UUID submissionId) { this.submissionId = submissionId; }

    public int getAssignmentId() { return assignmentId; }
    public void setAssignmentId(int assignmentId) { this.assignmentId = assignmentId; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getSubmissionURL() { return submissionURL; }
    public void setSubmissionURL(String submissionURL) { this.submissionURL = submissionURL; }

    public Date getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(Date submissionDate) { this.submissionDate = submissionDate; }

    public Integer getGrade() { return grade; }
    public void setGrade(Integer grade) { this.grade = grade; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    // Constructors
    public Submission() {}
    public Submission(UUID submissionId, int assignmentId, String studentId,
                      String submissionURL, Date submissionDate, Integer grade, String feedback) {
        this.submissionId = submissionId;
        this.assignmentId = assignmentId;
        this.studentId = studentId;
        this.submissionURL = submissionURL;
        this.submissionDate = submissionDate;
        this.grade = grade;
        this.feedback = feedback;
    }
}
