<template>
  <div class="home row">
    <!--    <div class="col-md-3">-->
    <!--      <span class="hipster img-fluid rounded"></span>-->
    <!--    </div>-->
    <div class="col-md-9">
      <h1 class="display-4" v-text="t$('home.title')"></h1>
      <p class="lead" v-text="t$('home.subtitle')"></p>

      <div>
        <div class="alert alert-success" v-if="authenticated">
          <span v-if="username" v-text="t$('home.logged.message', { username: username })"></span>
        </div>

        <div class="alert alert-warning" v-if="!authenticated">
          <span v-text="t$('global.messages.info.authenticated.prefix')"></span>
          <a class="alert-link" @click="openLogin()" v-text="t$('global.messages.info.authenticated.link')"></a
          ><span v-html="t$('global.messages.info.authenticated.suffix')"></span>
        </div>
        <div class="alert alert-warning" v-if="!authenticated">
          <span v-text="t$('global.messages.info.register.noaccount')"></span>&nbsp;
          <router-link class="alert-link" to="/register" v-text="t$('global.messages.info.register.link')"></router-link>
        </div>
      </div>

      <p v-text="t$('home.question')"></p>

      <!--      <ul>-->
      <!--        <li><a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer" v-text="t$('home.link.homepage')"></a></li>-->
      <!--        <li>-->
      <!--          <a-->
      <!--            href="https://stackoverflow.com/tags/jhipster/info"-->
      <!--            target="_blank"-->
      <!--            rel="noopener noreferrer"-->
      <!--            v-text="t$('home.link.stackoverflow')"-->
      <!--          ></a>-->
      <!--        </li>-->
      <!--        <li>-->
      <!--          <a-->
      <!--            href="https://github.com/jhipster/generator-jhipster/issues?state=open"-->
      <!--            target="_blank"-->
      <!--            rel="noopener noreferrer"-->
      <!--            v-text="t$('home.link.bugtracker')"-->
      <!--          ></a>-->
      <!--        </li>-->
      <!--        <li>-->
      <!--          <a-->
      <!--            href="https://gitter.im/jhipster/generator-jhipster"-->
      <!--            target="_blank"-->
      <!--            rel="noopener noreferrer"-->
      <!--            v-text="t$('home.link.chat')"-->
      <!--          ></a>-->
      <!--        </li>-->
      <!--        <li>-->
      <!--          <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer" v-text="t$('home.link.follow')"></a>-->
      <!--        </li>-->
      <!--      </ul>-->

      <!--      <p>-->
      <!--        <span v-text="t$('home.like')"></span>-->
      <!--        <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer" v-text="t$('home.github')"></a>!-->
      <!--      </p>-->
    </div>
  </div>
  <!-- Yangi hero-seksiya -->
  <div class="hero-writing-exam">
    <h1 class="hero-title">Mock English Exam for writing.</h1>
    <p class="hero-subtitle">Take your AI Powered IELTS Writing Task 2!</p>
    <!-- Tugma bosilganda http://localhost:5173/ sahifasiga o‘tadi -->
    <a href="http://localhost:5173/" class="hero-button">Take the Test</a>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
<style scoped>
/* Minimal uslub, siz xohlagan ranglarga o‘zgartirishingiz mumkin */
.hero-writing-exam {
  background-color: #e0e0e0; /* Kulrang fon */
  padding: 80px 20px; /* Yuqori/pastki va chap/o‘ng tomondan bo‘sh joy */
  text-align: center; /* Matnni markazga joylashtirish */
  font-family: Arial, sans-serif;
  border-bottom: 1px solid #ccc; /* Quyi chiziq (ixtiyoriy) */
}

.hero-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.hero-subtitle {
  font-size: 1rem;
  margin-bottom: 30px;
  line-height: 1.5;
  color: #555;
  max-width: 600px;
  margin: 0 auto 30px; /* Markazga joylash va pastda bo‘sh joy */
}

.hero-button {
  background-color: #333;
  color: #fff;
  padding: 12px 24px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none; /* router-link da default decoration bo‘lmasligi uchun */
  transition: background-color 0.3s ease;
  border-radius: 4px; /* Tugmani burchaklarini yumaloqroq qilish */
}

.hero-button:hover {
  background-color: #555;
}
</style>
