<template>
  <section class="bg-gray-100 w-full h-screen flex items-center justify-center">
    <div class="bg-white w-full max-w-md rounded-lg shadow-lg p-6 mx-4 flex flex-col items-center">
      <img :src="img" alt="Logo" class="w-24 h-24 object-cover rounded-full mb-4" />

      <h1 class="text-2xl font-bold mb-6">Đăng Nhập</h1>

      <form @submit.prevent="handleLogin" class="w-full">
        <div class="mb-4">
          <!-- <label for="userType" class="block text-gray-700 font-medium mb-2">Bạn là:</label> -->
          <select
            id="userType"
            v-model="userType"
            class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="student">Sinh viên</option>
            <option value="teacher">Giảng viên</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>

        <div class="mb-4 relative">
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder=" "
            class="block w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
          />
          <label
            for="username"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 duration-200 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-blue-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
            ><i class="ri-user-line mr-2"></i> Username</label
          >
        </div>

        <div class="mb-4 relative">
          <input
            :type="passwordType ? 'password' : 'text'"
            id="password"
            v-model="password"
            placeholder=" "
            class="block w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
          />
          <label
            for="password"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 duration-200 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-blue-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
            ><i class="ri-key-fill mr-2"></i> Password</label
          >

          <button
            type="button"
            class="absolute top-1/2 right-3 transform -translate-y-1/2"
            @click="passwordType = !passwordType"
          >
            <i class="ri-eye-close-line" v-if="passwordType"></i>
            <i class="ri-eye-line" v-else></i>
          </button>
        </div>

        <div class="mb-6 text-right">
          <a href="#" class="text-blue-500 hover:underline">Forgot Password?</a>
        </div>

        <div class="flex gap-4">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            Login
          </button>
          <button
            type="button"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full"
            @click="handleExit"
          >
            Exit
          </button>
        </div>

        <div class="mt-4 flex justify-center">
          <router-link to="/register" class="text-blue-500 hover:underline">
            Chưa có tài khoản? Đăng ký
          </router-link>
        </div>

        <div v-if="error" class="mt-4 text-red-500">
          {{ error }}
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import img from '@/assets/images/_636903097234341637.png'

const username = ref('')
const password = ref('')
const userType = ref('student')
const passwordType = ref(true)
const error = ref('')

const handleLogin = async () => {
  error.value = ''

  try {
    const response = await axios.post('/api/login', {
      username: username.value,
      password: password.value,
      userType: userType.value
    })

    if (response.data.success) {
      // Xử lý khi đăng nhập thành công
      window.location.href = '/dashboard'
    } else {
      error.value = 'Tên đăng nhập hoặc mật khẩu không đúng'
    }
  } catch (err) {
    error.value = 'Có lỗi xảy ra. Vui lòng thử lại'
  }
}

const handleExit = () => {
  window.location.href = '/'
}
</script>

<style scoped>
section {
  font-family: 'Inter', sans-serif;
}

label {
  background: white;
  padding: 0 0.25rem;
}

input:focus + label,
input:not(:placeholder-shown) + label {
  top: -0.75rem;
  left: 0.75rem;
  font-size: 0.75rem;
  color: #3b82f6;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>
