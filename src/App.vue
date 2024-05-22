<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <a-config-provider>
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </a-config-provider>
</template>
