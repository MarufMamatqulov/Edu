<!-- src/main/webapp/app/entities/course/test-view.vue -->
<template>
  <div class="test-view-container">
    <h2 class="test-title">{{ test?.title }}</h2>
    <div v-if="isFetching" class="alert alert-info text-center">Yuklanmoqda...</div>
    <div v-else-if="test" class="test-content">
      <div v-if="test.contentType === 'YOUTUBE_VIDEO'" class="video-wrapper">
        <iframe
          v-if="getYouTubeEmbedUrl(test.content)"
          :src="getYouTubeEmbedUrl(test.content)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="youtube-video"
        ></iframe>
        <p v-else class="invalid-video-url">YouTube video URL noto'g'ri: {{ test.content }}</p>
      </div>
      <div v-else class="text-content">
        {{ test.content }}
      </div>
      <div v-if="test.passingScore" class="passing-score">O'tish balli: {{ test.passingScore }}</div>
    </div>
    <div v-else class="alert alert-warning text-center">Test topilmadi.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'TestView',
  setup() {
    const route = useRoute();
    const test = ref<any>(null);
    const isFetching = ref(false);
    const courseId = ref(route.params.courseId);
    const itemId = ref(route.params.itemId);

    const fetchTest = async () => {
      isFetching.value = true;
      try {
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
        if (!token) {
          throw new Error('No JWT token found');
        }
        const res = await axios.get(`/api/course-items/${itemId.value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        test.value = res.data;
      } catch (err) {
        console.error('Error fetching test:', err);
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
      fetchTest();
    });

    return {
      test,
      isFetching,
      getYouTubeEmbedUrl,
    };
  },
});
</script>

<style scoped>
.test-view-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.test-title {
  font-size: 1.5rem;
  font-weight: bold;
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

.passing-score {
  margin-top: 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #007bff;
}

.text-center {
  text-align: center;
}
</style>
