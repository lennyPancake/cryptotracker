<template>
  <div class="page-header">
    <h1 class="page-title">Категории криптомонет</h1>
    <p class="page-subtitle">Просматривайте криптовалюты, сгруппированные по категориям</p>
  </div>

  <div class="category-selector">
    <label class="selector-label">Категория</label>
    <el-dropdown trigger="click" @command="handleCategoryChange" max-height="280">
      <button class="dropdown-trigger">
        <span>{{ categoryFilter }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-scrollbar class="category-scrollbar">
            <el-dropdown-item
              v-for="category in coinsCategory.cList"
              :key="category.category_id"
              :command="category.category_id"
            >
              {{ category.name }}
            </el-dropdown-item>
          </el-scrollbar>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <div v-if="coinsCategory.errorMessage" class="error-banner">
    {{ coinsCategory.errorMessage }}
  </div>

  <div class="coin-grid">
    <template v-if="coinsCategory.isLoadingCategory">
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
        v-for="item in coinsCategory.cCoins.slice(0, count)"
        :key="item.id"
        :to="'/coins/' + item.id"
        class="coin-card"
      >
        <div class="coin-image-wrapper">
          <img :src="item.image" :alt="item.name" class="coin-image" />
        </div>
        <div class="coin-body">
          <span v-if="item.market_cap_rank" class="coin-rank">#{{ item.market_cap_rank }}</span>
          <h3 class="coin-name">{{ item.name }}</h3>
          <p class="coin-symbol">{{ item.symbol }}</p>
          <p v-if="item.current_price != null" class="coin-price">
            ${{ item.current_price.toLocaleString() }}
          </p>
        </div>
      </router-link>
    </template>
  </div>

  <div v-if="!coinsCategory.isLoadingCategory && coinsCategory.cCoins.length === 0 && categoryFilter !== 'None'" class="empty-state">
    <p>В этой категории пока нет монет.</p>
  </div>

  <div v-if="!coinsCategory.isLoadingCategory && categoryFilter === 'None'" class="empty-state">
    <p>Выберите категорию из списка выше, чтобы просмотреть монеты.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useCoinsStore } from '../store/coins-store'

const coinsCategory = useCoinsStore()
coinsCategory.cCoins = []

const count = ref(50)
const page = ref(1)
const categoryFilter = ref('None')
const currentCategoryId = ref('')

coinsCategory.getCategoryList()

const handleScroll = () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement
  if (
    scrollHeight - scrollTop - clientHeight < 200 &&
    !coinsCategory.isLoadingCategory &&
    coinsCategory.cCoins.length >= count.value
  ) {
    page.value++
    coinsCategory.fetchCategoryCoin(currentCategoryId.value, page.value, true)
    count.value += 50
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleCategoryChange = (categoryId: string) => {
  const selectedCategory = coinsCategory.cList.find(
    (c) => c.category_id === categoryId
  )
  if (selectedCategory && currentCategoryId.value !== categoryId) {
    categoryFilter.value = selectedCategory.name
    currentCategoryId.value = categoryId
    page.value = 1
    count.value = 50
    coinsCategory.cCoins = []
    if (categoryId !== 'None') {
      coinsCategory.fetchCategoryCoin(categoryId, page.value)
    }
  }
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

.category-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.selector-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
  font-family: inherit;
  min-width: 200px;
  justify-content: space-between;

  &:hover {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
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

.coin-price {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  margin: 8px 0 0;
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

.category-scrollbar {
  max-height: 280px;
}

@media (max-width: 640px) {
  .coin-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .page-title {
    font-size: 22px;
  }

  .category-selector {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .dropdown-trigger {
    width: 100%;
  }
}
</style>
