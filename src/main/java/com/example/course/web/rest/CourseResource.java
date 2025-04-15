// src/main/java/com/example/course/web/rest/CourseResource.java
package com.example.course.web.rest;

import com.example.course.domain.Course;
import com.example.course.domain.CourseProgress;
import com.example.course.repository.CourseProgressRepository;
import com.example.course.repository.CourseRepository;
import com.example.course.service.FileStorageService;
import com.example.course.service.UserService;
import com.example.course.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api")
@Transactional
public class CourseResource {

    private static final Logger LOG = LoggerFactory.getLogger(CourseResource.class);
    private static final String ENTITY_NAME = "course";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CourseRepository courseRepository;
    private final FileStorageService fileStorageService;
    private final UserService userService;
    private final CourseProgressRepository courseProgressRepository;

    public CourseResource(
        CourseRepository courseRepository,
        FileStorageService fileStorageService,
        UserService userService,
        CourseProgressRepository courseProgressRepository
    ) {
        this.courseRepository = courseRepository;
        this.courseProgressRepository = courseProgressRepository;

        this.fileStorageService = fileStorageService;
        this.userService = userService;
    }

    @PostMapping("/courses")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Course> createCourse(
        @RequestParam("title") String title,
        @RequestParam(value = "description", required = false) String description,
        @RequestParam(value = "price", required = false) Integer price,
        @RequestParam(value = "categoryId", required = false) Long categoryId,
        @RequestParam(value = "image", required = false) MultipartFile image
    ) throws URISyntaxException {
        LOG.debug("REST request to save Course : title={}, description={}, price={}, categoryId={}", title, description, price, categoryId);
        Course course = new Course();
        course.setTitle(title);
        course.setDescription(description);
        //        course.setPrice(price);
        course.setAuthor(
            userService
                .getUserWithAuthorities()
                .orElseThrow(() -> new BadRequestAlertException("User not found", ENTITY_NAME, "usernotfound"))
        );

        //        if (categoryId != null) {
        //            Category category = categoryRepository.findById(categoryId)
        //                .orElseThrow(() -> new BadRequestAlertException("Category not found", ENTITY_NAME, "categorynotfound"));
        //            course.setCategory(category);
        //        }
        //
        //        if (image != null && !image.isEmpty()) {
        //            String imageUrl = fileStorageService.storeFile(image);
        //            course.setImageUrl(imageUrl);
        //        }

        course = courseRepository.save(course);
        return ResponseEntity.created(new URI("/api/courses/" + course.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, course.getId().toString()))
            .body(course);
    }

    @PutMapping("/courses/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Course> updateCourse(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestParam("title") String title,
        @RequestParam(value = "description", required = false) String description,
        @RequestParam(value = "price", required = false) Integer price,
        @RequestParam(value = "categoryId", required = false) Long categoryId,
        @RequestParam(value = "image", required = false) MultipartFile image
    ) throws URISyntaxException {
        LOG.debug(
            "REST request to update Course : id={}, title={}, description={}, price={}, categoryId={}",
            id,
            title,
            description,
            price,
            categoryId
        );
        if (!courseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Course course = courseRepository.findById(id).get();
        course.setTitle(title);
        course.setDescription(description);
        //        course.setPrice(price);
        //
        //        if (categoryId != null) {
        //            Category category = categoryRepository.findById(categoryId)
        //                .orElseThrow(() -> new BadRequestAlertException("Category not found", ENTITY_NAME, "categorynotfound"));
        //            course.setCategory(category);
        //        }
        //
        //        if (image != null && !image.isEmpty()) {
        //            String imageUrl = fileStorageService.storeFile(image);
        //            course.setImageUrl(imageUrl);
        //        }

        course = courseRepository.save(course);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, course.getId().toString()))
            .body(course);
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        LOG.debug("REST request to get all Courses");
        List<Course> courses = courseRepository.findAll();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable Long id) {
        LOG.debug("REST request to get Course : {}", id);
        Optional<Course> course = courseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(course);
    }

    @GetMapping("/recommended")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<Course>> getRecommendedCourses() {
        LOG.debug("REST request to get recommended courses");
        Long userId = userService
            .getUserWithAuthorities()
            .orElseThrow(() -> new BadRequestAlertException("User not found", ENTITY_NAME, "usernotfound"))
            .getId();

        // Foydalanuvchi progressiga asoslangan kurslar
        List<CourseProgress> userProgress = courseProgressRepository.findByStudentId(userId);
        List<Long> completedCourseIds = userProgress
            .stream()
            .filter(CourseProgress::getIsCompleted)
            .map(progress -> progress.getCourse().getId())
            .toList();

        // Tavsiya qilinadigan kurslar (masalan, hali tugallanmagan kurslar)
        List<Course> recommendedCourses = courseRepository
            .findAll()
            .stream()
            .filter(course -> !completedCourseIds.contains(course.getId()))
            .limit(5) // Faqat 5 ta kursni tavsiya qilamiz
            .toList();

        return ResponseEntity.ok(recommendedCourses);
    }
}
