import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import CourseItemService from './course-item.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import CourseService from '@/entities/course/course.service';
import { type ICourse } from '@/shared/model/course.model';
import { CourseItem, type ICourseItem } from '@/shared/model/course-item.model';
import { ItemType } from '@/shared/model/enumerations/item-type.model';
import { ContentType } from '@/shared/model/enumerations/content-type.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CourseItemUpdate',
  setup() {
    const courseItemService = inject('courseItemService', () => new CourseItemService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const courseItem: Ref<ICourseItem> = ref(new CourseItem());

    const courseService = inject('courseService', () => new CourseService());

    const courses: Ref<ICourse[]> = ref([]);
    const itemTypeValues: Ref<string[]> = ref(Object.keys(ItemType));
    const contentTypeValues: Ref<string[]> = ref(Object.keys(ContentType));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'uz-Latn-uz'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveCourseItem = async courseItemId => {
      try {
        const res = await courseItemService().find(courseItemId);
        courseItem.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.courseItemId) {
      retrieveCourseItem(route.params.courseItemId);
    }

    const initRelationships = () => {
      courseService()
        .retrieve()
        .then(res => {
          courses.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      title: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      itemType: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      contentType: {},
      content: {},
      passingScore: {},
      course: {},
    };
    const v$ = useVuelidate(validationRules, courseItem as any);
    v$.value.$validate();

    return {
      courseItemService,
      alertService,
      courseItem,
      previousState,
      itemTypeValues,
      contentTypeValues,
      isSaving,
      currentLanguage,
      courses,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.courseItem.id) {
        this.courseItemService()
          .update(this.courseItem)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('onlineCoursePlatformApp.courseItem.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.courseItemService()
          .create(this.courseItem)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('onlineCoursePlatformApp.courseItem.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
