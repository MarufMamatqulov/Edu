import type CourseService from '@/entities/course/course.service.ts';
import type { IQuestion } from '@/shared/model/question.model.ts';
import { ActivatedRoute } from '@angular/router';
import { window } from 'global';
export class TestCreateComponent {
  test: { title: string; passingScore: number; questions: IQuestion[] } = { title: '', passingScore: 0, questions: [] };
  courseId: string | null;

  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
  }

  addQuestion(): void {
    this.test.questions.push({ text: '', type: 'SINGLE_CHOICE', options: '' });
  }

  save(): void {
    this.courseService.createTest(this.courseId, this.test).subscribe(
      () => window.alert('Test added!'),
      () => window.alert('Error adding test'),
    );
  }
}
