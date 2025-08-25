package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.RecordedVideo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordedVideoRepository extends JpaRepository<RecordedVideo, Long> {
    List<RecordedVideo> findByCourse_CourseId(String courseId);
}
