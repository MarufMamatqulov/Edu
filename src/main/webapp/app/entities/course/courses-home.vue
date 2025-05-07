<template>
  <div>
    <h1>Kurslar</h1>
    <div v-if="courses && courses.length > 0">
      <ul>
        <li v-for="course in courses" :key="course.id">
          <h2>{{ course.title }}</h2>
          <p>{{ course.description }}</p>
          <h3>Videolar:</h3>
          <ul>
            <li v-for="video in course.videoLessons" :key="video.id">
              <h4>{{ video.title }}</h4>
              <video controls width="100%">
                <source :src="video.videoUrl" type="video/mp4" />
                Video qo'llab-quvvatlanmaydi.
              </video>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Kurslar mavjud emas.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [],
    };
  },
  async mounted() {
    try {
      const response = await this.$axios.get('/api/courses-with-videos');
      this.courses = response.data;
    } catch (error) {
      console.error('Kurslarni yuklashda xatolik:', error);
    }
  },
};
</script>
