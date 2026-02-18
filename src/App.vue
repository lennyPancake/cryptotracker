<template>
  <Header />
  <main class="main-content">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<style lang="scss" scoped>
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  min-height: calc(100vh - 64px);
}
</style>
