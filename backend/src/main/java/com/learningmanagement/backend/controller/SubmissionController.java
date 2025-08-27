package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.model.Submission;
import com.learningmanagement.backend.repository.SubmissionRepository;
import com.learningmanagement.backend.repository.AssignmentRepository;
import com.learningmanagement.backend.model.Assignment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
public class SubmissionController {

    @Autowired
    private SubmissionRepository repo;

    @Autowired
    private AssignmentRepository repoassignment;


    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> submit(@RequestBody Submission input) {
        Map<String, String> response = new HashMap<>();
        try {
            Optional<Assignment> assignmentOpt = repoassignment.findById(input.getAssignmentId());
            if (assignmentOpt.isEmpty()) {
                response.put("status", "Assignment not found");
                return ResponseEntity.badRequest().body(response);
            }

            Assignment existingAssignment = assignmentOpt.get();
            repo.save(input);

            if (existingAssignment.getDueDate().before(input.getSubmissionDate())) {
                response.put("status", "Late Submission");
            } else {
                response.put("status", "Assignment submitted successfully");
            }
        } catch (Exception e) {
            response.put("status", "Error: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/submissions")
    public ResponseEntity<List<Submission>> getAllSubmissions() {
        List<Submission> submissions = repo.findAll();
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/assignments/{assignmentId}/submissions")
    public ResponseEntity<List<Submission>> getSubmissionsForAssignment(@PathVariable int assignmentId) {
        List<Submission> submissions = repo.findByAssignmentId(assignmentId);
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/submissions/{id}")
    public ResponseEntity<Submission> getSubmission(@PathVariable UUID id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/submissions/{id}")
    public ResponseEntity<Submission> updateSubmission(@PathVariable UUID id,
                                                       @RequestBody Submission updated) {
        return repo.findById(id).map(existing -> {
            existing.setGrade(updated.getGrade());
            existing.setFeedback(updated.getFeedback());
            Submission saved = repo.save(existing);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }
}
