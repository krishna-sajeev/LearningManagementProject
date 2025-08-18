package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.Util.JwtUtil;
import com.learningmanagement.backend.Util.PasswordUtil;
import com.learningmanagement.backend.Util.SaltUtil;
import com.learningmanagement.backend.model.User;
import com.learningmanagement.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User input) {
        try {
            if (input.getEmail() == null || input.getPassword() == null
                    || input.getConfirmPassword() == null || input.getRole() == null) {
                return ResponseEntity.badRequest().body(Map.of("status", "Missing required fields"));
            }

            if (repo.existsByEmail(input.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("status", "User already registered with this email"));
            }

            if (!input.getPassword().equals(input.getConfirmPassword())) {
                return ResponseEntity.badRequest().body(Map.of("status", "Passwords do not match"));
            }

            String salt = SaltUtil.generateSalt(16);
            String hashed = PasswordUtil.hashWithSHA256(input.getPassword(), salt);
            input.setSalt(salt);
            input.setPassword(hashed);
            input.setApproved(false);

            // Save first to get numeric ID
            User saved = repo.save(input);

            // Generate userId prefix from role
            String prefix;
            switch (saved.getRole()) {
                case STUDENT: prefix = "STU"; break;
                case TEACHER: prefix = "TEA"; break;
                case ADMIN:   prefix = "ADM"; break;
                default:      prefix = "USR";
            }

            saved.setUserId(prefix + (saved.getId() + 10));
            repo.save(saved);

            return ResponseEntity.ok(Map.of("status", "Registered successfully, Please wait for Admin approval"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "status", "Registration failed",
                    "error", e.getMessage()
            ));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User input) {
        try {
            User userFromDb = repo.findByEmail(input.getEmail());
            if (userFromDb == null) return ResponseEntity.status(401).body("Invalid credentials");

            String enteredHashed = PasswordUtil.hashWithSHA256(input.getPassword(), userFromDb.getSalt());
            if (!enteredHashed.equals(userFromDb.getPassword())) return ResponseEntity.status(401).body("Invalid credentials");

            if (input.getRole() == null || !userFromDb.getRole().equals(input.getRole()))
                return ResponseEntity.status(401).body("Invalid Role");

            String token = jwtUtil.generateToken(userFromDb.getEmail());
            if (token == null) return ResponseEntity.status(500).body("Token generation failed");

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", Map.of(
                    "UserId", userFromDb.getUserId(),
                    "fullName", userFromDb.getFullName(),
                    "email", userFromDb.getEmail(),
                    "role", userFromDb.getRole()
            ));
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        try { return ResponseEntity.ok(repo.findAll()); }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error fetching users: " + e.getMessage());
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        User user = repo.findByUserId(userId);
        if (user == null) return ResponseEntity.status(404).body("User not found");
        repo.delete(user);
        return ResponseEntity.ok("User deleted successfully");
    }
    @PutMapping("/users/{userId}/approve")
    public ResponseEntity<?> approveUser(@PathVariable String userId) {
        try {
            User user = repo.findByUserId(userId);
            if (user == null) {
                return ResponseEntity.status(404).body("User not found");
            }
            user.setApproved(true);
            repo.save(user);
            return ResponseEntity.ok(Map.of("status", "User approved successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error approving user: " + e.getMessage());
        }
    }


    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Optional<User> user = repo.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

}
