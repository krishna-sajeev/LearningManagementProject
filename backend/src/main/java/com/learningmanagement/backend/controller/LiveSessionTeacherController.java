package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.model.Course;
import com.learningmanagement.backend.model.LiveSessionTeacher;
import com.learningmanagement.backend.repository.CourseRepository;
import com.learningmanagement.backend.repository.LiveSessionTeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/livesessions")
@CrossOrigin(origins = "http://localhost:5179")
public class LiveSessionTeacherController {

    @Autowired
    private LiveSessionTeacherRepository liveSessionTeacherRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addSession(@RequestBody Map<String, Object> request) {
        try {
            Integer courseId = Integer.valueOf(request.get("courseId").toString());
            String date = request.get("date").toString();
            String liveUrl = request.get("liveUrl").toString();

            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            LiveSessionTeacher session = new LiveSessionTeacher();
            session.setCourse(course);
            session.setDate(date);
            session.setLiveUrl(liveUrl);

            liveSessionTeacherRepository.save(session);

            return ResponseEntity.ok(Map.of("status", "success", "message", "Session added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", e.getMessage()));
        }
    }


    @GetMapping("/display")
    public ResponseEntity<List<LiveSessionTeacher>> getAllSessions() {
        return ResponseEntity.ok(liveSessionTeacherRepository.findAll());
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteSession(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        if (liveSessionTeacherRepository.existsById(id)) {
            liveSessionTeacherRepository.deleteById(id);
            response.put("status", "success");
            response.put("message", "Session deleted successfully");
        } else {
            response.put("status", "error");
            response.put("message", "Session not found");
        }
        return ResponseEntity.ok(response);
    }
}
