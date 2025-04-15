<!-- src/main/webapp/app/entities/student-dashboard.vue -->
<template>
  <div class="student-dashboard-container">
    <h1 class="dashboard-title">Talaba Dashboard</h1>
    <div class="points-section">
      <h3>Sizning Ballaringiz: {{ userPoints }}</h3>
    </div>

    <div class="courses-section">
      <h2>Kurslaringiz</h2>
      <div v-if="isFetching" class="alert alert-info">Yuklanmoqda...</div>
      <div v-else-if="courses.length > 0" class="course-list">
        <div v-for="course in courses" :key="course.id" class="course-card">
          <h3>{{ course.title }}</h3>
          <p>Progress: {{ course.progress?.completedItems || 0 }} / {{ course.items?.length || 0 }}</p>
          <router-link :to="{ name: 'CourseItems', params: { courseId: course.id } }" class="btn btn-primary btn-sm">
            Davom Ettirish
          </router-link>
          <button v-if="course.progress?.isCompleted" @click="downloadCertificate(course.id)" class="btn btn-success btn-sm ml-2">
            Sertifikatni Yuklash
          </button>
        </div>
      </div>
      <div v-else class="alert alert-warning">Kurslar topilmadi.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import CourseService from '@/entities/course/course.service';
import CertificateService from '@/entities/certificate/certificate.service';
import axios from 'axios';

export default defineComponent({
  name: 'StudentDashboard',
  setup() {
    const courses = ref<any[]>([]);
    const userPoints = ref(0);
    const isFetching = ref(false);
    const courseService = new CourseService();
    const certificateService = new CertificateService();

    const fetchUserPoints = async () => {
      try {
        const token = localStorage.getItem('jhi-authenticationToken');
        const response = await axios.get('/api/account', {
          headers: { Authorization: `Bearer ${token}` },
        });
        userPoints.value = response.data.points || 0;
      } catch (error) {
        console.error('Error fetching user points:', error);
      }
    };

    const fetchCourses = async () => {
      isFetching.value = true;
      try {
        const response = await courseService.retrieve();
        const fetchedCourses = response.data || [];
        for (const course of fetchedCourses) {
          const itemsResponse = await courseService.getItems(course.id);
          const progressResponse = await courseService.getProgress(course.id);
          course.items = itemsResponse || [];
          course.progress = progressResponse[0] || null;
        }
        courses.value = fetchedCourses;
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        isFetching.value = false;
      }
    };

    const downloadCertificate = async (courseId: string) => {
      try {
        const blob = await certificateService.download(courseId);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'certificate.pdf';
        link.click();
      } catch (error) {
        console.error('Error downloading certificate:', error);
        alert('Xato yuz berdi!');
      }
    };

    onMounted(() => {
      fetchUserPoints();
      fetchCourses();
    });

    return {
      courses,
      userPoints,
      isFetching,
      downloadCertificate,
    };
  },
});
</script>

<style scoped>
.points-section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.points-section h3 {
  font-size: 1.5rem;
  color: #007bff;
}
</style>
