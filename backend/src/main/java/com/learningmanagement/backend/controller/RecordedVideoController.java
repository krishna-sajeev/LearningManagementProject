package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.model.Course;
import com.learningmanagement.backend.model.RecordedVideo;
import com.learningmanagement.backend.repository.CourseRepository;
import com.learningmanagement.backend.repository.RecordedVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/recordedvideos")
@CrossOrigin(origins = "http://localhost:5174")
public class RecordedVideoController {

    @Autowired
    private RecordedVideoRepository recordedVideoRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addVideo(@RequestBody Map<String, Object> request) {
        try {
            Integer courseId = Integer.valueOf(request.get("courseId").toString());
            String title = request.get("title").toString();
            String url = request.get("url").toString();

            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            RecordedVideo video = new RecordedVideo();
            video.setCourse(course);
            video.setTitle(title);
            video.setUrl(url);

            recordedVideoRepository.save(video);

            return ResponseEntity.ok(Map.of("status", "success", "message", "Recorded video added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", e.getMessage()));
        }
    }

    @GetMapping("/display")
    public ResponseEntity<List<RecordedVideo>> getAllVideos() {
        return ResponseEntity.ok(recordedVideoRepository.findAll());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteVideo(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        if (recordedVideoRepository.existsById(id)) {
            recordedVideoRepository.deleteById(id);
            response.put("status", "success");
            response.put("message", "Video deleted successfully");
        } else {
            response.put("status", "error");
            response.put("message", "Video not found");
        }
        return ResponseEntity.ok(response);
    }
}
