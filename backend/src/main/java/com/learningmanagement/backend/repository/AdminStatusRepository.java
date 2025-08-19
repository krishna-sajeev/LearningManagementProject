package com.learningmanagement.backend.repository;

import org.springframework.data.jpa.repository.Query;

public interface AdminStatusRepository {





    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p")
    Double sumAllPayments();



    // EnrollmentRepository.java
    @Query("SELECT COUNT(e) FROM Enrollment e")
    Long countStudents();
}
