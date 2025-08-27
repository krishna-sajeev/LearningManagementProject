package com.learningmanagement.backend.controller;


import com.learningmanagement.backend.model.User;
import com.learningmanagement.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5174")
public class EmailController {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    private final Map<String, String> otpStore = new HashMap<>();

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email not registered"));
        }

        // Generate OTP
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);
        otpStore.put(email, otp);

        // Send mail
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject("Your OTP Code");
        msg.setText("Your OTP is: " + otp);
        mailSender.send(msg);

        return ResponseEntity.ok(Map.of("message", "OTP sent to email"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String otp = req.get("otp");
        String newPassword = req.get("newPassword");

        if (!otpStore.containsKey(email) || !otpStore.get(email).equals(otp)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid OTP"));
        }

        User user = userRepository.findByEmail(email).orElseThrow();
        user.setPassword(newPassword); // Add hashing here in real case
        userRepository.save(user);

        otpStore.remove(email);
        return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
    }
}
