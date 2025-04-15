<!-- src/main/webapp/app/entities/course/add-test.vue -->
<template>
  <div class="add-test-container">
    <h2>Test Qo‘shish</h2>
    <form @submit.prevent="saveTest">
      <div class="form-group">
        <label for="title">Test Nomi</label>
        <input v-model="test.title" id="title" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="passingScore">O‘tish Balli</label>
        <input v-model.number="test.passingScore" id="passingScore" type="number" class="form-control" required />
      </div>

      <!-- Savollar ro'yxati -->
      <div class="questions-section">
        <h3>Savollar</h3>
        <div v-for="(question, index) in test.questions" :key="index" class="question-item">
          <div class="form-group">
            <label :for="'question-text-' + index">Savol Matni</label>
            <input v-model="question.text" :id="'question-text-' + index" class="form-control" required />
          </div>
          <div class="form-group">
            <label :for="'question-type-' + index">Savol Turi</label>
            <select v-model="question.type" :id="'question-type-' + index" class="form-control" required>
              <option value="SINGLE_CHOICE">Bitta Tanlov</option>
              <option value="MULTIPLE_CHOICE">Ko‘p Tanlov</option>
            </select>
          </div>
          <div class="form-group">
            <label :for="'question-options-' + index">Variantlar (vergul bilan ajratilgan)</label>
            <input
              v-model="question.options"
              :id="'question-options-' + index"
              class="form-control"
              placeholder="Variant 1, Variant 2, Variant 3, Variant 4"
              required
            />
          </div>
          <div class="form-group">
            <label :for="'correct-answer-' + index">To‘g‘ri Javob (variantlardan birini tanlang)</label>
            <select v-model="question.correctAnswer" :id="'correct-answer-' + index" class="form-control" required>
              <option v-for="option in getOptions(question)" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <button type="button" class="btn btn-danger btn-sm" @click="removeQuestion(index)">O‘chirish</button>
        </div>
        <button type="button" class="btn btn-secondary mt-2" @click="addQuestion">Yangi Savol Qo‘shish</button>
      </div>

      <button type="submit" class="btn btn-primary mt-3" :disabled="isSaving">
        <font-awesome-icon icon="save" class="mr-2" />
        Saqlash
      </button>
      <router-link :to="{ name: 'AdminDashboard' }" class="btn btn-secondary mt-3 ml-2"> Bekor Qilish </router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'AddTest',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const courseId = ref(route.params.courseId as string);
    const test = ref({
      title: '',
      passingScore: 0,
      questions: [] as any[],
    });
    const isSaving = ref(false);

    const addQuestion = () => {
      test.value.questions.push({ text: '', type: 'SINGLE_CHOICE', options: '', correctAnswer: '' });
    };

    const removeQuestion = (index: number) => {
      test.value.questions.splice(index, 1);
    };

    const getOptions = (question: any) => {
      return question.options ? question.options.split(',').map((opt: string) => opt.trim()) : [];
    };

    const saveTest = async () => {
      if (test.value.questions.length < 5) {
        alert('Kamida 5 ta savol qo‘shing!');
        return;
      }

      isSaving.value = true;
      try {
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
        await axios.post(
          `/api/courses/${courseId.value}/tests`,
          {
            title: test.value.title,
            passingScore: test.value.passingScore,
            questions: test.value.questions.map(q => ({
              text: q.text,
              type: q.type,
              options: q.options,
              correctAnswer: q.correctAnswer,
            })),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        alert('Test qo‘shildi!');
        router.push('/admin/dashboard');
      } catch (error) {
        console.error('Error adding test:', error);
        alert('Xato yuz berdi!');
      } finally {
        isSaving.value = false;
      }
    };

    return {
      test,
      isSaving,
      addQuestion,
      removeQuestion,
      getOptions,
      saveTest,
    };
  },
});
</script>

<style scoped>
.add-test-container {
  max-width: 800px;
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

.question-item {
  border: 1px solid #e0e0e0;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-3 {
  margin-top: 1rem;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
