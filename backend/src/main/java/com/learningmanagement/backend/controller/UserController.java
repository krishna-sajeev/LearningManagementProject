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
@CrossOrigin(origins = "http://localhost:5177")
public class UserController {

    @Autowired
    UserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<Map<String,String>> signup(@RequestBody User input){
        Map<String,String> response =new HashMap<>();
        try{
            User existingUser = repo.findByEmail(input.getEmail());
            if (existingUser != null) {
                response.put("status", "User already registered with this email");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
//            if(input.getPassword().equals(input.getConfirmPassword()))
//                response.put("status","Passwords do not match");
            if ((input.getPassword() == null) || (input.getConfirmPassword() == null) || (!input.getPassword().equals(input.getConfirmPassword()))) {
                response.put("status", "Passwords do not match");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
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
        User userFromDb;
        try {
            userFromDb = repo.findByEmail(input.getEmail());
            if (userFromDb == null) {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
            String enteredHashed = PasswordUtil.hashWithSHA256(input.getPassword(), userFromDb.getSalt());
            if (!enteredHashed.equals(userFromDb.getPassword())) {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
            if(!userFromDb.getRole().equals(input.getRole())){
                return ResponseEntity.status(401).body("Invalid Role");
            }
            token = jwtUtil.generateToken(userFromDb.getEmail());
            if (token == null) {
                return ResponseEntity.status(500).body("Token generation failed");
            }


        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        response.put("token", token);
        response.put("user", Map.of(
                "id", userFromDb.getId(),
                "fullName", userFromDb.getFullName(),
                "email", userFromDb.getEmail(),
                "role", userFromDb.getRole()
        ));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return repo.findAll();
    }


    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        repo.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping("/users/{id}")
    public Optional<User> getUser(@PathVariable int id) {
        return repo.findById(id);

    }

}

