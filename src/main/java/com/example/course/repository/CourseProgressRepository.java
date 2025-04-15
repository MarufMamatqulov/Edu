package com.example.course.repository;

import com.example.course.domain.CourseProgress;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseProgressRepository extends JpaRepository<CourseProgress, Long> {
    Optional<CourseProgress> findByStudentIdAndCourseId(Long studentId, Long courseId);

    @Query(
        "select courseProgress from CourseProgress courseProgress left join fetch courseProgress.student left join fetch courseProgress.course where courseProgress.id = :id"
    )
    Optional<CourseProgress> findOneWithEagerRelationships(Long id);

    @Query("select courseProgress from CourseProgress courseProgress where courseProgress.student.login = ?#{principal.username}")
    List<CourseProgress> findAllWithEagerRelationships();

    List<CourseProgress> findByStudentId(Long userId);
}
