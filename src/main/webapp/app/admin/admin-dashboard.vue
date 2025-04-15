<!-- src/main/webapp/app/admin/admin-dashboard.vue -->
<template>
  <div class="admin-dashboard-container">
    <h1 class="dashboard-title">Admin Dashboard</h1>

    <!-- Kurs qo'shish tugmasi -->
    <router-link :to="{ name: 'CourseCreate' }" class="btn btn-primary mb-3">
      <font-awesome-icon icon="plus" class="mr-2" />
      Yangi Kurs Qo'shish
    </router-link>

    <!-- Test qo'shish tugmasi -->
    <router-link :to="{ name: 'AddTest' }" class="btn btn-primary mb-3 ml-3">
      <font-awesome-icon icon="plus" class="mr-2" />
      Yangi Test Qo'shish
    </router-link>

    <!-- Kurslar ro'yxati -->
    <div class="courses-section">
      <h2>Kurslar</h2>
      <div v-if="isFetching" class="alert alert-info">Yuklanmoqda...</div>
      <div v-else-if="courses.length > 0" class="course-list">
        <div v-for="course in courses" :key="course.id" class="course-card">
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
          <router-link :to="{ name: 'AddLesson', params: { courseId: course.id } }" class="btn btn-secondary btn-sm">
            Dars Qo'shish
          </router-link>
          <router-link :to="{ name: 'AddTest', params: { courseId: course.id } }" class="btn btn-secondary btn-sm ml-2">
            Test Qo'shish
          </router-link>
        </div>
      </div>
      <div v-else class="alert alert-warning">Kurslar topilmadi.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import CourseService from '@/entities/course/course.service';

export default defineComponent({
  name: 'AdminDashboard',
  setup() {
    const courses = ref<any[]>([]);
    const isFetching = ref(false);
    const courseService = new CourseService();

    const fetchCourses = async () => {
      isFetching.value = true;
      try {
        const response = await courseService.retrieve();
        courses.value = response.data || [];
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        isFetching.value = false;
      }
    };

    onMounted(() => {
      fetchCourses();
    });

    return {
      courses,
      isFetching,
    };
  },
});
</script>

<style scoped>
.admin-dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.course-card {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.course-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.course-card p {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 15px;
}

.mb-3 {
  margin-bottom: 1rem;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
