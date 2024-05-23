<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { ref } from 'vue'
const collapsed = ref<boolean>(false)
</script>
<template>
  <a-layout>
    <Sidebar v-model="collapsed"></Sidebar>

    <!-- <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="../assets/img/_636903097234341637.png" />
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider> -->
    <a-layout>
      <Header v-model="collapsed"></Header>

      <a-layout-content class="flex custom-content">
        <!-- Main content here -->
        <!-- <div class="content-inner">
           Your content 
        </div> -->
        <router-view />
      </a-layout-content>
      <Footer v-model="collapsed"></Footer>
    </a-layout>
  </a-layout>
</template>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.layout {
  height: 100vh;
}

.site-layout .site-layout-background {
  background: #fff;
}

.custom-content {
  overflow: auto; /* Enable scrolling for the content */
}

.content-inner {
  padding: 16px; /* Adjust as needed */
  min-height: calc(100vh - 64px); /* Adjust based on the height of header and footer */
}
</style>
