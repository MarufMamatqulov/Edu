package com.example.web.rest;

import com.example.repository.CourseRepository;
import com.example.service.dto.CourseDTO;
import com.example.service.dto.VideoDTO;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CourseResource {

    private final CourseRepository courseRepository;

    public CourseResource(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping("/courses-with-videos")
    public ResponseEntity<List<CourseDTO>> getCoursesWithVideos() {
        List<CourseDTO> courseDTOs = courseRepository
            .findAllWithVideos()
            .stream()
            .map(course -> {
                CourseDTO dto = new CourseDTO();
                dto.setId(course.getId());
                dto.setTitle(course.getTitle());
                dto.setDescription(course.getDescription());
                dto.setVideoLessons(
                    course
                        .getVideoLessons()
                        .stream()
                        .map(video -> {
                            VideoDTO videoDTO = new VideoDTO();
                            videoDTO.setId(video.getId());
                            videoDTO.setTitle(video.getTitle());
                            videoDTO.setVideoUrl(video.getVideoUrl());
                            return videoDTO;
                        })
                        .collect(Collectors.toList())
                );
                return dto;
            })
            .collect(Collectors.toList());
        return ResponseEntity.ok(courseDTOs);
    }
}
