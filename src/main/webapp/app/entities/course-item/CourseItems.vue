<!-- src/main/webapp/app/entities/course/course-items.vue -->
<template>
  <div>
    <h2 id="course-items-heading" data-cy="CourseItemsHeading">
      <span v-text="$t('onlineCoursePlatformApp.courseItem.home.title')"></span>
    </h2>

    <div v-if="isFetching" class="alert alert-info">
      <span v-text="$t('onlineCoursePlatformApp.courseItem.home.loading')"></span>
    </div>

    <div v-else-if="items && items.length > 0" class="table-responsive">
      <table class="table table-striped" aria-describedby="courseItems">
        <thead>
          <tr>
            <th scope="col">
              <span v-text="$t('onlineCoursePlatformApp.courseItem.title')"></span>
            </th>
            <th scope="col">
              <span v-text="$t('onlineCoursePlatformApp.courseItem.itemType')"></span>
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" data-cy="entityTable">
            <td>{{ item.title }}</td>
            <td>{{ item.itemType }}</td>
            <td class="text-right">
              <div class="btn-group">
                <button @click="startItem(item)" class="btn btn-primary btn-sm">
                  <font-awesome-icon icon="play"></font-awesome-icon>
                  <span v-text="$t('entity.action.start')"></span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="alert alert-warning" v-if="!isFetching && items && items.length === 0">
      <span v-text="$t('onlineCoursePlatformApp.courseItem.home.notFound')"></span>
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
  name: 'CourseItems',
  setup() {
    console.log('CourseItems setup started'); // Debug: Confirm setup is called
    const { t: t$ } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const alertService = useAlertService();
    const items = ref<any[]>([]);
    const isFetching = ref(false);
    const courseId = ref(route.params.courseId);

    console.log('Course ID from route:', courseId.value); // Debug: Log the courseId

    const retrieveCourseItems = async () => {
      console.log('retrieveCourseItems called'); // Debug: Confirm function is called
      isFetching.value = true;
      try {
        console.log('Fetching course items for courseId:', courseId.value);
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
        console.log('JWT Token:', token);
        if (!token) {
          throw new Error('No JWT token found in localStorage or sessionStorage');
        }
        const res = await axios.get(`/api/courses/${courseId.value}/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Course items response:', res);
        items.value = res.data;
        console.log('Items set to:', items.value);
      } catch (err) {
        console.error('Error fetching course items:', err);
        console.error('Error response:', err.response);
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const startItem = (item: any) => {
      console.log('Starting item:', item);
      console.log('Course ID:', courseId.value);
      if (item.itemType === 'LESSON') {
        console.log('Navigating to lesson:', `/course/${courseId.value}/lesson/${item.id}`);
        router.push(`/course/${courseId.value}/lesson/${item.id}`);
      } else if (item.itemType === 'TEST') {
        console.log('Navigating to test:', `/course/${courseId.value}/test/${item.id}`);
        router.push(`/course/${courseId.value}/test/${item.id}`);
      }
    };

    onMounted(() => {
      console.log('CourseItems mounted');
      retrieveCourseItems();
    });

    return {
      items,
      isFetching,
      startItem,
      t$,
    };
  },
});
</script>
