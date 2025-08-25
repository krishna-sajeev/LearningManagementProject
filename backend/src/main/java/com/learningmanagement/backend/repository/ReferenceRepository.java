package com.learningmanagement.backend.repository;

import aj.org.objectweb.asm.commons.Remapper;
import com.learningmanagement.backend.model.RecordedVideo;
import com.learningmanagement.backend.model.Reference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReferenceRepository extends JpaRepository<Reference,Long> {
    List<Reference> findByCourse_CourseId(String courseId);
}
