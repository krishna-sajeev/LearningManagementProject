package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.LiveSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LiveSessionRepository extends JpaRepository<LiveSession,Integer> {
}
