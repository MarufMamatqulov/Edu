package com.example.course.web.rest;

import com.example.course.domain.TestAttempt;
import com.example.course.repository.TestAttemptRepository;
import com.example.course.service.TestAttemptService; // Added
import com.example.course.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // Added
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/test-attempts")
@Transactional
public class TestAttemptResource {

    private static final Logger LOG = LoggerFactory.getLogger(TestAttemptResource.class);
    private static final String ENTITY_NAME = "testAttempt";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TestAttemptRepository testAttemptRepository;
    private final TestAttemptService testAttemptService; // Added

    public TestAttemptResource(
        TestAttemptRepository testAttemptRepository,
        TestAttemptService testAttemptService // Added
    ) {
        this.testAttemptRepository = testAttemptRepository;
        this.testAttemptService = testAttemptService;
    }

    @PostMapping("")
    @PreAuthorize("hasAuthority('ROLE_USER')") // Restrict to students
    public ResponseEntity<TestAttempt> createTestAttempt(@RequestBody TestSubmissionRequest submission) throws URISyntaxException {
        LOG.debug("REST request to submit TestAttempt for courseItem: {}", submission.getCourseItemId());
        TestAttempt attempt = testAttemptService.evaluateTest(submission.getCourseItemId(), submission.getAnswers());
        return ResponseEntity.created(new URI("/api/test-attempts/" + attempt.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, attempt.getId().toString()))
            .body(attempt);
    }

    // Add this DTO
    public static class TestSubmissionRequest {

        private Long courseItemId;
        private Map<Long, List<String>> answers; // Question ID -> Selected options

        public Long getCourseItemId() {
            return courseItemId;
        }

        public void setCourseItemId(Long courseItemId) {
            this.courseItemId = courseItemId;
        }

        public Map<Long, List<String>> getAnswers() {
            return answers;
        }

        public void setAnswers(Map<Long, List<String>> answers) {
            this.answers = answers;
        }
    }

    // Other methods remain unchanged...

    /**
     * {@code PUT  /test-attempts/:id} : Updates an existing testAttempt.
     *
     * @param id the id of the testAttempt to save.
     * @param testAttempt the testAttempt to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated testAttempt,
     * or with status {@code 400 (Bad Request)} if the testAttempt is not valid,
     * or with status {@code 500 (Internal Server Error)} if the testAttempt couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TestAttempt> updateTestAttempt(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TestAttempt testAttempt
    ) throws URISyntaxException {
        LOG.debug("REST request to update TestAttempt : {}, {}", id, testAttempt);
        if (testAttempt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, testAttempt.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!testAttemptRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        testAttempt = testAttemptRepository.save(testAttempt);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, testAttempt.getId().toString()))
            .body(testAttempt);
    }

    /**
     * {@code PATCH  /test-attempts/:id} : Partial updates given fields of an existing testAttempt, field will ignore if it is null
     *
     * @param id the id of the testAttempt to save.
     * @param testAttempt the testAttempt to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated testAttempt,
     * or with status {@code 400 (Bad Request)} if the testAttempt is not valid,
     * or with status {@code 404 (Not Found)} if the testAttempt is not found,
     * or with status {@code 500 (Internal Server Error)} if the testAttempt couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TestAttempt> partialUpdateTestAttempt(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TestAttempt testAttempt
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update TestAttempt partially : {}, {}", id, testAttempt);
        if (testAttempt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, testAttempt.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!testAttemptRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TestAttempt> result = testAttemptRepository
            .findById(testAttempt.getId())
            .map(existingTestAttempt -> {
                if (testAttempt.getScore() != null) {
                    existingTestAttempt.setScore(testAttempt.getScore());
                }
                if (testAttempt.getPassed() != null) {
                    existingTestAttempt.setPassed(testAttempt.getPassed());
                }
                if (testAttempt.getAttemptDate() != null) {
                    existingTestAttempt.setAttemptDate(testAttempt.getAttemptDate());
                }

                return existingTestAttempt;
            })
            .map(testAttemptRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, testAttempt.getId().toString())
        );
    }

    /**
     * {@code GET  /test-attempts} : get all the testAttempts.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of testAttempts in body.
     */
    @GetMapping("")
    public List<TestAttempt> getAllTestAttempts(
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get all TestAttempts");
        if (eagerload) {
            return testAttemptRepository.findAllWithEagerRelationships();
        } else {
            return testAttemptRepository.findAll();
        }
    }

    /**
     * {@code GET  /test-attempts/:id} : get the "id" testAttempt.
     *
     * @param id the id of the testAttempt to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the testAttempt, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TestAttempt> getTestAttempt(@PathVariable("id") Long id) {
        LOG.debug("REST request to get TestAttempt : {}", id);
        Optional<TestAttempt> testAttempt = testAttemptRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(testAttempt);
    }

    /**
     * {@code DELETE  /test-attempts/:id} : delete the "id" testAttempt.
     *
     * @param id the id of the testAttempt to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestAttempt(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete TestAttempt : {}", id);
        testAttemptRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
