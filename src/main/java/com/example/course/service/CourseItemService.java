package com.example.course.service;

import com.example.course.domain.CourseItem;
import com.example.course.repository.CourseItemRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CourseItemService {

    private final Logger log = LoggerFactory.getLogger(CourseItemService.class);

    private final CourseItemRepository courseItemRepository;

    public CourseItemService(CourseItemRepository courseItemRepository) {
        this.courseItemRepository = courseItemRepository;
    }

    /**
     * Find all course items for a given course ID.
     *
     * @param courseId the ID of the course
     * @return the list of course items
     */
    @Transactional(readOnly = true)
    public List<CourseItem> findByCourseId(Long courseId) {
        log.debug("Request to get CourseItems for Course ID: {}", courseId);
        return courseItemRepository.findByCourseId(courseId);
    }
}
