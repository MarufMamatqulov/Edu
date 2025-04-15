package com.example.course.web.rest;

import com.example.course.domain.Course;
import com.example.course.domain.CourseItem;
import com.example.course.domain.enumeration.ContentType;
import com.example.course.domain.enumeration.ItemType;
import com.example.course.repository.CourseItemRepository;
import com.example.course.repository.CourseRepository;
import com.example.course.service.FileStorageService;
import com.example.course.service.UserService; // Added
import com.example.course.web.rest.errors.BadRequestAlertException;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.jhipster.web.util.HeaderUtil;

@RestController
@RequestMapping("/api")
public class CourseItemLessonResource {

    private static final Logger LOG = LoggerFactory.getLogger(CourseItemLessonResource.class);
    private static final String ENTITY_NAME = "courseItem";

    private final CourseRepository courseRepository;
    private final CourseItemRepository courseItemRepository;
    private final FileStorageService fileStorageService;
    private final UserService userService; // Added
    private final String applicationName = "onlineCoursePlatform";

    public CourseItemLessonResource(
        CourseRepository courseRepository,
        CourseItemRepository courseItemRepository,
        FileStorageService fileStorageService,
        UserService userService // Added
    ) {
        this.courseRepository = courseRepository;
        this.courseItemRepository = courseItemRepository;
        this.fileStorageService = fileStorageService;
        this.userService = userService;
    }

    @PostMapping("/courses/{courseId}/lessons")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<CourseItem> addLessonToCourse(
        @PathVariable Long courseId,
        @RequestParam("title") String title,
        @RequestParam("contentType") ContentType contentType,
        @RequestParam(value = "content", required = false) String content,
        @RequestParam(value = "file", required = false) MultipartFile file
    ) throws URISyntaxException, IOException {
        LOG.debug("REST request to add lesson to Course id: {}, title: {}, contentType: {}", courseId, title, contentType);

        Optional<Course> courseOpt = courseRepository.findById(courseId);
        if (!courseOpt.isPresent()) {
            throw new BadRequestAlertException("Course not found", "course", "notfound");
        }
        Course course = courseRepository
            .findById(courseId)
            .orElseThrow(() -> new BadRequestAlertException("Course not found", "course", "notfound"));
        if (
            !course
                .getAuthor()
                .getId()
                .equals(
                    userService
                        .getUserWithAuthorities()
                        .orElseThrow(() -> new BadRequestAlertException("User not found", ENTITY_NAME, "usernotfound"))
                        .getId()
                )
        ) {
            throw new BadRequestAlertException("Only the course author can add lessons", ENTITY_NAME, "notauthor");
        }

        CourseItem lesson = new CourseItem();
        lesson.setTitle(title);
        lesson.setItemType(ItemType.LESSON);
        lesson.setContentType(contentType);

        if (contentType == ContentType.UPLOADED_VIDEO) {
            if (file == null || file.isEmpty()) {
                throw new BadRequestAlertException("File must be provided for UPLOADED_VIDEO", ENTITY_NAME, "fileempty");
            }
            String fileUrl = fileStorageService.storeFile(file);
            lesson.setContent(fileUrl);
        } else if (contentType == ContentType.YOUTUBE_VIDEO) {
            if (content == null || content.trim().isEmpty()) {
                throw new BadRequestAlertException("YouTube link must be provided", ENTITY_NAME, "youtubeempty");
            }
            lesson.setContent(content);
        } else if (contentType == ContentType.TEXT) {
            if (content == null || content.trim().isEmpty()) {
                throw new BadRequestAlertException("Text content must be provided", ENTITY_NAME, "textempty");
            }
            lesson.setContent(content);
        } else {
            throw new BadRequestAlertException("Invalid content type", ENTITY_NAME, "invalidcontenttype");
        }

        lesson.setCourse(course);
        lesson = courseItemRepository.save(lesson);
        return ResponseEntity.created(new URI("/api/course-items/" + lesson.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, lesson.getId().toString()))
            .body(lesson);
    }
}
