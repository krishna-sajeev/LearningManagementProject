package com.learningmanagement.backend.controller;


import com.learningmanagement.backend.model.Course;
import com.learningmanagement.backend.repository.CourseRepository;
import com.learningmanagement.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {


    @Autowired
    CourseRepository repo;


    @PostMapping("/addCourse")
    public ResponseEntity<Map<String, String>> addCourse(@RequestBody Course input) {
        Map<String, String> response = new HashMap<>();
        try {
            Course course = repo.save(input);
            if (course.getId() != 0) {
                response.put("status", "Successfully Added");

            } else {
                response.put("status", "Error occurred");
            }
        } catch (Exception e) {
            response.put("status", "Error");
            response.put("message", e.getMessage());
        }

        return ResponseEntity.ok(response);
    }

}
