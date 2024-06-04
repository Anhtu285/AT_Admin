<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
// import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue'
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
        <a-menu-item key="1-1"><i class="ri-line-chart-fill"></i> Dashboard lv1</a-menu-item>
        <a-menu-item key="1-2"><i class="ri-pie-chart-2-fill"></i> Dashboard lv2</a-menu-item>
        <a-menu-item key="1-3"><i class="ri-bar-chart-2-fill"></i> Dashboard lv3</a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub2">
        <template #title>
          <i class="ri-shield-user-fill"></i>
          <span class="ml-[10px]" v-if="!collapsed">Lecturers Management</span>
        </template>
        <a-menu-item key="2-1"><i class="ri-user-3-fill"></i> Lecturers</a-menu-item>
        <a-menu-item key="2-2"><i class="ri-profile-fill"></i> LecturerInfo</a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub3">
        <template #title>
          <i class="ri-graduation-cap-fill"></i>
          <span class="ml-[10px]" v-if="!collapsed">Students Management</span>
        </template>
        <router-link to="student"
          ><a-menu-item key="3-1"><i class="ri-user-3-fill"></i> Students</a-menu-item></router-link
        >
        <router-link to="familyst"
          ><a-menu-item key="3-2"
            ><i class="ri-profile-fill"></i> FamilySt</a-menu-item
          ></router-link
        >
        <router-link to="profilest"
          ><a-menu-item key="3-3"
            ><i class="ri-home-heart-fill"></i> ProfileSt</a-menu-item
          ></router-link
        >
      </a-sub-menu>

      <a-menu-item key="sub4" title="Class Management">
        <i class="ri-building-fill"></i>
        <span class="ml-[10px]" v-if="!collapsed">Class Management</span>
      </a-menu-item>

      <a-sub-menu key="sub5">
        <template #title>
          <i class="ri-news-fill"></i>
          <span class="ml-[10px]" v-if="!collapsed">News Management</span>
        </template>
        <a-menu-item key="5-1"><i class="ri-article-fill"></i> NewType</a-menu-item>
        <a-menu-item key="5-2"><i class="ri-article-fill"></i> News</a-menu-item>
      </a-sub-menu>

      <a-menu-item key="sub6" title="Resources Management">
        <i class="ri-folders-fill"></i>
        <span class="ml-[10px]" v-if="!collapsed">Resources Management</span>
      </a-menu-item>
      <a-menu-item key="sub7" title="Evaluates Management">
        <i class="ri-file-list-2-fill"></i>
        <span class="ml-[10px]" v-if="!collapsed">Evaluates Management</span>
      </a-menu-item>

      <a-menu-item key="sub8" title="Education Program">
        <i class="ri-school-fill"></i>
        <span class="ml-[10px]" v-if="!collapsed">Education Program</span>
      </a-menu-item>

      <a-menu-item key="sub9" title="Teaching Program">
        <i class="ri-calendar-todo-fill"></i>
        <span class="ml-[10px]" v-if="!collapsed">Teaching Program</span>
      </a-menu-item>

      <a-menu-item key="sub10" title="Service">
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
