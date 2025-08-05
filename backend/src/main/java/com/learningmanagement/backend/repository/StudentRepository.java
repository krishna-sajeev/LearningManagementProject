package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<User,Integer> {
}
