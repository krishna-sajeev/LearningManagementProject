package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FeedbackRepository extends JpaRepository<Feedback, UUID> {
    List<Feedback> findByReviewType(String reviewType);
}

