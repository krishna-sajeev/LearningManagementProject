package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.model.User;
import com.learningmanagement.backend.repository.StudentRepository;
import com.learningmanagement.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5175")
public class ProfileController {


    @Autowired
    UserRepository repo;

    @GetMapping("/my-profile/{id}")
    public ResponseEntity<?> viewProfile(@PathVariable Long id ) {
        Map<String, String> response = new HashMap<>();

        User profile;
        try {
            profile = repo.findById(id).orElse(null);
            if (profile == null)
                return ResponseEntity.status(404).body("Profile not found");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching student details");
        }
        return ResponseEntity.ok(profile);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String,String>> delete(@PathVariable Long id){
        Map<String, String> response = new HashMap<>();

        try {
            Optional<User> profile = repo.findById(id);
            if(profile.isPresent()){
                repo.delete(profile.get());
                response.put("status","User details deleted");
            }
            else {
                response.put("status","User is not find");
            }
        }catch (Exception e){
            response.put("status", "ERROR");

        }
        return  ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody User input) {
        Map<String, String> response = new HashMap<>();

        try {

            Optional<User> existingProfile = repo.findById(id);

            if (existingProfile.isEmpty()) {
                response.put("status", "NOT_FOUND");
                response.put("message", "User with ID " + id + " not found.");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            } else {
                User profile = existingProfile.get();
                profile.setFullName(input.getFullName());
                profile.setEmail(input.getEmail());
                profile.setRole(input.getRole());
                profile.setMobileNumber(input.getMobileNumber());


                User updatedProfile = repo.save(profile);

                return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
            }

        } catch (Exception e) {
            response.put("status", "ERROR");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    }

