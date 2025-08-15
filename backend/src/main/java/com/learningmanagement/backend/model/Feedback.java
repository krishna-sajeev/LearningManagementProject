package com.learningmanagement.backend.model;


import jakarta.persistence.*;
import java.time.LocalDate;

    @Entity
    @Table(name = "feedback")
    public class Feedback {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "course_id", nullable = false)
        private Long courseId;

        @Column(name = "user_id", nullable = false)
        private Long userId;

        @Enumerated(EnumType.STRING)
        @Column(name = "review_type", nullable = false)
        private ReviewType reviewType;

        @Column(name = "review_date", nullable = false)
        private LocalDate reviewDate;

        @Column(nullable = false)
        private int star;

        @Column(columnDefinition = "TEXT")
        private String comment;

        public enum ReviewType {
            TEACHER, COURSE
        }

        // Getters and setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public Long getCourseId() { return courseId; }
        public void setCourseId(Long courseId) { this.courseId = courseId; }

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public ReviewType getReviewType() { return reviewType; }
        public void setReviewType(ReviewType reviewType) { this.reviewType = reviewType; }

        public LocalDate getReviewDate() { return reviewDate; }
        public void setReviewDate(LocalDate reviewDate) { this.reviewDate = reviewDate; }

        public int getStar() { return star; }
        public void setStar(int star) { this.star = star; }

        public String getComment() { return comment; }
        public void setComment(String comment) { this.comment = comment; }

    }




