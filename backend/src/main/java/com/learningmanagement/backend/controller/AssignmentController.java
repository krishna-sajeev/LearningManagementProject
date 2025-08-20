package com.learningmanagement.backend.controller;


import com.learningmanagement.backend.model.Assignment;
import com.learningmanagement.backend.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@CrossOrigin(origins = "http://localhost:5179")
public class AssignmentController {
    @Autowired
    AssignmentRepository repo;
    @PostMapping("/addAssignment")
    public ResponseEntity<Map<String,String>> addAssignment(@RequestBody Assignment input)
    {
        input.setStatus("Active");
        Map<String,String> response = new HashMap<>();
        try{
            Assignment assignment = repo.save(input);
            if (assignment.getAssignment_id() !=0)
            {
                response.put("status","Successfully Added");
            }
            else
            {
                response.put("status","Error occurred");
            }
        }
        catch (Exception e)
        {
            response.put("status","Error");
            response.put("message",e.getMessage());
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/viewAssignments")
    public ResponseEntity<List<Assignment>> viewAssignment()
    {
        try {
            List<Assignment> assignments = repo.findAll();
            return ResponseEntity.ok(assignments);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @DeleteMapping("/deleteAssignment/{id}")
    public ResponseEntity<Map<String,String>> deleteAssignment(@PathVariable int id)
    {
        Map<String,String> response = new HashMap<>();
        try {
            if(repo.existsById(id))
            {
                repo.deleteById(id);
                response.put("status","Successfully deleted");
                return ResponseEntity.ok(response);
            }
            else
            {
                response.put("status","Assignment not found");
                return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }
        catch (Exception e)
        {
            response.put("status","Error");
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @PutMapping("/updateAssignment/{id}")
    public ResponseEntity<Map<String,String>> updateAssignment(@PathVariable int id,@RequestBody Assignment updatedAssignment)
    {
        Map<String,String> response= new HashMap<>();
        try {
            Optional<Assignment> optionalAssignment = repo.findById(id);
            if (optionalAssignment.isPresent()) {
                Assignment existingAssignment = optionalAssignment.get();

                if (updatedAssignment.getDetails() != null) {
                    existingAssignment.setDetails(updatedAssignment.getDetails());
                }
                if (updatedAssignment.getDueDate() != null) {
                    existingAssignment.setDueDate(updatedAssignment.getDueDate());
                }
                if (updatedAssignment.getStatus() != null) {
                    existingAssignment.setStatus(updatedAssignment.getStatus());
                }
                repo.save(existingAssignment);
                response.put("status", "Successfully Updated");
                return ResponseEntity.ok(response);
            }
                else{
                    response.put("status","Assignment not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            }

        catch (Exception e)
        {
            response.put("status", "Error");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
