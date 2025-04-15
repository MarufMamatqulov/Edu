<!-- src/main/webapp/app/entities/leaderboard.vue -->
<template>
  <div class="leaderboard-container">
    <h2 class="page-title">Reyting Jadvali</h2>
    <div v-if="isFetching" class="alert alert-info text-center">Yuklanmoqda...</div>
    <div v-else-if="users.length > 0" class="leaderboard-table">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Foydalanuvchi</th>
            <th>Ball</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.firstName }} {{ user.lastName }}</td>
            <td>{{ user.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="alert alert-warning text-center">Foydalanuvchilar topilmadi.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Leaderboard',
  setup() {
    const users = ref<any[]>([]);
    const isFetching = ref(false);

    const fetchLeaderboard = async () => {
      isFetching.value = true;
      try {
        const token = localStorage.getItem('jhi-authenticationToken');
        const response = await axios.get('/api/users/leaderboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        users.value = response.data || [];
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        isFetching.value = false;
      }
    };

    onMounted(() => {
      fetchLeaderboard();
    });

    return {
      users,
      isFetching,
    };
  },
});
</script>

<style scoped>
.leaderboard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}

.leaderboard-table {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.table {
  width: 100%;
  margin-bottom: 0;
}

.table th,
.table td {
  padding: 12px;
  text-align: center;
}

.table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.text-center {
  text-align: center;
}
</style>
