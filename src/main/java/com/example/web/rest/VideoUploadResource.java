package com.example.web.rest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class VideoUploadResource {

    private final Logger log = LoggerFactory.getLogger(VideoUploadResource.class);

    private static final String VIDEO_DIRECTORY = "src/main/resources/static/videos/";

    @PostMapping("/upload-video")
    public ResponseEntity<Map<String, String>> uploadVideo(@RequestParam("file") MultipartFile file) {
        log.debug("REST request to upload video: {}", file.getOriginalFilename());
        try {
            // Faylni saqlash
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Path.of(VIDEO_DIRECTORY, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            // URL manzilni qaytarish
            String videoUrl = "/videos/" + fileName;
            Map<String, String> response = new HashMap<>();
            response.put("url", videoUrl);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            log.error("Failed to upload video", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to upload video");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
