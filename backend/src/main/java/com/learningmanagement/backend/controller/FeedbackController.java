package com.learningmanagement.backend.controller;


import com.learningmanagement.backend.model.Feedback;
import com.learningmanagement.backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5177")
public class FeedbackController {

    @Autowired
    FeedbackRepository repo;

    @PostMapping("/feedback")
    public ResponseEntity<?> addFeedback(@RequestBody Feedback input){
        Map<String,String> response = new HashMap<>();
        try{
            repo.save(input);
            response.put("status","Feedback Added successfully");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(response);
    }
}
