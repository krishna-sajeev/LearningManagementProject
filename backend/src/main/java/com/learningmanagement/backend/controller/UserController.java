package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.Util.JwtUtil;
import com.learningmanagement.backend.Util.PasswordUtil;
import com.learningmanagement.backend.Util.SaltUtil;
import com.learningmanagement.backend.model.Enroll;
import com.learningmanagement.backend.model.User;
import com.learningmanagement.backend.repository.EnrollmentRepository;
import com.learningmanagement.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
public class UserController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    EnrollmentRepository enrollmentRepo;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User input) {
        Map<String,String> response = new HashMap<>();
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
            // Auto-approve Admins
            if ((User.Role.ADMIN).equals(input.getRole()) ) {
                input.setApproved(true);
                response.put("status","Successfully Registered");
            }
            else {
                input.setApproved(false);
                response.put("status", "Registered successfully, Please wait for Admin approval");
            }

            // Save first to get numeric ID
            User saved = repo.save(input);

            // Generate userId prefix from role
            String prefix;
            switch (saved.getRole()) {
                case STUDENT: prefix = "STU"; break;
                case TEACHER: prefix = "TEA"; break;
                default:      prefix = "USR";
            }

            saved.setUserId(prefix + (saved.getId() + 10));
            repo.save(saved);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "status", "Registration failed",
                    "error", e.getMessage() != null ? e.getMessage() : e.toString()
            ));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User input) {
        try {
            if (input.getEmail() == null || input.getPassword() == null) {
                return ResponseEntity.badRequest().body(
                        Map.of("status", "error", "message", "Missing login fields")
                );
            }

            Optional<User> userOpt = repo.findByEmail(input.getEmail());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(401).body(
                        Map.of("status", "error", "message", "Invalid credentials")
                );
            }

            User userFromDb = userOpt.get();

            // ✅ Validate password
            String enteredHashed = PasswordUtil.hashWithSHA256(input.getPassword(), userFromDb.getSalt());
            if (!enteredHashed.equals(userFromDb.getPassword())) {
                return ResponseEntity.status(401).body(
                        Map.of("status", "error", "message", "Invalid credentials")
                );
            }

            // ✅ Ensure user is approved
            if (!userFromDb.isApproved()) {
                return ResponseEntity.status(403).body(
                        Map.of("status", "error", "message", "User not approved by Admin yet")
                );
            }

            // ✅ Generate JWT including role
            String token = jwtUtil.generateToken(userFromDb.getEmail(), userFromDb.getRole());
            if (token == null) {
                return ResponseEntity.status(500).body(
                        Map.of("status", "error", "message", "Token generation failed")
                );
            }

            // ✅ Success response
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("token", token);
            response.put("user", Map.of(
                    "userId", userFromDb.getUserId(),
                    "fullName", userFromDb.getFullName(),
                    "email", userFromDb.getEmail(),
                    "role", userFromDb.getRole().name() // ensure it's string
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(
                    Map.of("status", "error", "message", "Login failed", "error", e.getMessage())
            );
        }
    }


    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            return ResponseEntity.ok(repo.findAll());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("status", "Error fetching users", "error", e.getMessage()));
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        User user = repo.findByUserId(userId);
        if (user == null) return ResponseEntity.status(404).body(Map.of("status", "User not found"));
        repo.delete(user);
        return ResponseEntity.ok(Map.of("status", "User deleted successfully"));
    }

    @PutMapping("/users/{userId}/approve")
    public ResponseEntity<?> approveUser(@PathVariable String userId) {
        try {
            User user = repo.findByUserId(userId);
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("status", "User not found"));
            }
            user.setApproved(true);
            repo.save(user);
            return ResponseEntity.ok(Map.of("status", "User approved successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("status", "Error approving user", "error", e.getMessage()));
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Optional<User> user = repo.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body(Map.of("status", "User not found"));
        }
    }

    @GetMapping("/users/{userId}/enrollments")
    public ResponseEntity<?> getEnrollmentsByUser(@PathVariable String userId) {
        try {
            // ✅ Correct: fetch enrollments from EnrollmentRepository
            List<Enroll> enrollments = enrollmentRepo.findByUserId(userId);

            if (enrollments.isEmpty()) {
                return ResponseEntity.ok(List.of()); // return empty list if no enrollments
            }

            // ✅ Fetch the actual user details only once
            User user = repo.findByUserId(userId);
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }

            // ✅ Attach user details to each enrollment
            List<Map<String, Object>> response = enrollments.stream().map(enrollment -> {
                Map<String, Object> data = new HashMap<>();
                data.put("enrollId", enrollment.getEnrollId());
                data.put("courseId", enrollment.getCourseId());
                data.put("enrollDate", enrollment.getEnrollDate());
                data.put("status", enrollment.getStatus());
                data.put("paymentId", enrollment.getPaymentId());

                data.put("user", Map.of(
                        "userId", user.getUserId(),
                        "fullName", user.getFullName(),
                        "email", user.getEmail(),
                        "mobileNumber", user.getMobileNumber(),
                        "role", user.getRole()
                ));
                return data;
            }).toList();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Failed to fetch enrollments"));
        }
    }

}
