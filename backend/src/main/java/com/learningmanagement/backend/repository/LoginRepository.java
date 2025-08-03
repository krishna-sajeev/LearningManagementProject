package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LoginRepository extends JpaRepository<User,Integer> {

    @Query(value = "SELECT `id`, `email`, `full_name`, `mobile_number`, `password`, `role` FROM `user` WHERE `email` = ?1 AND `password`= ?2",nativeQuery = true)
    List<User> login (String email, String passwrord, User.Role role);
}
