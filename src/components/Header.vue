<template>
  <header class="header">
    <div class="container">
      <router-link to="/coins" class="logo">
        <span class="logo-icon">C</span>
        <span class="logo-text">CryptoTracker</span>
      </router-link>
      <nav class="navigation">
        <router-link to="/coins" class="nav-link" :class="{ active: $route.path === '/coins' }">
          Поиск
        </router-link>
        <router-link to="/coins/categories" class="nav-link" :class="{ active: $route.path === '/coins/categories' }">
          Категории
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.85);
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--color-text);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #2563eb, #0ea5e9);
  color: #ffffff;
  font-weight: 700;
  font-size: 18px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.navigation {
  display: flex;
  gap: 4px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--transition);

  &:hover {
    background-color: var(--color-surface-alt);
    color: var(--color-text);
  }

  &.active {
    background-color: var(--color-primary);
    color: #ffffff;
  }
}
</style>
  
