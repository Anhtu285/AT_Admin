<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue'
const collapsed = defineModel()
const selectedKeys = ref<string[]>(['1'])
</script>
<template>
  <a-layout-sider
    background-color:
    a0aec0
    width="250"
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
  >
    <figure class="logo p-[1px]">
      <img class="w-full h-full" src="../assets/images/_636903097234341637.png" alt="" />
    </figure>

    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-sub-menu key="sub1">
        <template #title>
          <i class="ri-pie-chart-2-fill"></i>
          <span class="ml-[10px]" v-if="!collapsed">Statistical</span>
        </template>
        <a-menu-item key="1">option1</a-menu-item>
        <a-menu-item key="2">option2</a-menu-item>
        <a-menu-item key="3">option3</a-menu-item>
        <a-menu-item key="4">option4</a-menu-item>
      </a-sub-menu>

      <a-menu-item key="sub2">
        <video-camera-outlined />
        <span>Lecturers Management</span>
      </a-menu-item>
      <a-menu-item key="sub3">
        <upload-outlined />
        <span>Students Management</span>
      </a-menu-item>
      <a-menu-item key="sub4">
        <upload-outlined />
        <span>News Management</span>
      </a-menu-item>
      <a-menu-item key="sub5">
        <upload-outlined />
        <span>Resources Management</span>
      </a-menu-item>
      <a-menu-item key="sub6">
        <upload-outlined />
        <span>Evaluates Management</span>
      </a-menu-item>
      <a-menu-item key="sub7">
        <upload-outlined />
        <span>Education P rogram</span>
      </a-menu-item>
      <a-menu-item key="sub8">
        <upload-outlined />
        <span>Teaching Program</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
