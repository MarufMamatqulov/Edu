<template>
  <div class="course-items-view-container">
    <h2 class="course-title">{{ courseTitle }}</h2>
    <div v-if="isFetching" class="alert alert-info text-center">Yuklanmoqda...</div>
    <div v-else-if="courseItems.length > 0" class="course-items-list">
      <div v-for="item in courseItems" :key="item.id" class="course-item">
        <h3>{{ item.title }}</h3>
        <div v-if="item.contentType === 'YOUTUBE_VIDEO'" class="video-wrapper">
          <iframe
            v-if="getYouTubeEmbedUrl(item.content)"
            :src="getYouTubeEmbedUrl(item.content)"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="youtube-video"
          ></iframe>
          <p v-else class="invalid-video-url">YouTube video URL noto'g'ri: {{ item.content }}</p>
        </div>
        <div v-else class="text-content">
          {{ item.content }}
        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning text-center">Kurs elementlari topilmadi.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'CourseItemsView',
  setup() {
    const route = useRoute();
    const courseId = ref(route.params.courseId);
    const courseTitle = ref('');
    const courseItems = ref<any[]>([]);
    const isFetching = ref(false);

    const fetchCourseItems = async () => {
      isFetching.value = true;
      try {
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
        if (!token) {
          throw new Error('No JWT token found');
        }
        const res = await axios.get(`/api/courses/${courseId.value}/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        courseItems.value = res.data;
        courseTitle.value = res.data.length > 0 ? res.data[0].course.title : 'Kurs';
      } catch (err) {
        console.error('Error fetching course items:', err);
      } finally {
        isFetching.value = false;
      }
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
      fetchCourseItems();
    });

    return {
      courseTitle,
      courseItems,
      isFetching,
      getYouTubeEmbedUrl,
    };
  },
});
</script>

<style scoped>
.course-items-view-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.course-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.course-item {
  margin-bottom: 20px;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
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

.text-content {
  font-size: 1rem;
  color: #333;
}

.text-center {
  text-align: center;
}
</style>
