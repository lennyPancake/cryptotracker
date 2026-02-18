<template>
  <div class="page-header">
    <h1 class="page-title">Поиск криптомонет</h1>
    <p class="page-subtitle">Найдите нужную криптовалюту по названию или символу</p>
  </div>

  <div class="search-wrapper">
    <el-input
      v-model="searchTerm"
      placeholder="Введите название монеты..."
      clearable
      size="large"
      @input="handleSearch"
    >
      <template #prefix>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </template>
    </el-input>
  </div>

  <div v-if="coinsSearch.errorMessage" class="error-banner">
    {{ coinsSearch.errorMessage }}
  </div>

  <div class="coin-grid">
    <template v-if="coinsSearch.isLoadingSearch">
      <div v-for="n in 10" :key="n" class="coin-card skeleton-card">
        <div class="skeleton skeleton-img"></div>
        <div class="skeleton-body">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-text"></div>
        </div>
      </div>
    </template>

    <template v-else>
      <router-link
        v-for="item in coinsSearch.sCoins.slice(0, count)"
        :key="item.id"
        :to="'/coins/' + item.id"
        class="coin-card"
      >
        <div class="coin-image-wrapper">
          <img :src="item.large" :alt="item.name" class="coin-image" />
        </div>
        <div class="coin-body">
          <span v-if="item.market_cap_rank" class="coin-rank">#{{ item.market_cap_rank }}</span>
          <h3 class="coin-name">{{ item.name }}</h3>
          <p class="coin-symbol">{{ item.symbol }}</p>
        </div>
      </router-link>
    </template>
  </div>

  <div v-if="!coinsSearch.isLoadingSearch && coinsSearch.sCoins.length === 0" class="empty-state">
    <p>Ничего не найдено. Попробуйте изменить поисковый запрос.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { debounce } from 'lodash'
import { useCoinsStore } from '../store/coins-store'

const coinsSearch = useCoinsStore()
coinsSearch.fetchSearchCoin('')

const count = ref(50)
const searchTerm = ref('')

const handleScroll = () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement
  if (scrollHeight - scrollTop - clientHeight < 200) {
    if (coinsSearch.sCoins.length > count.value) {
      count.value += 50
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const debouncedSearch = debounce((value: string) => {
  count.value = 50
  coinsSearch.fetchSearchCoin(value)
}, 500)

const handleSearch = () => {
  debouncedSearch(searchTerm.value)
}
</script>

<style lang="scss" scoped>
.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
  margin: 0 0 8px;
}

.page-subtitle {
  font-size: 15px;
  color: var(--color-text-secondary);
  margin: 0;
}

.search-wrapper {
  margin-bottom: 32px;
  max-width: 420px;
}

.error-banner {
  padding: 12px 16px;
  margin-bottom: 24px;
  border-radius: 8px;
  background-color: #fef2f2;
  color: #dc2626;
  font-size: 14px;
  border: 1px solid #fecaca;
}

.coin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.coin-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  color: var(--color-text);
  transition: box-shadow var(--transition), transform var(--transition);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
}

.coin-image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--color-surface-alt);
}

.coin-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.coin-body {
  padding: 16px;
}

.coin-rank {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary);
  background: var(--color-surface-alt);
  padding: 2px 8px;
  border-radius: 20px;
  margin-bottom: 8px;
}

.coin-name {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 4px;
  color: var(--color-text);
}

.coin-symbol {
  font-size: 13px;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.04em;
}

.empty-state {
  text-align: center;
  padding: 64px 24px;
  color: var(--color-text-secondary);
  font-size: 15px;
}

/* Skeleton loading */
.skeleton-card {
  pointer-events: none;
}

.skeleton {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 6px;
}

.skeleton-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 24px auto;
}

.skeleton-body {
  padding: 16px;
}

.skeleton-title {
  height: 16px;
  width: 70%;
  margin-bottom: 8px;
}

.skeleton-text {
  height: 12px;
  width: 40%;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 640px) {
  .coin-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .page-title {
    font-size: 22px;
  }

  .search-wrapper {
    max-width: 100%;
  }
}
</style>
