package com.learningmanagement.backend.controller;


import com.learningmanagement.backend.repository.CourseRepository;
import com.learningmanagement.backend.repository.EnrollmentRepository;
import com.learningmanagement.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5174")
 class AdminStatusController {


    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private EnrollmentRepository enrollRepo;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepo.count());
        stats.put("totalCourses", courseRepo.count());
        stats.put("enrolledStudents", enrollRepo.count());
        stats.put("activeTeachers", userRepo.countTeachers());
        //stats.put("totalTeachers", userRepo.countByRole("TEACHER"));
        return stats;
}

}
