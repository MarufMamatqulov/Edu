// src/main/java/com/example/course/service/TestAttemptService.java
package com.example.course.service;

import static com.example.course.domain.LessonProgress_.courseItem;

import com.example.course.domain.CourseItem;
import com.example.course.domain.Question;
import com.example.course.domain.TestAttempt;
import com.example.course.domain.User;
import com.example.course.domain.enumeration.QuestionType;
import com.example.course.repository.QuestionRepository;
import com.example.course.repository.TestAttemptRepository;
import com.example.course.web.rest.TestAttemptResource.TestSubmissionRequest;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TestAttemptService {

    private final TestAttemptRepository testAttemptRepository;
    private final QuestionRepository questionRepository;
    private final UserService userService;

    public TestAttemptService(TestAttemptRepository testAttemptRepository, QuestionRepository questionRepository, UserService userService) {
        this.testAttemptRepository = testAttemptRepository;
        this.questionRepository = questionRepository;
        this.userService = userService;
    }

    public TestAttempt evaluateTest(Long courseItemId, Map<Long, List<String>> answers) {
        TestAttempt attempt = new TestAttempt();
        attempt.setCourseItem((CourseItem) courseItem);
        User currentUser = userService.getUserWithAuthorities().orElseThrow();
        attempt.setStudent(currentUser);
        attempt.setAttemptDate(Instant.now());

        List<Question> questions = questionRepository.findByCourseItemId(courseItemId);
        int score = 0;

        for (Question question : questions) {
            List<String> userAnswers = answers.get(question.getId());
            if (userAnswers != null) {
                if (question.getType().equals(QuestionType.SINGLE_CHOICE)) {
                    if (userAnswers.size() == 1 && userAnswers.get(0).equals(question.getCorrectAnswer())) {
                        score++;
                    }
                } else if (question.getType().equals(QuestionType.MULTIPLE_CHOICE)) {
                    List<String> correctAnswers = List.of(question.getCorrectAnswer().split(","));
                    if (userAnswers.containsAll(correctAnswers) && correctAnswers.containsAll(userAnswers)) {
                        score++;
                    }
                }
            }
        }

        attempt.setScore(score);
        attempt.setPassed(score >= questions.size() * 0.7);

        // Ball qo'shish
        if (attempt.isPassed()) {
            currentUser.setPoints(currentUser.getPoints() + 50); // Testdan o'tsa 50 ball
        } else {
            currentUser.setPoints(currentUser.getPoints() + 20); // Testga urinsa 20 ball
        }
        userService.updateUser(currentUser);

        return testAttemptRepository.save(attempt);
    }
}
