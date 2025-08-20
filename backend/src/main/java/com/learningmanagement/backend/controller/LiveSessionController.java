package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.model.LiveSession;
import com.learningmanagement.backend.repository.LiveSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5179")
public class LiveSessionController {

    @Autowired
    LiveSessionRepository repo;

    @GetMapping("/live-session")
    public List<LiveSession> liveSession(){
        return repo.findAll();
    }

    @PostMapping("/live-session")
    public ResponseEntity<?> addLiveSession(@RequestBody LiveSession input)
    {
        Map<String,String> response = new HashMap<>();
        try{
            repo.save(input);
            response.put("status","Live Session Added successfully");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(response);
    }

}
