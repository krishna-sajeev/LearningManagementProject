package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SubmissionRepository extends JpaRepository<Submission, UUID> {
    List<Submission> findByAssignmentId(int assignmentId);
}