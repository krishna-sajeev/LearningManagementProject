
package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.model.Feedback;
import com.learningmanagement.backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController

@CrossOrigin(origins = "http://localhost:5174")


public class FeedbackController {

    @Autowired
    private FeedbackRepository repo;

    // Add new feedback
    @PostMapping("/feedback")
    public ResponseEntity<?> addFeedback(@RequestBody Feedback input) {
        Map<String, String> response = new HashMap<>();
        try {
            repo.save(input);
            response.put("status", "Feedback Added successfully");
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    // Get all feedback (Admin View)
    @GetMapping("/feedbacklist")
    public List<Feedback> getAllFeedback() {
        return repo.findAll();
    }

    // Filter by review type (e.g., "COURSE", "TEACHER")
    @GetMapping("/feedbacklist/type/{type}")
    public List<Feedback> getFeedbackByType(@PathVariable String type) {
        return repo.findByReviewType(type);
    }
}
