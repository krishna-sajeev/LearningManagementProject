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


}
