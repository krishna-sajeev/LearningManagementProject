package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.model.Enroll;
import com.learningmanagement.backend.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {

    @Autowired
    EnrollmentRepository repo;

    @Autowired
    private JavaMailSender mailSender;

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



    @GetMapping("/enrollments")
    public List<Enroll> getAllEnrollments() {
        return repo.findAll();
    }

    @PostMapping("/email/sendReminder")
    public ResponseEntity<?> sendReminder(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Payment Reminder");
            message.setText("This is a reminder to complete your pending course payment.");
            mailSender.send(message);
            return ResponseEntity.ok("Reminder email sent to " + email);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error sending email");
        }
    }

}
