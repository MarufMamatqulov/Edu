package com.example.course.service;

import com.example.course.domain.Course;
import com.example.course.domain.CourseItem;
import com.example.course.domain.CourseProgress;
import com.example.course.domain.enumeration.ItemType;
import com.example.course.repository.CourseItemRepository;
import com.example.course.repository.CourseProgressRepository;
import com.example.course.repository.CourseRepository;
import com.example.course.repository.LessonProgressRepository;
import com.example.course.repository.TestAttemptRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CourseProgressService {

    private final CourseProgressRepository courseProgressRepository;
    private final CourseRepository courseRepository;
    private final CourseItemRepository courseItemRepository;
    private final LessonProgressRepository lessonProgressRepository;
    private final TestAttemptRepository testAttemptRepository;
    private final UserService userService;

    public CourseProgressService(
        CourseProgressRepository courseProgressRepository,
        CourseRepository courseRepository,
        CourseItemRepository courseItemRepository,
        LessonProgressRepository lessonProgressRepository,
        TestAttemptRepository testAttemptRepository,
        UserService userService
    ) {
        this.courseProgressRepository = courseProgressRepository;
        this.courseRepository = courseRepository;
        this.courseItemRepository = courseItemRepository;
        this.lessonProgressRepository = lessonProgressRepository;
        this.testAttemptRepository = testAttemptRepository;
        this.userService = userService;
    }

    public void updateCourseProgress(Long courseId, Long userId) {
        CourseProgress progress = courseProgressRepository.findByStudentIdAndCourseId(userId, courseId).orElse(new CourseProgress());
        progress.setStudent(userService.getUserWithAuthorities().orElseThrow(() -> new IllegalStateException("User not found")));
        progress.setCourse(courseRepository.findById(courseId).orElseThrow(() -> new IllegalStateException("Course not found")));
        List<CourseItem> items = courseItemRepository.findByCourseId(courseId);
        int completed = (int) items
            .stream()
            .filter(item ->
                item.getItemType() == ItemType.LESSON
                    ? lessonProgressRepository.findByStudentIdAndCourseItemId(userId, item.getId()).isPresent()
                    : testAttemptRepository.findByStudentIdAndCourseItemIdAndPassed(userId, item.getId(), true).isPresent()
            )
            .count();
        progress.setCompletedItems(completed);
        progress.setIsCompleted(completed == items.size());
        courseProgressRepository.save(progress);
    }
}
