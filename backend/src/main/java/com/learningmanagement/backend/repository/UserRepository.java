package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

   // User findByEmail(String email);
   Optional<User> findByEmail(String email);
    User findByUserId(String userId);

    boolean existsByEmail(String email);
    //  direct teacher count
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'TEACHER'")
    long countTeachers();


}
