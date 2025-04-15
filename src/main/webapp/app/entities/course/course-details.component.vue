<template>
  <div>
    <h2>{{ course.title }}</h2>
    <p>Progress: {{ progress?.completedItems }} / {{ courseItems.length }} ({{ progressPercentage }}%)</p>
    <ul>
      <li v-for="item in courseItems" :key="item.id">
        {{ item.title }} ({{ item.itemType }})
        <button v-if="item.itemType === 'LESSON' && !isCompleted(item)" @click="markViewed(item.id)">Mark Viewed</button>
        <router-link v-if="item.itemType === 'TEST'" :to="`/entity/test-attempt/${item.id}`">Take Test</router-link>
      </li>
    </ul>
    <button v-if="progress?.isCompleted" @click="downloadCertificate">Download Certificate</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import CourseService from '@/entities/course/course.service';
import CourseItemService from '@/entities/course-item/course-item.service';
import LessonProgressService from '@/entities/lesson-progress/lesson-progress.service';
import CertificateService from '@/entities/certificate/certificate.service';
import type { ICourse, ICourseItem, ICourseProgress } from '@/shared/model/course.model';

export default defineComponent({
  name: 'CourseDetail',
  setup() {
    const route = useRoute();
    const courseService = new CourseService();
    const courseItemService = new CourseItemService();
    const lessonProgressService = new LessonProgressService();
    const certificateService = new CertificateService();

    const course = ref<ICourse>({ title: '', description: '' });
    const courseItems = ref<ICourseItem[]>([]);
    const progress = ref<ICourseProgress | null>(null);

    const progressPercentage = () => {
      return progress.value ? Math.round((progress.value.completedItems / courseItems.value.length) * 100) : 0;
    };

    const loadCourse = async () => {
      const courseId = route.params.id as string;
      try {
        course.value = await courseService.find(Number(courseId));
        console.log('Course:', course.value);
        courseItems.value = await courseItemService.findAllByCourse(Number(courseId));
        console.log('Course Items:', courseItems.value);
        const progressData = await lessonProgressService.getProgress(courseId);
        progress.value = progressData.length > 0 ? progressData[0] : null;
        console.log('Progress:', progress.value);
      } catch (error) {
        console.error('Error loading course:', error);
      }
    };

    const markViewed = async (itemId: number) => {
      try {
        await lessonProgressService.markViewed(Number(course.value.id), itemId);
        await loadCourse();
        // Assuming $toast is injected
        (window as any).$toast.success('Lesson marked as viewed');
      } catch (error) {
        console.error('Error marking lesson as viewed:', error);
        (window as any).$toast.error('Error marking lesson as viewed');
      }
    };

    const isCompleted = (item: ICourseItem) => {
      return progress.value && progress.value.completedItems > courseItems.value.indexOf(item);
    };

    const downloadCertificate = async () => {
      try {
        const blob = await certificateService.download(Number(course.value.id));
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'certificate.pdf';
        link.click();
      } catch (error) {
        console.error('Error downloading certificate:', error);
        (window as any).$toast.error('Error downloading certificate');
      }
    };

    loadCourse();

    return {
      course,
      courseItems,
      progress,
      progressPercentage,
      markViewed,
      isCompleted,
      downloadCertificate,
    };
  },
  inject: ['$toast'],
});
</script>
