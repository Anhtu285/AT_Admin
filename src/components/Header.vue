<script setup lang="ts">
// import { ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
const collapsed = defineModel()
</script>
<template>
  <a-layout-header class="!bg-white flex gap-6 items-center justify-between !px-10">
    <div class="flex items-center gap-6 mb-0">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger text-xl"
        @click="() => (collapsed = !collapsed)"
      />
      <menu-fold-outlined v-else class="trigger text-xl" @click="() => (collapsed = !collapsed)" />

      <ul class="flex items-center gap-6 mb-0">
        <li>
          <router-link to="home" class="">Home</router-link>
        </li>
        <li><router-link to="aboutus" class="boder-2">About Us</router-link></li>
      </ul>
    </div>
    <div class="">
      <ul class="flex items-center gap-6 mb-0">
        <li>
          <router-link to="" class="flex gap-2"><i class="ri-user-add-line"></i>Login</router-link>
        </li>
      </ul>
    </div>
  </a-layout-header>
</template>
