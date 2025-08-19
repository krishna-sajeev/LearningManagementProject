package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.model.Assignment;
import com.learningmanagement.backend.model.Submission;
import com.learningmanagement.backend.repository.AssignmentRepository;
import com.learningmanagement.backend.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SubmissionController {

    @Autowired
    SubmissionRepository repo;


    @Autowired
    AssignmentRepository repoassignment;

    @PostMapping("/submit")
    public ResponseEntity<Map<String,String>> submit(@RequestBody Submission input){
        Map<String,String> response = new HashMap<>();
        try{
            Optional<Assignment> assignment = repoassignment.findById(input.getAssignmentId());
            Assignment existingAssignment = assignment.get();

            repo.save(input);
            if(existingAssignment.getDueDate().before(input.getSubmissionDate())){

                response.put("status", "Late Submission");
            }
            else {
                response.put("status", "Assignment submitted successfully");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(response);

    }
}
