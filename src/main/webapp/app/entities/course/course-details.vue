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
import { defineComponent } from 'vue';
import CourseService from '@/entities/course/course.service';
import LessonProgressService from '@/entities/lesson-progress/lesson-progress.service';
import CertificateService from '@/entities/certificate/certificate.service';
import { ICourse, ICourseItem, ICourseProgress } from '@/shared/model/course.model';

export default defineComponent({
  name: 'CourseDetail',
  data() {
    return {
      course: {} as ICourse,
      courseItems: [] as ICourseItem[],
      progress: null as ICourseProgress | null,
    };
  },
  created() {
    this.loadCourse();
  },
  computed: {
    progressPercentage() {
      return this.progress ? Math.round((this.progress.completedItems / this.courseItems.length) * 100) : 0;
    },
  },
  methods: {
    async loadCourse() {
      const courseId = this.$route.params.id as string;
      this.course = await CourseService.find(courseId);
      this.courseItems = await CourseService.getItems(courseId);
      const progressData = await CourseService.getProgress(courseId);
      this.progress = progressData.length > 0 ? progressData[0] : null;
    },
    async markViewed(itemId: number) {
      await LessonProgressService.markViewed(this.course.id, itemId);
      this.loadCourse();
      this.$toast.success('Lesson marked as viewed');
    },
    isCompleted(item: ICourseItem) {
      return this.progress && this.progress.completedItems > this.courseItems.indexOf(item);
    },
    async downloadCertificate() {
      const blob = await CertificateService.download(this.course.id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'certificate.pdf';
      link.click();
    },
  },
  inject: ['$toast'],
});
</script>
