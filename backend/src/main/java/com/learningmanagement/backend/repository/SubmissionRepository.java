package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission,Integer> {
}
