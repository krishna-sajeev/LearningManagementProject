package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {


    @Query(value = "SELECT `id`, `email`, `full_name`, `mobile_number`, `password`, `role`,`salt` FROM `user` WHERE `email` = ?1",nativeQuery = true)
    User findByEmail(String email);
}
