<template>
  <div class="home">
    <section class="hero">
      <div class="logo-container">
        <img class="logo" src="@/assets/images/logo_header.png" alt="Đại Nam University Logo" />
      </div>

      <div class="hero-content">
        <h1 class="hero-title">Welcome to Đại Nam University Management System</h1>
        <p class="hero-description">Developed by <span class="highlight">Trần Anh Tú</span></p>
      </div>
    </section>

    <section class="features">
      <div class="feature">
        <h2 class="feature-title">Easy to Use</h2>
        <p class="feature-description">
          Our system is designed with <span class="highlight">user-friendly interfaces</span>,
          making it easy for both administrators and users to navigate and utilize.
        </p>
      </div>
      <div class="feature">
        <h2 class="feature-title">Comprehensive Management</h2>
        <p class="feature-description">
          Manage various aspects of the university including
          <span class="highlight">students, lecturers, courses, resources</span>, and more, all in
          one centralized system.
        </p>
      </div>
      <div class="feature">
        <h2 class="feature-title">Customizable</h2>
        <p class="feature-description">
          Tailor the system to fit the specific needs and requirements of Đại Nam University, with
          <span class="highlight">customizable features and functionalities</span>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9; /* Màu nền của trang */
}

.hero {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  display: block;
  margin: 0 auto 20px; /* Căn giữa logo */
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #3498db; /* Màu xanh lam */
}

.hero-description {
  font-size: 1.5rem;
  color: #555; /* Màu xám */
}

.features {
  display: flex;
  justify-content: space-between;
}

.feature {
  flex: 1;
  margin: 0 10px;
}

.feature-title {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #2ecc71; /* Màu xanh lá cây */
}

.feature-description {
  color: #444; /* Màu xám đậm */
  font-size: 1.2rem;
}

.highlight {
  color: #e74c3c; /* Màu đỏ */
  font-weight: bold;
}
</style>
