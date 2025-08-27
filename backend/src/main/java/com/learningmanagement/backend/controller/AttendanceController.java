package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.model.Attendance;
import com.learningmanagement.backend.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "http://localhost:5174")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @PostMapping("/save")
    public ResponseEntity<String> saveAttendance(@RequestBody List<Attendance> attendanceList) {
        attendanceRepository.saveAll(attendanceList);
        return ResponseEntity.ok("Attendance saved");
    }

    // Get attendance for a course on a specific date
    @GetMapping("/{courseId}/{date}")
    public ResponseEntity<List<Attendance>> getAttendance(
            @PathVariable String courseId,
            @PathVariable String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        List<Attendance> records = attendanceRepository.findByCourseIdAndDate(courseId, parsedDate);
        return ResponseEntity.ok(records);
    }
}
