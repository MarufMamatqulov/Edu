<!-- src/main/webapp/app/entities/test-attempt/test-attempt.vue -->
<template>
  <div class="test-attempt-container">
    <h2>Test: {{ test?.title }}</h2>
    <div v-if="isFetching" class="alert alert-info text-center">Yuklanmoqda...</div>
    <div v-else-if="test" class="test-content">
      <div v-if="result" class="result-section">
        <h3>Natija</h3>
        <p>Umumiy ball: {{ result.score }} / {{ questions.length }}</p>
        <p :class="{ 'text-success': result.passed, 'text-danger': !result.passed }">
          {{ result.passed ? 'Muvaffaqiyatli yakunlandi!' : 'Muvaffaqiyatsiz yakunlandi.' }}
        </p>
        <canvas ref="resultChart" width="300" height="300"></canvas>
        <button @click="goBack" class="btn btn-primary mt-3">Orqaga</button>
      </div>
      <div v-else>
        <form @submit.prevent="submitTest">
          <div v-for="(question, index) in questions" :key="question.id" class="question-item">
            <h3>{{ index + 1 }}. {{ question.text }}</h3>
            <div v-if="question.type === 'SINGLE_CHOICE'">
              <div v-for="option in question.options.split(',').map((opt: string) => opt.trim())" :key="option" class="form-check">
                <input
                  type="radio"
                  :name="'question-' + question.id"
                  :value="option"
                  v-model="answers[question.id]"
                  class="form-check-input"
                  required
                />
                <label class="form-check-label">{{ option }}</label>
              </div>
            </div>
            <div v-else>
              <div v-for="option in question.options.split(',').map((opt: string) => opt.trim())" :key="option" class="form-check">
                <input
                  type="checkbox"
                  :name="'question-' + question.id"
                  :value="option"
                  v-model="answers[question.id]"
                  class="form-check-input"
                />
                <label class="form-check-label">{{ option }}</label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <font-awesome-icon icon="paper-plane" class="mr-2" />
            Yuborish
          </button>
        </form>
      </div>
    </div>
    <div v-else class="alert alert-warning text-center">Test topilmadi.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'TestAttempt',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const courseItemId = ref(route.params.courseItemId as string);
    const test = ref<any>(null);
    const questions = ref<any[]>([]);
    const answers = ref<any>({});
    const isFetching = ref(false);
    const isSubmitting = ref(false);
    const result = ref<any>(null);
    const resultChart = ref<HTMLCanvasElement | null>(null);

    const fetchTest = async () => {
      isFetching.value = true;
      try {
        const token = localStorage.getItem('jhi-authenticationToken');
        const testResponse = await axios.get(`/api/course-items/${courseItemId.value}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        test.value = testResponse.data;

        const questionsResponse = await axios.get(`/api/questions?courseItemId=${courseItemId.value}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        questions.value = questionsResponse.data || [];
        questions.value.forEach(q => {
          answers.value[q.id] = q.type === 'SINGLE_CHOICE' ? '' : [];
        });
      } catch (error) {
        console.error('Error fetching test:', error);
      } finally {
        isFetching.value = false;
      }
    };

    const submitTest = async () => {
      isSubmitting.value = true;
      try {
        const token = localStorage.getItem('jhi-authenticationToken');
        const formattedAnswers = Object.keys(answers.value).reduce((acc, key) => {
          acc[key] = Array.isArray(answers.value[key]) ? answers.value[key] : [answers.value[key]];
          return acc;
        }, {} as any);
        const response = await axios.post(
          '/api/test-attempts',
          { courseItemId: courseItemId.value, answers: formattedAnswers },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        result.value = response.data;
        renderResultChart();
      } catch (error) {
        console.error('Error submitting test:', error);
        alert('Xato yuz berdi!');
      } finally {
        isSubmitting.value = false;
      }
    };

    const renderResultChart = () => {
      if (resultChart.value && result.value) {
        const ctx = resultChart.value.getContext('2d');
        if (ctx) {
          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: ['To‘g‘ri javoblar', 'Noto‘g‘ri javoblar'],
              datasets: [
                {
                  data: [result.value.score, questions.value.length - result.value.score],
                  backgroundColor: ['#28a745', '#dc3545'],
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Test Natijalari',
                },
              },
            },
          });
        }
      }
    };

    const goBack = () => {
      router.push(`/course/${test.value.course.id}/items`);
    };

    onMounted(() => {
      fetchTest();
    });

    return {
      test,
      questions,
      answers,
      isFetching,
      isSubmitting,
      result,
      resultChart,
      submitTest,
      goBack,
    };
  },
});
</script>

<style scoped>
.test-attempt-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.test-content {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.question-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.form-check {
  margin-bottom: 10px;
}

.form-check-input {
  margin-right: 10px;
}

.form-check-label {
  font-size: 1rem;
}

.result-section {
  text-align: center;
}

.text-success {
  color: #28a745;
}

.text-danger {
  color: #dc3545;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
