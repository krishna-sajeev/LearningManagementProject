package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.Enroll;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enroll,Integer> {


}
