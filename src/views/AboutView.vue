<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero section -->
    <section class="hero text-center mb-12">
      <!-- Logo -->
      <div class="logo-container">
        <img class="logo mx-auto mb-6" src="@/assets/images/logo_header.png" alt="Đại Nam University Logo" />
      </div>
      <!-- Hero content -->
      <div class="hero-content">
        <h1 class="hero-title text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Welcome to Đại Nam University Management System
        </h1>
        <p class="hero-description text-lg md:text-xl text-gray-600">
          Developed by <span class="highlight text-red-500 font-bold">Trần Anh Tú</span>
        </p>
      </div>
    </section>

    <!-- Features section -->
    <section class="features grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Features items -->
      <!-- Feature 1 -->
      <div class="feature bg-white p-6 rounded-lg shadow-lg">
        <h2 class="feature-title text-2xl font-semibold text-green-500 mb-3">Easy to Use</h2>
        <p class="feature-description text-gray-700">
          Our system is designed with <span class="highlight text-red-500 font-bold">user-friendly interfaces</span>,
          making it easy for both administrators and users to navigate and utilize.
        </p>
      </div>
      <!-- Feature 2 -->
      <div class="feature bg-white p-6 rounded-lg shadow-lg">
        <h2 class="feature-title text-2xl font-semibold text-green-500 mb-3">Comprehensive Management</h2>
        <p class="feature-description text-gray-700">
          Manage various aspects of the university including
          <span class="highlight text-red-500 font-bold">students, lecturers, courses, resources</span>, and more, all in
          one centralized system.
        </p>
      </div>
      <!-- Feature 3 -->
      <div class="feature bg-white p-6 rounded-lg shadow-lg">
        <h2 class="feature-title text-2xl font-semibold text-green-500 mb-3">Customizable</h2>
        <p class="feature-description text-gray-700">
          Tailor the system to fit the specific needs and requirements of Đại Nam University, with
          <span class="highlight text-red-500 font-bold">customizable features and functionalities</span>.
        </p>
      </div>
    </section>

    <!-- Registration form section -->
    <section class="registration-form my-8">
      <!-- Title -->
      <h2 class="text-center text-2xl font-bold text-blue-600 mb-4">Register via Email</h2>
      <!-- Form with border -->
      <div class="border border-gray-300 rounded-md p-6">
        <form class="max-w-lg mx-auto">
          <!-- Email input -->
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input id="email" type="email" placeholder="Enter your email address" class="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:border-blue-600" />
          </div>
          <!-- Submit button -->
          <button type="submit" class="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Register</button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Highlight text style */
.highlight {
  color: #e74c3c; /* Màu đỏ */
  font-weight: bold;
}

/* Custom input style */
input[type="email"] {
  transition: all 0.3s;
}

input[type="email"]:focus {
  border-color: #3498db; /* Màu xanh lam */
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2); /* Hiệu ứng focus */
}

/* Custom button style */
button[type="submit"] {
  transition: all 0.3s;
}

button[type="submit"]:hover {
  background-color: #2c3e50; /* Màu xanh đậm */
}
</style>
