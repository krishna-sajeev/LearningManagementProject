package com.learningmanagement.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CourseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonProperty("Title")
    private String title;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Fee")
    private float fee;

    @JsonProperty("Duration")
    private float duration;

    @JsonProperty("Instructor")
    private String instructor ;

    @JsonProperty("Thumbnail URL")
    private  String thumbnailURL;

    private  Level level;

    public enum Level{
        BEGINNER,INTERMEDIATE,ADVANCE
    }

    public CourseModel() {
    }

    public CourseModel(int id, String title, String description, float fee, float duration, String instructor, String thumbnailURL, Level level) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.fee = fee;
        this.duration = duration;
        this.instructor = instructor;
        this.thumbnailURL = thumbnailURL;
        this.level = level;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getFee() {
        return fee;
    }

    public void setFee(float fee) {
        this.fee = fee;
    }

    public float getDuration() {
        return duration;
    }

    public void setDuration(float duration) {
        this.duration = duration;
    }

    public String getInstructor() {
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public String getThumbnailURL() {
        return thumbnailURL;
    }

    public void setThumbnailURL(String thumbnailURL) {
        this.thumbnailURL = thumbnailURL;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }
}
