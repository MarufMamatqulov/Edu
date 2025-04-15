<!-- src/main/webapp/app/entities/course/course-update.vue -->
<template>
  <div class="course-update-container">
    <h2>{{ courseId ? 'Kursni Tahrirlash' : 'Yangi Kurs Qo‘shish' }}</h2>
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="title">Kurs Nomi</label>
        <input v-model="course.title" id="title" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="description">Tavsif</label>
        <textarea v-model="course.description" id="description" class="form-control" rows="4"></textarea>
      </div>
      <div class="form-group">
        <label for="price">Narx (so‘m)</label>
        <input v-model.number="course.price" id="price" type="number" class="form-control" />
      </div>
      <div class="form-group">
        <label for="image">Kurs Rasmi</label>
        <input type="file" id="image" accept="image/*" @change="onFileChange" class="form-control" />
        <img v-if="course.imageUrl" :src="course.imageUrl" alt="Kurs Rasmi" class="preview-image mt-2" />
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isSaving">
        <font-awesome-icon icon="save" class="mr-2" />
        Saqlash
      </button>
      <router-link :to="{ name: 'AdminDashboard' }" class="btn btn-secondary ml-2"> Bekor Qilish </router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CourseService from '@/entities/course/course.service';
import { hasAnyAuthority } from '@/shared/auth/authority-utils';
import axios from 'axios';

export default defineComponent({
  name: 'CourseUpdate',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const courseService = new CourseService();
    const courseId = ref(route.params.courseId as string);
    const course = ref({ title: '', description: '', price: 0, imageUrl: '' });
    const isSaving = ref(false);
    const imageFile = ref<File | null>(null);

    const loadCourse = async () => {
      if (courseId.value) {
        try {
          const response = await courseService.find(courseId.value);
          course.value = response;
        } catch (error) {
          console.error('Error loading course:', error);
        }
      }
    };

    const onFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        imageFile.value = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          course.value.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(imageFile.value);
      }
    };

    const save = async () => {
      isSaving.value = true;
      try {
        const formData = new FormData();
        formData.append('title', course.value.title);
        if (course.value.description) formData.append('description', course.value.description);
        if (course.value.price) formData.append('price', course.value.price.toString());
        if (imageFile.value) formData.append('image', imageFile.value);

        const token = localStorage.getItem('jhi-authenticationToken');
        if (courseId.value) {
          await axios.put(`/api/courses/${courseId.value}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          alert('Kurs yangilandi!');
        } else {
          await axios.post('/api/courses', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          alert('Kurs qo‘shildi!');
        }
        router.push('/admin/dashboard');
      } catch (error) {
        console.error('Error saving course:', error);
        alert('Xato yuz berdi!');
      } finally {
        isSaving.value = false;
      }
    };

    onMounted(() => {
      const account = localStorage.getItem('jhi-authenticationToken') ? JSON.parse(localStorage.getItem('jhi-authenticationToken')) : null;
      if (!hasAnyAuthority(account?.authorities || [], ['ROLE_ADMIN'])) {
        router.push('/forbidden');
      }
      loadCourse();
    });

    return {
      course,
      courseId,
      isSaving,
      imageFile,
      onFileChange,
      save,
    };
  },
});
</script>

<style scoped>
.course-update-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.preview-image {
  max-width: 200px;
  height: auto;
  border-radius: 4px;
}

.ml-2 {
  margin-left: 0.5rem;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>
