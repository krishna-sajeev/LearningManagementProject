package com.learningmanagement.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;
import java.util.UUID;

@Entity
public class LiveSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID liveId;

    @JsonProperty("liveURL")
    private String liveURL;

    @JsonProperty("date")
    private Date liveDate;

    @JsonProperty("instructorId")
    private int instructorId;

    @JsonProperty("courseId")
    private String courseId;

    @JsonProperty("feedbackId")
    private UUID feedbackId;

}
