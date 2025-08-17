package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.Reference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReferenceRepository extends JpaRepository<Reference,Long> {
}
