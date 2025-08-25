package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.Enroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.UUID;

public interface EnrollmentRepository extends JpaRepository<Enroll, UUID> {
    List<Enroll> findByCourseId(String courseId);

    @Query("SELECT DISTINCT e.courseId FROM Enroll e")
    List<String> findDistinctCourseIds();

    List<Enroll> findByStudentNameContainingIgnoreCase(String studentName);


    List<Enroll> findByUserId(String userId);
}

