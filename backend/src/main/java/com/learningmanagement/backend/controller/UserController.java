package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.hashing.PasswordUtil;
import com.learningmanagement.backend.hashing.SaltUtil;
import com.learningmanagement.backend.model.User;
import com.learningmanagement.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    UserRepository repo;


    @PostMapping("/signup")
    public ResponseEntity<Map<String,String>> signup(@RequestBody User input){
        Map<String,String> response =new HashMap<>();
        try{
            if(input.getPassword() != input.getConfirmPassword())
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
    public ResponseEntity<Map<String,Object>> login(@RequestBody User input) {
        Map<String, Object> response = new HashMap<>();
        try{
            User userFromDb = repo.findByEmail(input.getEmail());

            String enteredHashed = PasswordUtil.hashWithSHA256(input.getPassword(), userFromDb.getSalt());
            if (enteredHashed.equals(userFromDb.getPassword())) {
                response.put("status","Login Successfully");
            }
            else{

                response.put("status","Login Failed");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(response);
    }
}

