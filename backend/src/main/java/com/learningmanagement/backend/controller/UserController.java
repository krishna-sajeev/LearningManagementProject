package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.Util.JwtUtil;
import com.learningmanagement.backend.Util.PasswordUtil;
import com.learningmanagement.backend.Util.SaltUtil;
import com.learningmanagement.backend.model.User;
import com.learningmanagement.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    UserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<Map<String,String>> signup(@RequestBody User input){
        Map<String,String> response =new HashMap<>();
        try{
            User existingUser = repo.findByEmail(input.getEmail());
            if (existingUser != null) {
                response.put("status", "User already registered with this email");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            if(input.getPassword().equals(input.getConfirmPassword()))
                response.put("status","Passwords do not match");
            String salt = SaltUtil.generateSalt(16);
            String hashedPassword = PasswordUtil.hashWithSHA256(input.getPassword(), salt);

            input.setSalt(salt);
            input.setPassword(hashedPassword);
            User login = repo.save(input);
            if(login.getId()!=0){
                response.put("status","Registered successfully, Please wait for Admin approval");
            }
            else{
                response.put("status","Error");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User input) {
        Map<String, Object> response = new HashMap<>();
        String token;
        try {
            User userFromDb = repo.findByEmail(input.getEmail());
        if(userFromDb == null){
                return  ResponseEntity.status(401).body("Invalid credentials");
        }
            String enteredHashed = PasswordUtil.hashWithSHA256(input.getPassword(), userFromDb.getSalt());
            if (!enteredHashed.equals(userFromDb.getPassword()) ) {
               return ResponseEntity.status(401).body("Invalid credentials");
            }

            token = jwtUtil.generateToken(userFromDb.getEmail());
            if (token == null) {
                return ResponseEntity.status(500).body("Token generation failed");
            }


        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }

}

