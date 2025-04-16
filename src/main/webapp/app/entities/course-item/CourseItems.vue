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

<!-- src/main/webapp/app/entities/course-item/course-items.vue -->
<script lang="ts">
import { defineComponent, ref, onMounted, computed, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAlertService } from '@/shared/alert/alert.service';
import axios from '@/shared/config/axios';

export default defineComponent({
  name: 'CourseItems',
  setup() {
    const { t: t$ } = useI18n();
    const instance = getCurrentInstance();
    const i18n = instance?.proxy?.$i18n;
    const route = useRoute();
    const router = useRouter();
    const alertService = useAlertService();
    const items = ref<any[]>([]);
    const isFetching = ref(false);
    const courseId = ref(route.params.courseId);

    const retrieveCourseItems = async () => {
      isFetching.value = true;
      try {
        console.log('Fetching course items for courseId:', courseId.value);
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
        console.log('JWT Token:', token || 'No token found'); // Debug: Log token presence
        if (!token) {
          console.error('No JWT token found, redirecting to login...');
          router.push('/login');
          return;
        }
        const res = await axios.get(`/api/courses/${courseId.value}/items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Response data:', res.data);
        if (!Array.isArray(res.data)) {
          console.error('Response data is not an array:', res.data);
          items.value = [];
        } else {
          items.value = res.data;
        }
      } catch (err) {
        console.error('Error fetching course items:', err);
        if (err.response) {
          console.error('Error response status:', err.response.status);
          console.error('Error response data:', err.response.data);
          if (err.response.status === 401 || err.response.status === 403) {
            console.error('Unauthorized or Forbidden, redirecting to login...');
            localStorage.removeItem('jhi-authenticationToken');
            sessionStorage.removeItem('jhi-authenticationToken');
            router.push('/login');
            return;
          }
          alertService.showHttpError(err.response);
        } else {
          alertService.showError(t$('error.noResponse', { message: 'No response from server' }));
        }
      } finally {
        isFetching.value = false;
      }
    };

    const sortedItems = computed(() => {
      if (!Array.isArray(items.value)) return [];
      return [...items.value].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
    });

    const startItem = (item: any) => {
      if (item.itemType === 'LESSON') {
        router.push(`/course/${courseId.value}/lesson/${item.id}`);
      } else if (item.itemType === 'TEST') {
        router.push(`/course/${courseId.value}/test/${item.id}`);
      }
    };

    const getYouTubeThumbnail = (url: string): string => {
      try {
        const videoIdMatch = url.match(/(?:v=)([^&]+)/) || url.match(/(?:youtu\.be\/)([^?]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        if (!videoId) return '';
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      } catch (error) {
        console.error('Error parsing YouTube URL for thumbnail:', error);
        return '';
      }
    };

    onMounted(() => {
      console.log('CourseItems mounted');
      retrieveCourseItems();
    });

    return {
      items,
      sortedItems,
      isFetching,
      startItem,
      getYouTubeThumbnail,
      t$,
    };
  },
});
</script>
