<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue'
const collapsed = defineModel()
const selectedKeys = ref<string[]>(['1'])
</script>

<template>
  <a-layout-sider
    background-color="#a0aec0"
    width="250"
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    class="custom-sider"
    :class="{ collapsed: collapsed }"
  >
    <figure class="logo p-[1px]">
      <img
        class="w-full h-full object-cover"
        src="../assets/images/_636903097234341637.png"
        alt="Logo"
      />
    </figure>

    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" class="custom-menu">
      <a-sub-menu key="sub1">
        <template #title>
          <i class="ri-bar-chart-grouped-fill"></i>
          <span class="ml-[10px]" v-if="!collapsed">Dashboard</span>
        </template>
        <a-menu-item key="1"><i class="ri-bar-chart-grouped-fill"></i> Dashboard lv1</a-menu-item>
        <a-menu-item key="2"><i class="ri-bar-chart-grouped-fill"></i> Dashboard lv2</a-menu-item>
        <a-menu-item key="3"><i class="ri-bar-chart-grouped-fill"></i> Dashboard lv3</a-menu-item>
      </a-sub-menu>

      <a-menu-item key="sub2" title="Lecturers Management">
        <i class="ri-user-5-fill"></i>
        <span class="ml-[10px]" v-if="!collapsed">Lecturers Management</span>
      </a-menu-item>

      <a-menu-item key="sub3" title="Students Management">
        <i class="ri-user-3-fill"></i>

        <router-link to="student"
          ><span class="ml-[10px]" v-if="!collapsed">Students Management</span></router-link
        >
      </a-menu-item>

      <a-sub-menu key="sub4">
        <template #title>
          <i class="ri-news-fill"></i>
          <span class="ml-[10px]" v-if="!collapsed">News Management</span>
        </template>
        <a-menu-item key="4-1"><i class="ri-article-fill"></i> NewType</a-menu-item>
        <a-menu-item key="4-2"><i class="ri-article-fill"></i> News</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="sub5" title="Resources Management">
        <i class="ri-folders-fill"></i>
        <span class="ml-[10px]" v-if="!collapsed">Resources Management</span>
      </a-menu-item>
      <a-menu-item key="sub6" title="Evaluates Management">
        <i class="ri-file-list-2-fill"></i>
        <span class="ml-[10px]" v-if="!collapsed">Evaluates Management</span>
      </a-menu-item>

      <a-menu-item key="sub7" title="Education Program">
        <i class="ri-school-fill"></i>
        <span class="ml-[10px]" v-if="!collapsed">Education Program</span>
      </a-menu-item>

      <a-menu-item key="sub8" title="Teaching Program">
        <i class="ri-calendar-todo-fill"></i>
        <span class="ml-[10px]" v-if="!collapsed">Teaching Program</span>
      </a-menu-item>

      <a-menu-item key="sub9" title="Service">
        <i class="ri-customer-service-2-fill"></i>
        <span class="ml-[10px]" v-if="!collapsed">Service</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<style scoped>
.custom-sider {
  overflow: auto; /* Enable scrolling for the sidebar */
}

.custom-menu {
  height: calc(100vh - 60px); /* Adjust based on the height of other elements like the logo */
  overflow-y: auto; /* Enable vertical scrolling for the menu */
}

.logo {
  height: 60px; /* Adjust the height of the logo as needed */
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo img {
  height: 100%;
  width: auto; /* Maintain aspect ratio */
  object-fit: cover; /* Ensure the image covers the area while maintaining aspect ratio */
}
</style>
