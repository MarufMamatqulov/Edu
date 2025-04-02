<!-- src/main/webapp/app/entities/course-item/test-view.vue -->
<template>
  <div>
    <h2 id="test-heading" data-cy="TestHeading">
      <span v-text="$t('onlineCoursePlatformApp.test.title')"></span>
    </h2>

    <div v-if="isFetching" class="alert alert-info">
      <span v-text="$t('onlineCoursePlatformApp.test.loading')"></span>
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
          <span v-text="$t('onlineCoursePlatformApp.courseItem.passingScore')"></span>
        </dt>
        <dd>{{ courseItem.passingScore || '-' }}</dd>

        <dt>
          <span v-text="$t('onlineCoursePlatformApp.courseItem.course')"></span>
        </dt>
        <dd>{{ courseItem.course ? courseItem.course.title : '' }}</dd>
      </dl>

      <h3 v-if="questions && questions.length > 0" v-text="$t('onlineCoursePlatformApp.test.questions')"></h3>
      <div v-for="(question, index) in questions" :key="question.id">
        <p>{{ index + 1 }}. {{ question.text }}</p>
        <ul>
          <li v-for="(option, i) in JSON.parse(question.options)" :key="i">
            {{ option }}
          </li>
        </ul>
      </div>

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
  name: 'TestView',
  setup() {
    const { t: t$ } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const alertService = useAlertService();
    const courseItem = ref<any>(null);
    const questions = ref<any[]>([]);
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

    // Fetch questions for the test
    const retrieveQuestions = async () => {
      try {
        const response = await axios.get(`/api/questions?courseItemId=${itemId}`);
        console.log('Questions response:', response.data); // Debug: Log the response
        questions.value = response.data;
        console.log('Questions set to:', questions.value); // Debug: Confirm the ref is updated
      } catch (error) {
        console.error('Error fetching questions:', error); // Debug: Log any errors
        alertService.showHttpError(error.response);
      }
    };

    // Go back to the previous page
    const goBack = () => {
      router.go(-1);
    };

    onMounted(() => {
      console.log('TestView mounted'); // Debug: Confirm component is mounted
      retrieveCourseItem();
      retrieveQuestions();
    });

    return {
      courseItem,
      questions,
      isFetching,
      goBack,
      t$,
    };
  },
});
</script>
