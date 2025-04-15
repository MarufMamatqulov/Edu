<template>
  <div>
    <h2>Add Lesson to Course #{{ courseId }}</h2>
    <form @submit.prevent="save">
      <div class="field">
        <label>Title</label>
        <input v-model="lesson.title" required />
      </div>
      <div class="field">
        <label>Content Type</label>
        <select v-model="lesson.contentType" required>
          <option value="UPLOADED_VIDEO">Uploaded Video</option>
          <option value="YOUTUBE_VIDEO">YouTube Video</option>
          <option value="TEXT">Text</option>
        </select>
      </div>
      <div v-if="lesson.contentType === 'UPLOADED_VIDEO'" class="field">
        <label>Video File</label>
        <input type="file" @change="onFileChange" required />
      </div>
      <div v-else class="field">
        <label>Content</label>
        <input v-if="lesson.contentType === 'YOUTUBE_VIDEO'" v-model="lesson.content" placeholder="YouTube URL" required />
        <textarea v-if="lesson.contentType === 'TEXT'" v-model="lesson.content" required></textarea>
      </div>
      <button type="submit" :disabled="isSaving">Add Lesson</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CourseItemService from '@/entities/course-item/course-item.service';
import { ICourseItem } from '@/shared/model/course-item.model';

export default defineComponent({
  name: 'AddLesson',
  data() {
    return {
      lesson: { title: '', contentType: '', content: '' } as ICourseItem,
      file: null as File | null,
      isSaving: false,
      courseId: this.$route.params.courseId as string,
    };
  },
  methods: {
    onFileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) this.file = target.files[0];
    },
    async save() {
      this.isSaving = true;
      const formData = new FormData();
      formData.append('title', this.lesson.title);
      formData.append('contentType', this.lesson.contentType);
      if (this.lesson.contentType === 'UPLOADED_VIDEO' && this.file) {
        formData.append('file', this.file);
      } else {
        formData.append('content', this.lesson.content);
      }
      try {
        await CourseItemService.addLesson(this.courseId, formData);
        this.$toast.success('Lesson added!');
        this.$router.push(`/entity/course/${this.courseId}`);
      } catch (error) {
        this.$toast.error('Error adding lesson');
      } finally {
        this.isSaving = false;
      }
    },
  },
  inject: ['$toast'],
});
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}
</style>
