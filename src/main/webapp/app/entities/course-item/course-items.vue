<template>
  <div>
    <h2 id="page-heading" data-cy="CourseItemsHeading">
      <span v-text="$t('onlineCoursePlatformApp.courseItem.home.title')"></span>
    </h2>

    <br />
    <!-- No items found message -->
    <div class="alert alert-warning" v-if="!isFetching && items && items.length === 0">
      <span v-text="$t('onlineCoursePlatformApp.courseItem.home.notFound')"></span>
    </div>

    <!-- Course items table -->
    <div class="table-responsive" v-else-if="items && items.length > 0">
      <table class="table table-striped" aria-describedby="courseItems">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')"></span></th>
            <th scope="row"><span v-text="$t('onlineCoursePlatformApp.courseItem.title')"></span></th>
            <th scope="row"><span v-text="$t('onlineCoursePlatformApp.courseItem.itemType')"></span></th>
            <th scope="row"><span v-text="$t('onlineCoursePlatformApp.courseItem.contentType')"></span></th>
            <th scope="row"><span v-text="$t('onlineCoursePlatformApp.courseItem.passingScore')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" data-cy="entityTable">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.itemType }}</td>
            <td>{{ item.contentType || '-' }}</td>
            <td>{{ item.passingScore || '-' }}</td>
            <td class="text-right">
              <div class="btn-group">
                <!-- Start button for the item -->
                <button class="btn btn-success btn-sm" @click="startItem(item)">
                  <font-awesome-icon icon="play"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.start')"></span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<!-- src/main/webapp/app/entities/course/course-items.vue -->
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  name: 'CourseItems',
  setup() {
    const { t: t$ } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const alertService = useAlertService();
    const items = ref<any[]>([]);
    const isFetching = ref(false);
    const courseId = ref(route.params.courseId);

    const retrieveCourseItems = async () => {
      isFetching.value = true;
      try {
        const res = await axios.get(`/api/courses/${courseId.value}/items`);
        items.value = res.data;
        console.log('Course items retrieved:', items.value); // Debug: Log the items
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const startItem = (item: any) => {
      console.log('Starting item:', item); // Debug: Log the item being started
      console.log('Course ID:', courseId.value); // Debug: Log the courseId
      if (item.itemType === 'LESSON') {
        console.log('Navigating to lesson:', `/course/${courseId.value}/lesson/${item.id}`); // Debug: Log the navigation path
        router.push(`/course/${courseId.value}/lesson/${item.id}`);
      } else if (item.itemType === 'TEST') {
        console.log('Navigating to test:', `/course/${courseId.value}/test/${item.id}`); // Debug: Log the navigation path
        router.push(`/course/${courseId.value}/test/${item.id}`);
      }
    };

    onMounted(() => {
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
