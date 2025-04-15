<!-- src/main/webapp/app/entities/course-item/lesson-view.vue -->
<template>
  <div class="lesson-view-container">
    <!-- Back Button -->
    <button class="back-button" @click="goBack">
      <font-awesome-icon icon="arrow-left" class="mr-2" />
      <span v-text="$t('entity.action.back')"></span>
    </button>

    <!-- Header -->
    <h2 class="lesson-title" v-if="lesson">
      {{ lesson.title }}
    </h2>

    <!-- Loading State -->
    <div v-if="isFetching" class="loading-container">
      <div class="spinner"></div>
      <span class="loading-text" v-text="$t('onlineCoursePlatformApp.courseItem.home.loading')"></span>
    </div>

    <!-- Lesson Content -->
    <div v-else-if="lesson" class="lesson-card">
      <!-- Metadata -->
      <div class="lesson-meta">
        <span class="meta-item">
          <font-awesome-icon icon="play-circle" class="mr-1" />
          {{ lesson.itemType }}
        </span>
        <span class="meta-item">
          <font-awesome-icon icon="clock" class="mr-1" />
          {{ lessonDuration }}
        </span>
        <span class="meta-item" v-if="isViewed">
          <font-awesome-icon icon="check-circle" class="mr-1" style="color: #28a745" />
          {{ $t('onlineCoursePlatformApp.lesson.viewed') }}
        </span>
      </div>

      <!-- YouTube Video -->
      <div v-if="lesson.contentType === 'YOUTUBE_VIDEO'" class="video-wrapper">
        <iframe
          v-if="getYouTubeEmbedUrl(lesson.content)"
          :src="getYouTubeEmbedUrl(lesson.content)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="youtube-video"
        ></iframe>
        <p v-else class="invalid-video-url">YouTube video URL noto'g'ri: {{ lesson.content }}</p>
      </div>
      <!-- Text Content -->
      <div v-else class="text-content">
        {{ lesson.content }}
      </div>

      <!-- Mark as Viewed Button -->
      <button v-if="!isViewed" class="mark-viewed-button" @click="markAsViewed">
        <font-awesome-icon icon="check" class="mr-2" />
        <span v-text="$t('onlineCoursePlatformApp.lesson.markViewed')"></span>
      </button>

      <!-- Description (Optional) -->
      <div v-if="lesson.description" class="lesson-description">
        <h3 v-text="$t('onlineCoursePlatformApp.lesson.description')"></h3>
        <p>{{ lesson.description }}</p>
      </div>
    </div>

    <!-- Fallback if no lesson -->
    <div v-else class="no-lesson-container">
      <font-awesome-icon icon="exclamation-circle" class="no-lesson-icon" />
      <span class="no-lesson-text" v-text="$t('onlineCoursePlatformApp.lesson.notFound')"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAlertService } from '@/shared/alert/alert.service';
import axios from '@/shared/config/axios';

export default defineComponent({
  name: 'LessonView',
  setup() {
    const { t: t$ } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const alertService = useAlertService();
    const lesson = ref<any>(null);
    const isFetching = ref(false);
    const isViewed = ref(false);
    const courseId = ref(route.params.courseId);
    const itemId = ref(route.params.itemId);

    // Fetch lesson details
    const retrieveLesson = async () => {
      isFetching.value = true;
      try {
        console.log('Fetching lesson for courseId:', courseId.value, 'itemId:', itemId.value);
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
        console.log('JWT Token:', token);
        if (!token) {
          throw new Error('No JWT token found in localStorage or sessionStorage');
        }
        console.log('Making request to:', `http://localhost:7777/api/courses/${courseId.value}/items`);
        const res = await axios.get(`http://localhost:7777/api/courses/${courseId.value}/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Raw response:', res);
        console.log('Response status:', res.status);
        console.log('Response data:', res.data);
        if (!Array.isArray(res.data)) {
          console.error('Response data is not an array:', res.data);
          lesson.value = null;
        } else {
          // Find the item with the matching itemId
          const foundLesson = res.data.find((item: any) => item.id === parseInt(itemId.value as string));
          if (foundLesson && foundLesson.itemType === 'LESSON') {
            lesson.value = foundLesson;
            console.log('Lesson set to:', lesson.value);
            // Check if the lesson is viewed
            await checkLessonProgress();
          } else {
            console.error('Lesson not found or not a LESSON type:', foundLesson);
            lesson.value = null;
          }
        }
      } catch (err) {
        console.error('Error fetching lesson:', err);
        if (err.response && err.response.status === 401) {
          console.error('Token expired or invalid, redirecting to login...');
          localStorage.removeItem('jhi-authenticationToken');
          sessionStorage.removeItem('jhi-authenticationToken');
          router.push('/login');
        } else if (err.response) {
          console.error('Error response status:', err.response.status);
          console.error('Error response data:', err.response.data);
          alertService.showHttpError(err.response);
        } else if (err.request) {
          console.error('No response received:', err.request);
          alertService.showError(t$('error.noResponse', { message: 'No response from server' }));
        } else {
          console.error('Error setting up request:', err.message);
          alertService.showError(t$('error.requestSetup', { message: err.message }));
        }
      } finally {
        console.log('Fetch completed, isFetching:', isFetching.value);
        isFetching.value = false;
      }
    };

    // Check if the lesson has been viewed
    const checkLessonProgress = async () => {
      try {
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
        if (!token) return;
        const res = await axios.get(`http://localhost:7777/api/lesson-progresses?courseItemId=${itemId.value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Lesson progress response:', res.data);
        isViewed.value = (res.data.length > 0 && res.data[0].viewed) || false;
      } catch (err) {
        console.error('Error checking lesson progress:', err);
        isViewed.value = false;
      }
    };

    // Mark lesson as viewed
    const markAsViewed = async () => {
      try {
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
        if (!token) {
          throw new Error('No JWT token found in localStorage or sessionStorage');
        }
        await axios.post(
          `http://localhost:7777/api/lesson-progress`,
          {
            courseItemId: itemId.value,
            viewed: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        isViewed.value = true;
        alertService.showInfo(t$('onlineCoursePlatformApp.lesson.markedAsViewed'));
      } catch (err) {
        console.error('Error marking lesson as viewed:', err);
        alertService.showError(t$('error.markAsViewedFailed'));
      }
    };

    // Convert YouTube URL to embed URL
    const getYouTubeEmbedUrl = (url: string): string => {
      try {
        // URL’dan video ID’ni ajratish
        let videoIdMatch = url.match(/(?:v=)([^&]+)/) || url.match(/(?:youtu\.be\/)([^?]+)/);
        let videoId = videoIdMatch ? videoIdMatch[1] : null;

        // Agar video ID’da qo‘shimcha query parametrlarni olib tashlash kerak bo‘lsa
        if (videoId && videoId.includes('?')) {
          videoId = videoId.split('?')[0];
        }

        if (!videoId) {
          console.error('Invalid YouTube URL:', url);
          return '';
        }

        // To‘g‘ri embed URL qaytarish
        return `https://www.youtube.com/embed/${videoId}`;
      } catch (error) {
        console.error('Error parsing YouTube URL:', error);
        return '';
      }
    };

    // Go back to course items
    const goBack = () => {
      router.push(`/course/${courseId.value}/items`);
    };

    // Placeholder for lesson duration (you can fetch this from YouTube API if needed)
    const lessonDuration = computed(() => {
      return '10:00'; // Placeholder duration (e.g., 10 minutes)
    });

    onMounted(() => {
      console.log('LessonView mounted');
      retrieveLesson();
    });

    return {
      lesson,
      isFetching,
      isViewed,
      getYouTubeEmbedUrl,
      markAsViewed,
      goBack,
      lessonDuration,
      t$,
    };
  },
});
</script>

<style scoped>
/* General Container */
.lesson-view-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* Back Button */
.back-button {
  display: flex;
  align-items: center;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

.back-button:hover {
  background-color: #0056b3;
}

.back-button .mr-2 {
  margin-right: 8px;
}

/* Title */
.lesson-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-top: 15px;
  font-size: 1.2rem;
  color: #666;
}

/* Lesson Card */
.lesson-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.lesson-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Metadata */
.lesson-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: center;
}

.meta-item {
  font-size: 1rem;
  color: #666;
  display: flex;
  align-items: center;
}

.meta-item .mr-1 {
  margin-right: 5px;
  color: #007bff;
}

/* Video Wrapper */
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.youtube-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.invalid-video-url {
  font-size: 1rem;
  color: #dc3545;
  font-style: italic;
  text-align: center;
  margin-top: 20px;
}

/* Mark as Viewed Button */
.mark-viewed-button {
  display: flex;
  align-items: center;
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 20px auto;
  width: fit-content;
}

.mark-viewed-button:hover {
  background-color: #218838;
}

.mark-viewed-button .mr-2 {
  margin-right: 8px;
}

/* Text Content */
.text-content {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-top: 20px;
}

/* Description */
.lesson-description {
  margin-top: 30px;
}

.lesson-description h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}

.lesson-description p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

/* No Lesson State */
.no-lesson-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.no-lesson-icon {
  font-size: 3rem;
  color: #f39c12;
  margin-bottom: 15px;
}

.no-lesson-text {
  font-size: 1.2rem;
  color: #666;
}

/* Responsive Design */
@media (max-width: 768px) {
  .lesson-title {
    font-size: 2rem;
  }

  .lesson-card {
    padding: 20px;
  }

  .lesson-meta {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .lesson-title {
    font-size: 1.8rem;
  }

  .back-button {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
}
</style>
