package com.learningmanagement.backend.repository;


import com.learningmanagement.backend.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByReviewType(Feedback.ReviewType reviewType);


}
