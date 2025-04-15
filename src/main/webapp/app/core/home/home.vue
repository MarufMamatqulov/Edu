<!-- src/main/webapp/app/core/home/home.vue -->
<template>
  <div class="home-container">
    <div class="row">
      <div class="col-md-12 text-center">
        <h1 class="display-4" v-text="t$('home.title')"></h1>
        <p class="lead" v-text="t$('home.subtitle')"></p>
      </div>
    </div>

    <!-- Qidiruv va Filtr -->
    <div class="search-filter-section mb-4">
      <div class="row">
        <div class="col-md-6">
          <input v-model="searchQuery" placeholder="Kurslarni qidirish..." class="form-control" @input="filterCourses" />
        </div>
        <div class="col-md-3">
          <select v-model="filterCategory" class="form-control" @change="filterCourses">
            <option value="">Barcha Kategoriyalar</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Dizayn">Dizayn</option>
          </select>
        </div>
        <div class="col-md-3">
          <select v-model="filterPrice" class="form-control" @change="filterCourses">
            <option value="">Barcha Narxlar</option>
            <option value="free">Bepul</option>
            <option value="paid">Pullik</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center">
      <p>Loading courses...</p>
    </div>

    <div v-else class="course-card-list">
      <div
        v-for="course in filteredCourses"
        :key="course.id"
        class="course-card"
        v-bind="course as { id: number; title: string; description: string; price: number; imageUrl: string | null }"
      >
        <img v-if="course.imageUrl" :src="course.imageUrl" class="course-image" :alt="course.title" />
        <div class="course-body">
          <h3 class="course-title">{{ course.title }}</h3>
          <p class="course-description">{{ course.description }}</p>
          <p class="course-price">
            {{ course.price && course.price > 0 ? course.price + ' so‘m' : 'Bepul' }}
          </p>
          <div v-if="course.items && course.items.length > 0" class="course-items">
            <h4>YouTube Videolar</h4>
            <div v-for="item in course.items.filter(item => item.contentType === 'YOUTUBE_VIDEO')" :key="item.id" class="course-item">
              <h5>{{ item.title }}</h5>
              <div v-if="getYouTubeEmbedUrl(item.content)" class="video-wrapper">
                <iframe
                  :src="getYouTubeEmbedUrl(item.content)"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="youtube-video"
                ></iframe>
              </div>
              <p v-else class="invalid-video-url">YouTube video URL noto'g'ri: {{ item.content }}</p>
            </div>
            <p v-if="!course.items.some(item => item.contentType === 'YOUTUBE_VIDEO')" class="no-videos">
              Ushbu kursda YouTube videolar mavjud emas.
            </p>
          </div>
          <div v-else class="no-videos">Ushbu kursda hech qanday elementlar mavjud emas.</div>
        </div>
        <button class="course-start-button" @click="goToCourseItems(course.id)">Boshlash</button>
      </div>
      <p v-if="!filteredCourses.length" class="text-center no-courses">No courses available at the moment.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import CourseService from '@/entities/course/course.service';
import axios from 'axios';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    const courses = ref<any[]>([]);
    const filteredCourses = ref<any[]>([]);
    const loading = ref(true);
    const courseService = new CourseService();
    const searchQuery = ref('');
    const filterCategory = ref('');
    const filterPrice = ref('');
    let stompClient: Client | null = null;

    const connectWebSocket = () => {
      const socket = new SockJS('http://localhost:7777/ws');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, () => {
        stompClient?.subscribe('/topic/notifications', message => {
          if (message.body) {
            alert(message.body);
            fetchCourses(); // Yangi kurs qo‘shilganda ro‘yxatni yangilash
          }
        });
      });
    };

    const fetchCourses = async () => {
      loading.value = true;
      try {
        const response = await courseService.retrieve();
        let fetchedCourses = [];
        if (Array.isArray(response.data)) {
          fetchedCourses = response.data;
        } else if (response.data && Array.isArray(response.data.courses)) {
          fetchedCourses = response.data.courses;
        } else {
          console.warn('Unexpected API response structure:', response.data);
        }
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
        if (!token) {
          console.error('No JWT token found. Please log in.');
          loading.value = false;
          return;
        }
        for (const course of fetchedCourses) {
          try {
            const itemsResponse = await axios.get(`/api/courses/${course.id}/items`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            course.items = itemsResponse.data;
            course.category = course.category || 'IT';
          } catch (error) {
            console.error(`Error fetching items for course ${course.id}:`, error);
            course.items = [];
          }
        }
        courses.value = fetchedCourses.map(course => ({
          id: course.id,
          title: course.title || course.name || 'Untitled Course',
          description: course.description || 'No description available',
          price: course.price || 0,
          imageUrl: course.imageUrl || course.image || null,
          items: course.items || [],
          category: course.category || 'IT',
        }));
        filteredCourses.value = courses.value;
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        loading.value = false;
      }
    };

    const filterCourses = () => {
      filteredCourses.value = courses.value.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = filterCategory.value ? course.category === filterCategory.value : true;
        const matchesPrice = filterPrice.value ? (filterPrice.value === 'free' ? course.price === 0 : course.price > 0) : true;
        return matchesSearch && matchesCategory && matchesPrice;
      });
    };

    const goToCourseItems = (courseId: number) => {
      router.push(`/course/${courseId}/items`);
    };

    const getYouTubeEmbedUrl = (url: string): string => {
      try {
        const videoIdMatch = url.match(/(?:v=)([^&]+)/) || url.match(/(?:youtu\.be\/)([^?]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        if (!videoId) {
          console.error('Invalid YouTube URL:', url);
          return '';
        }
        return `https://www.youtube.com/embed/${videoId}`;
      } catch (error) {
        console.error('Error parsing YouTube URL:', error);
        return '';
      }
    };

    onMounted(() => {
      fetchCourses();
      connectWebSocket();
    });

    onUnmounted(() => {
      if (stompClient) {
        stompClient.disconnect();
      }
    });

    return {
      courses,
      filteredCourses,
      loading,
      searchQuery,
      filterCategory,
      filterPrice,
      filterCourses,
      goToCourseItems,
      getYouTubeEmbedUrl,
      t$: (key: string) => key,
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

.course-items {
  margin-top: 12px;
}

.course-item {
  margin-bottom: 16px;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

.youtube-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.invalid-video-url {
  font-size: 0.9rem;
  color: #dc3545;
  font-style: italic;
}

.no-videos {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
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
