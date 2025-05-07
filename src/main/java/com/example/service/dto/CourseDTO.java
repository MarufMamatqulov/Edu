package com.example.service.dto;

import java.util.List;

public class CourseDTO {

    private Long id;
    private String title;
    private String description;
    private List<VideoDTO> videoLessons;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<VideoDTO> getVideoLessons() {
        return videoLessons;
    }

    public void setVideoLessons(List<VideoDTO> videoLessons) {
        this.videoLessons = videoLessons;
    }
}
