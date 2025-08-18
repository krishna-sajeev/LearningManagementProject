package com.learningmanagement.backend.controller;


import com.learningmanagement.backend.model.Enroll;
import com.learningmanagement.backend.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {

    @Autowired
    EnrollmentRepository repo;

    @PostMapping("/enroll")
    public ResponseEntity<?> enroll(@RequestBody Enroll input){
        Map<String,String> response = new HashMap<>();
        try{
            Enroll exisiting = repo.findByCourse(input.getCourseId());
            repo.save(input);
            response.put("status" ,"Course Enrolled Successfully");
        } catch (Exception e) {
            response.put("status","Error occured, Please try again later");
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(response);
    }


}
