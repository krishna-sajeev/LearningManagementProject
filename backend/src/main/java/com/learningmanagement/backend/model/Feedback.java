package com.learningmanagement.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.util.UUID;

@Entity
public class Feedback {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Hibernate 6+ supports this directly
    @JsonProperty("feedId")
    private UUID feedId;

    @JsonProperty("userId")
    private int userId;

    @JsonProperty("reviewType")
    private String reviewType;

    @JsonProperty("comment")
    private String comment;

    @JsonProperty("courseId")
    private String courseId;

    @JsonProperty("star")
    private int star;

    @JsonProperty("reviewDate")
    private LocalDate reviewDate;

    public Feedback(UUID feedId, int userId, String reviewType, String comment, String courseId, int star, LocalDate reviewDate) {
        this.feedId = feedId;
        this.userId = userId;
        this.reviewType = reviewType;
        this.comment = comment;
        this.courseId = courseId;
        this.star = star;
        this.reviewDate = reviewDate;
    }

    public Feedback() {
    }

    public UUID getFeedId() {
        return feedId;
    }

    public void setFeedId(UUID feedId) {
        this.feedId = feedId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getReviewType() {
        return reviewType;
    }

    public void setReviewType(String reviewType) {
        this.reviewType = reviewType;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public int getStar() {
        return star;
    }

    public void setStar(int star) {
        this.star = star;
    }

    public LocalDate getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(LocalDate reviewDate) {
        this.reviewDate = reviewDate;
    }
}
