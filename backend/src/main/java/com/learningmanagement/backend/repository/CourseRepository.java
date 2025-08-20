package com.learningmanagement.backend.repository;
import com.learningmanagement.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface CourseRepository extends JpaRepository<Course,Integer> {


@Query(value="SELECT `id`, `description`, `duration`, `courseId`,`instructor`, `status`, `title`, `fee`, `icon`  FROM `course`",nativeQuery = true)
List<Map<String, Object>> findAllCourse();

   Course findByCourseId(String courseId) ;
}

