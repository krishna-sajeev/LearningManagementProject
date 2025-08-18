package com.learningmanagement.backend.controller;


import com.learningmanagement.backend.model.Course;
import com.learningmanagement.backend.repository.CourseRepository;
import com.learningmanagement.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5175")
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

    @GetMapping("/display")
    public ResponseEntity<List<Course>> viewCourses() {
        try {
            List<Course> courses = repo.findAll();
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable int id, @RequestBody Course updatedCourse) {
        return repo.findById(id).map(course -> {
            course.setTitle(updatedCourse.getTitle());
            course.setDescription(updatedCourse.getDescription());
            course.setInstructor(updatedCourse.getInstructor());
            course.setDuration(updatedCourse.getDuration());
            course.setDate(updatedCourse.getDate());
            course.setStatus(updatedCourse.getStatus());
            course.setIcon(updatedCourse.getIcon());
            course.setFee(updatedCourse.getFee());
            return ResponseEntity.ok(repo.save(course));
        }).orElse(ResponseEntity.notFound().build());
    }

}