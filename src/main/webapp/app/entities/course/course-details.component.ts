import { type Ref, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import CourseService from './course.service';
import { type ICourse } from '@/shared/model/course.model';
import { useAlertService } from '@/shared/alert/alert.service';
import type { ICourseProgress } from '@/shared/model/course-progress.model.ts';
import type LessonProgressService from '@/entities/lesson-progress/lesson-progress.service.ts';

export class CourseDetailComponent {
  course: ICourse;
  progress: ICourseProgress;

  constructor(
    private courseService: CourseService,
    private lessonProgressService: LessonProgressService,
  ) {
    this.course = { id: 0, title: '', description: '' };
    this.progress = { id: 0, courseId: 0, completionPercentage: 0, itemsCompleted: [] };
  }

  loadCourse(courseId: number): void {
    this.courseService.find(courseId).subscribe(course => (this.course = course));
  }

  loadProgress(): void {
    this.lessonProgressService.getProgress(this.course.id).subscribe(progress => (this.progress = progress));
  }

  ngOnInit(): void {
    this.loadCourse(this.course.id);
    this.loadProgress();
  }

  markViewed(itemId: number): void {
    this.lessonProgressService.markViewed(this.course.id, itemId).subscribe(() => this.loadProgress());
  }
}

export class CourseDetailsComponent {
  course: ICourse;
  progress: ICourseProgress;

  constructor(
    private courseService: CourseService,
    private lessonProgressService: LessonProgressService,
  ) {
    this.course = { id: 0, title: '', description: '' };
    this.progress = { id: 0, courseId: 0, completionPercentage: 0, itemsCompleted: [] };
  }

  loadCourse(courseId: number): void {
    this.courseService.find(courseId).subscribe(course => (this.course = course));
  }

  ngOnInit(): void {
    const route = useRoute();
    if (route.params?.courseId) {
      this.loadCourse(route.params.courseId);
    }
    this.loadProgress();
  }

  loadProgress(): void {
    this.lessonProgressService.getProgress(this.course.id).subscribe(progress => (this.progress = progress));
  }

  markViewed(itemId: number): void {
    this.lessonProgressService.markViewed(this.course.id, itemId).subscribe(() => this.loadProgress());
  }
}

export class CourseDetailsComponent {
  course: ICourse;
  progress: ICourseProgress;

  constructor(
    private courseService: CourseService,
    private lessonProgressService: LessonProgressService,
  ) {
    this.course = { id: 0, title: '', description: '' };
    this.progress = { id: 0, courseId: 0, completionPercentage: 0, itemsCompleted: [] };
  }

  ngOnInit(): void {
    const route = useRoute();
    if (route.params?.courseId) {
      this.loadCourse(route.params.courseId);
    }
    this.loadProgress();
  }

  loadCourse(courseId: number): void {
    this.courseService.find(courseId).subscribe(course => (this.course = course));
  }

  constructor(
    private courseService: CourseService,
    private lessonProgressService: LessonProgressService,
  ) {}

  markViewed(itemId: number): void {
    this.lessonProgressService.markViewed(this.course.id, itemId).subscribe(() => this.loadProgress());
  }

  loadProgress(): void {
    this.courseService.getProgress(this.course.id).subscribe(progress => (this.progress = progress));
  }
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CourseDetails',
  setup() {
    const courseService = inject('courseService', () => new CourseService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const course: Ref<ICourse> = ref({});

    const retrieveCourse = async courseId => {
      try {
        const res = await courseService().find(courseId);
        course.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.courseId) {
      retrieveCourse(route.params.courseId);
    }

    return {
      alertService,
      course,

      previousState,
      t$: useI18n().t,
    };
  },
});
