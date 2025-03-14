<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-logo">
          <img :src="ramzImage" alt="Platform Logo" class="logo" />
          <p>Empowering learners with AI-driven education solutions.</p>
        </div>
        <div class="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: marufbekofficial2@gmail.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Education St, Learning City</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} OnlineCoursePlatform. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import ramzImage from '/s/Edu/src/assets/images/ramz.png';

export default {
  name: 'JhiFooter',
  data() {
    return {
      ramzImage,
    };
  },
};
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: white;
  padding: 20px 0;
  text-align: center;
}

.container {
  width: 80%;
  margin: auto;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 20px;
  border-bottom: 1px solid #555;
}

.footer-logo {
  flex: 1;
  text-align: left;
}

.logo {
  width: 150px;
  margin-bottom: 10px;
}

.footer-links,
.footer-contact {
  flex: 1;
  text-align: left;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin: 5px 0;
}

.footer-links a {
  color: #f1c40f;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

.footer-bottom {
  margin-top: 20px;
  font-size: 14px;
}
</style>
