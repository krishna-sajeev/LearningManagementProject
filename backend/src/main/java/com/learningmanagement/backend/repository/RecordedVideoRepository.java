package com.learningmanagement.backend.repository;

import com.learningmanagement.backend.model.RecordedVideo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordedVideoRepository extends JpaRepository<RecordedVideo, Long> {
}
