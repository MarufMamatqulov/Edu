<!-- src/main/webapp/app/entities/course-item/lesson-view.vue -->
<template>
  <div>
    <h2 id="lesson-heading" data-cy="LessonHeading">
      <span v-text="$t('onlineCoursePlatformApp.lesson.title')"></span>
    </h2>

    <div v-if="isFetching" class="alert alert-info">
      <span v-text="$t('onlineCoursePlatformApp.lesson.loading')"></span>
    </div>

    <div v-else-if="courseItem">
      <dl class="row jh-entity-details">
        <dt>
          <span v-text="$t('onlineCoursePlatformApp.courseItem.title')"></span>
        </dt>
        <dd>{{ courseItem.title }}</dd>

        <dt>
          <span v-text="$t('onlineCoursePlatformApp.courseItem.itemType')"></span>
        </dt>
        <dd>{{ courseItem.itemType }}</dd>

        <dt>
          <span v-text="$t('onlineCoursePlatformApp.courseItem.contentType')"></span>
        </dt>
        <dd>{{ courseItem.contentType || '-' }}</dd>

        <dt>
          <span v-text="$t('onlineCoursePlatformApp.courseItem.content')"></span>
        </dt>
        <dd>{{ courseItem.content }}</dd>

        <dt>
          <span v-text="$t('onlineCoursePlatformApp.courseItem.course')"></span>
        </dt>
        <dd>{{ courseItem.course ? courseItem.course.title : '' }}</dd>
      </dl>

      <button type="button" class="btn btn-secondary" @click="goBack">
        <font-awesome-icon icon="arrow-left"></font-awesome-icon>
        <span v-text="$t('entity.action.back')"></span>
      </button>
    </div>

    <div v-else class="alert alert-warning">
      <span v-text="$t('onlineCoursePlatformApp.courseItem.notFound')"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  name: 'LessonView',
  setup() {
    const { t: t$ } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const alertService = useAlertService();
    const courseItem = ref<any>(null);
    const isFetching = ref(false);

    // Get the itemId from the route params
    const itemId = route.params.itemId;
    console.log('Item ID from route:', itemId); // Debug: Check if itemId is correct

    // Fetch the course item details
    const retrieveCourseItem = async () => {
      isFetching.value = true;
      try {
        const response = await axios.get(`/api/course-items/${itemId}`);
        console.log('CourseItem response:', response.data); // Debug: Log the response
        courseItem.value = response.data;
        console.log('CourseItem set to:', courseItem.value); // Debug: Confirm the ref is updated
      } catch (error) {
        console.error('Error fetching course item:', error); // Debug: Log any errors
        alertService.showHttpError(error.response);
      } finally {
        isFetching.value = false;
      }
    };

    // Go back to the previous page
    const goBack = () => {
      router.go(-1);
    };

    onMounted(() => {
      console.log('LessonView mounted'); // Debug: Confirm component is mounted
      retrieveCourseItem();
    });

    return {
      courseItem,
      isFetching,
      goBack,
      t$,
    };
  },
});
</script>
