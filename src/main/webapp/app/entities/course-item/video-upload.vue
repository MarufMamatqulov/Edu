<template>
  <div>
    <h3>Video yuklash</h3>
    <input type="file" @change="uploadVideo" />
    <p v-if="videoUrl">
      Yuklangan video URL: <a :href="videoUrl" target="_blank">{{ videoUrl }}</a>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoUrl: null,
    };
  },
  methods: {
    async uploadVideo(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await this.$axios.post('/api/upload-video', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.videoUrl = response.data;
      } catch (error) {
        console.error('Video yuklashda xatolik:', error);
      }
    },
  },
};
</script>
