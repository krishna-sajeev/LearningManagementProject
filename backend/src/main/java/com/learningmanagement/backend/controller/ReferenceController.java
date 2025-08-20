package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.model.Course;
import com.learningmanagement.backend.model.Reference;
import com.learningmanagement.backend.repository.CourseRepository;
import com.learningmanagement.backend.repository.ReferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/references")

@CrossOrigin(origins = "http://localhost:5179")

public class ReferenceController {

    @Autowired
    private ReferenceRepository referenceRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/addReference")
    public ResponseEntity<?> addReference(@RequestBody Map<String, Object> request) {
        try {
            String title = (String) request.get("title");
            String imageUrl = (String) request.get("imageUrl");
            String materialUrl = (String) request.get("materialUrl");
            Integer courseId = Integer.valueOf(request.get("courseId").toString());

            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            Reference reference = new Reference();
            reference.setTitle(title);
            reference.setImageUrl(imageUrl);
            reference.setMaterialUrl(materialUrl);
            reference.setCourse(course);

            referenceRepository.save(reference);

            return ResponseEntity.ok(Map.of("status", "Successfully Added"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/display")
    public ResponseEntity<List<Reference>> getAllReferences() {
        List<Reference> references = referenceRepository.findAll();
        return ResponseEntity.ok(references);
    }

    @DeleteMapping("/deleteReference/{id}")
    public ResponseEntity<Map<String, Object>> deleteReference(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        if (referenceRepository.existsById(id)) {
            referenceRepository.deleteById(id);
            response.put("status", "success");
            response.put("message", "Reference deleted successfully");
        } else {
            response.put("status", "error");
            response.put("message", "Reference not found");
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReferenceById(@PathVariable Long id) {
        return referenceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateReference(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        try {
            Reference reference = referenceRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Reference not found"));

            String title = (String) request.get("title");
            String imageUrl = (String) request.get("imageUrl");
            String materialUrl = (String) request.get("materialUrl");
            Integer courseId = Integer.valueOf(request.get("courseId").toString());

            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            reference.setTitle(title);
            reference.setImageUrl(imageUrl);
            reference.setMaterialUrl(materialUrl);
            reference.setCourse(course);

            referenceRepository.save(reference);

            return ResponseEntity.ok(Map.of("status", "Successfully Updated"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

}
