package com.learningmanagement.backend.controller;


import com.learningmanagement.backend.model.Enroll;
import com.learningmanagement.backend.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5177")
public class EnrollmentController {

    @Autowired
    EnrollmentRepository repo;

    @PostMapping("/enroll")
    public ResponseEntity<?> enroll(@RequestBody Enroll input){
        Map<String,String> response = new HashMap<>();
        try{
            repo.save(input);
            response.put("status" ,"Course Enrolled Successfully");
        } catch (Exception e) {
            response.put("status","Error occured, Please try again later");
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping("/students/{courseId}")
    public ResponseEntity<List<Enroll>> getStudentsByCourse(@PathVariable String courseId) {
        List<Enroll> students = repo.findByCourseId(courseId);
        return ResponseEntity.ok(students);
    }
    @GetMapping("/courses")
    public ResponseEntity<List<String>> getCourses() {
        List<String> courses = repo.findDistinctCourseIds();
        return ResponseEntity.ok(courses);
    }
    @GetMapping("/students/search")
    public ResponseEntity<List<Enroll>> searchStudents(@RequestParam String name) {
        List<Enroll> students = repo.findByStudentNameContainingIgnoreCase(name);
        return ResponseEntity.ok(students);
    }

}
