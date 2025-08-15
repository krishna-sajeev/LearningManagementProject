package com.learningmanagement.backend.controller;


import com.learningmanagement.backend.model.Feedback;
import com.learningmanagement.backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
//@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;



    @PostMapping("/feedback")    //  Insert Feedback (Student Side)
    public Feedback addFeedback(@RequestBody Feedback feedback) {
        return feedbackRepository.save(feedback);
    }


    //  Get all feedback (Admin View)
    @GetMapping("/feedbacklist")
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    //  Filter by review type (TEACHER or COURSE)
    @GetMapping("feedbacklist/type/{type}")
    public List<Feedback> getFeedbackByType(@PathVariable String type) {
        Feedback.ReviewType reviewType = Feedback.ReviewType.valueOf(type.toUpperCase());
        return feedbackRepository.findByReviewType(reviewType);
    }


}
