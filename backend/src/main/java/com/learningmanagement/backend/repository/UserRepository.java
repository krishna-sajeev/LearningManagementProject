package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    // Derived queries – no native SQL needed
    User findByEmail(String email);

    User findByUserId(String userId);

    boolean existsByEmail(String email);
}
