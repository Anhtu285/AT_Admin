<script setup lang="ts">
import { ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
const collapsed = defineModel()
</script>
<template>
  <a-layout-header class="!bg-white flex gap-6 items-center justify-between !px-10 p-4 shadow-md">
    <div class="flex items-center gap-6 mb-0">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger text-xl"
        @click="() => (collapsed = !collapsed)"
      />
      <menu-fold-outlined v-else class="trigger text-xl" @click="() => (collapsed = !collapsed)" />

      <!-- Navigation Links -->
      <ul class="hidden md:flex items-center gap-4 mb-0">
        <li>
          <router-link
            to="/home"
            class="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            to="/about"
            class="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >About Us</router-link
          >
        </li>
      </ul>
    </div>
    <!-- Right Section: Icons and Links -->
    <div>
      <ul class="flex items-center gap-4 mb-0">
        <!-- Chat Icon with Badge -->
        <li class="relative">
          <a
            class="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
            href="#"
          >
            <i class="ri-question-answer-fill text-xl"></i>
            <span
              class="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs"
              >Chat</span
            >
          </a>
        </li>

        <!-- Notification Icon with Badge -->
        <li class="relative">
          <a
            class="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
            href="#"
          >
            <i class="ri-bell-fill text-xl"></i>
            <span
              class="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-yellow-500 text-white rounded-full px-2 py-0.5 text-xs"
              >15</span
            >
          </a>
        </li>

        <!-- Login Link -->
        <li>
          <router-link
            to="/login"
            class="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            <i class="ri-user-add-line text-xl"></i>Login
          </router-link>
        </li>
      </ul>
    </div>
  </a-layout-header>
</template>
