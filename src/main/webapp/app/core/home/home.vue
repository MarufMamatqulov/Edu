<!--<template>-->
<!--  <div class="home-container">-->
<!--    <div class="row">-->
<!--      <div class="col-md-12 text-center">-->
<!--        <h1 class="display-4" v-text="t$('home.title')"></h1>-->
<!--        <p class="lead" v-text="t$('home.subtitle')"></p>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; KURS KARTOCHKALARI &ndash;&gt;-->
<!--    <div class="course-card-list">-->
<!--      <div-->
<!--        v-for="course in courses"-->
<!--        :key="course.id"-->
<!--        class="course-card"-->
<!--      >-->
<!--        &lt;!&ndash; Rasmini ko‘rsatish (ixtiyoriy) &ndash;&gt;-->
<!--        <img-->
<!--          v-if="course.imageUrl"-->
<!--          :src="course.imageUrl"-->
<!--          class="course-image"-->
<!--          alt="Kurs rasm"-->
<!--        />-->

<!--        <div class="course-body">-->
<!--          <h3 class="course-title">{{ course.title }}</h3>-->
<!--          <p class="course-description">{{ course.description }}</p>-->
<!--          &lt;!&ndash; Narx yoki “Bepul” degan yozuv &ndash;&gt;-->
<!--          <p class="course-price">-->
<!--            {{ course.price && course.price > 0 ? (course.price + ' so‘m') : 'Bepul' }}-->
<!--          </p>-->
<!--        </div>-->

<!--        <button-->
<!--          class="course-start-button"-->
<!--          @click="goToCourseItems(course.id)"-->
<!--        >-->
<!--          Boshlash-->
<!--        </button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import { defineComponent, onMounted, ref } from 'vue';-->
<!--import CourseService from '@/entities/course/course.service';-->

<!--export default defineComponent({-->
<!--  name: 'Home',-->
<!--  setup() {-->
<!--    const courses = ref<any[]>([]);-->
<!--    const courseService = new CourseService();-->

<!--    // Sahifa yuklangandan so‘ng backenddan kurslar ro‘yxatini olish-->
<!--    onMounted(async () => {-->
<!--      try {-->
<!--        const response = await courseService.retrieve(); // /api/courses bo‘lishi kerak-->
<!--        courses.value = response.data;-->
<!--      } catch (error) {-->
<!--        console.error('Kurslarni olishda xatolik:', error);-->
<!--      }-->
<!--    });-->

<!--    // Boshlash tugmasini bosilganda kurs itemlari sahifasiga o‘tish-->
<!--    const goToCourseItems = (courseId: number) => {-->
<!--      // /course/:courseId/items ro‘yxatiga navigatsiya-->
<!--      window.location.href = `/course/${courseId}/items`;-->
<!--      // yoki vue-router bilan: this.$router.push({ name: 'CourseItems', params: { courseId } });-->
<!--    };-->

<!--    return {-->
<!--      courses,-->
<!--      goToCourseItems,-->
<!--    };-->
<!--  },-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--.home-container {-->
<!--  max-width: 1200px;-->
<!--  margin: 0 auto;-->
<!--  padding: 20px;-->
<!--}-->
<!--.course-card-list {-->
<!--  display: flex;-->
<!--  flex-wrap: wrap; /* bir qatorda sığmagan kartalar keyingi qatorga o‘tishi uchun */-->
<!--  gap: 20px;-->
<!--  justify-content: center; /* markazga jamlash */-->
<!--}-->
<!--.course-card {-->
<!--  width: 280px;-->
<!--  border: 1px solid #e0e0e0;-->
<!--  border-radius: 8px;-->
<!--  overflow: hidden;-->
<!--  background-color: #fff;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  justify-content: space-between;-->
<!--}-->
<!--.course-image {-->
<!--  width: 100%;-->
<!--  height: 160px;-->
<!--  object-fit: cover;-->
<!--}-->
<!--.course-body {-->
<!--  padding: 16px;-->
<!--}-->
<!--.course-title {-->
<!--  font-size: 1.2rem;-->
<!--  margin-bottom: 8px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--}-->
<!--.course-description {-->
<!--  font-size: 0.95rem;-->
<!--  color: #666;-->
<!--  margin-bottom: 12px;-->
<!--}-->
<!--.course-price {-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 12px;-->
<!--  color: #007bff;-->
<!--}-->
<!--.course-start-button {-->
<!--  border: none;-->
<!--  background-color: #007bff;-->
<!--  color: #fff;-->
<!--  padding: 12px;-->
<!--  font-size: 1rem;-->
<!--  cursor: pointer;-->
<!--  text-align: center;-->
<!--  width: 100%;-->
<!--  transition: background-color 0.3s ease;-->
<!--}-->
<!--.course-start-button:hover {-->
<!--  background-color: #0056b3;-->
<!--}-->
<!--</style>-->

<template>
  <div class="home-container">
    <!-- Header Section -->
    <div class="row">
      <div class="col-md-12 text-center">
        <h1 class="display-4" v-text="t$('home.title')"></h1>
        <p class="lead" v-text="t$('home.subtitle')"></p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center">
      <p>Loading courses...</p>
    </div>

    <!-- Course List -->
    <div v-else class="course-card-list">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <img v-if="course.imageUrl" :src="course.imageUrl" class="course-image" alt="Course Image" />
        <div class="course-body">
          <h3 class="course-title">{{ course.title }}</h3>
          <p class="course-description">{{ course.description }}</p>
          <p class="course-price">
            {{ course.price && course.price > 0 ? course.price + ' so‘m' : 'Bepul' }}
          </p>
        </div>
        <button class="course-start-button" @click="goToCourseItems(course.id)">Boshlash</button>
      </div>

      <!-- Fallback if no courses -->
      <p v-if="!courses.length" class="text-center no-courses">No courses available at the moment.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import CourseService from '@/entities/course/course.service';

export default defineComponent({
  name: 'Home',
  setup() {
    const courses = ref<any[]>([]);
    const loading = ref(true); // Add loading state
    const courseService = new CourseService();

    // Fetch courses on component mount
    onMounted(async () => {
      try {
        const response = await courseService.retrieve();
        console.log('API Response:', response); // Log the full response
        console.log('API Response Data:', response.data); // Log the data

        // Handle different possible response structures
        let fetchedCourses = [];
        if (Array.isArray(response.data)) {
          fetchedCourses = response.data;
        } else if (response.data && Array.isArray(response.data.courses)) {
          fetchedCourses = response.data.courses;
        } else {
          console.warn('Unexpected API response structure:', response.data);
        }

        // Map the data to ensure it matches the template
        courses.value = fetchedCourses.map(course => ({
          id: course.id,
          title: course.title || course.name || 'Untitled Course', // Fallback for title
          description: course.description || 'No description available',
          price: course.price || 0,
          imageUrl: course.imageUrl || course.image || null, // Fallback for image
        }));

        console.log('Mapped Courses:', courses.value); // Log the final courses array
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        loading.value = false; // Stop loading
      }
    });

    // Navigate to course items page
    const goToCourseItems = (courseId: number) => {
      window.location.href = `/course/${courseId}/items`;
    };

    return {
      courses,
      loading,
      goToCourseItems,
      t$: (key: string) => key, // Mock translation function (replace with your actual i18n setup)
    };
  },
});
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.course-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.course-card {
  width: 280px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.course-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.course-body {
  padding: 16px;
}

.course-title {
  font-size: 1.2rem;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.course-description {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 12px;
}

.course-price {
  font-weight: bold;
  margin-bottom: 12px;
  color: #007bff;
}

.course-start-button {
  border: none;
  background-color: #007bff;
  color: #fff;
  padding: 12px;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  width: 100%;
  transition: background-color 0.3s ease;
}

.course-start-button:hover {
  background-color: #0056b3;
}

.text-center {
  text-align: center;
}

.no-courses {
  font-size: 1.1rem;
  color: #666;
  margin-top: 20px;
}
</style>
