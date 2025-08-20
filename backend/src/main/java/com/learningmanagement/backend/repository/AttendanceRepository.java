package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface AttendanceRepository extends JpaRepository<Attendance, UUID> {
    List<Attendance> findByCourseIdAndDate(String courseId, LocalDate date);
}