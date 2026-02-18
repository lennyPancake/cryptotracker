<template>
  <div v-if="coin.isLoadingDetail" class="loading-state">
    <div class="loading-spinner"></div>
    <p>Загрузка данных...</p>
  </div>

  <div v-else-if="coin.errorMessage" class="error-banner">
    {{ coin.errorMessage }}
  </div>

  <div v-else class="detail-page">
    <router-link to="/coins" class="back-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
      Назад к поиску
    </router-link>

    <div class="detail-hero">
      <div class="hero-image-wrapper">
        <img :src="coin.dCoins.image?.large" :alt="coin.dCoins.name" class="hero-image" />
      </div>
      <div class="hero-info">
        <div class="hero-badges">
          <span v-if="coin.dCoins.market_cap_rank" class="badge badge-rank">
            Ранг #{{ coin.dCoins.market_cap_rank }}
          </span>
          <span class="badge badge-symbol">{{ coin.dCoins.symbol }}</span>
        </div>
        <h1 class="hero-title">{{ coin.dCoins.name }}</h1>
        <p v-if="coin.dCoins.localization?.ru" class="hero-subtitle">
          {{ coin.dCoins.localization.ru }}
        </p>
        <div class="hero-price" v-if="coin.dCoins.market_data?.current_price?.usd != null">
          <span class="price-value">
            ${{ coin.dCoins.market_data.current_price.usd.toLocaleString() }}
          </span>
          <span
            v-if="coin.dCoins.market_data.price_change_percentage_24h != null"
            class="price-change"
            :class="coin.dCoins.market_data.price_change_percentage_24h >= 0 ? 'positive' : 'negative'"
          >
            {{ coin.dCoins.market_data.price_change_percentage_24h >= 0 ? '+' : '' }}{{ coin.dCoins.market_data.price_change_percentage_24h.toFixed(2) }}%
          </span>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-label">Рыночная капитализация</span>
        <span class="stat-value">${{ coin.dCoins.market_data?.market_cap?.usd?.toLocaleString() ?? 'N/A' }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Общее количество</span>
        <span class="stat-value">{{ maxSupplyFn(coin.dCoins.market_data?.total_supply) }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Макс. количество</span>
        <span class="stat-value">{{ maxSupplyFn(coin.dCoins.market_data?.max_supply) }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">В обращении</span>
        <span class="stat-value">{{ coin.dCoins.market_data?.circulating_supply?.toLocaleString() ?? 'N/A' }}</span>
      </div>
    </div>

    <div v-if="coin.dCoins.links?.homepage?.[0]" class="links-section">
      <h2 class="section-title">Ссылки</h2>
      <a :href="coin.dCoins.links.homepage[0]" target="_blank" rel="noopener noreferrer" class="external-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" x2="21" y1="14" y2="3"/>
        </svg>
        {{ coin.dCoins.links.homepage[0] }}
      </a>
    </div>

    <div v-if="coin.dCoins.description?.en" class="description-section">
      <h2 class="section-title">Описание</h2>
      <div class="description-content" v-html="coin.dCoins.description.en"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import maxSupplyFn from '../utils/maxSupply'
import { useCoinsStore } from '../store/coins-store'

const route = useRoute()
const coin = useCoinsStore()
coin.fetchDetailCoin(route.params.id)
</script>

<style lang="scss" scoped>
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  gap: 16px;
  color: var(--color-text-secondary);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  margin-bottom: 24px;
  transition: color var(--transition);

  &:hover {
    color: var(--color-primary);
  }
}

.detail-hero {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  padding: 32px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  margin-bottom: 24px;
}

.hero-image-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: var(--color-surface-alt);
  border-radius: 16px;
  padding: 16px;
}

.hero-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.hero-info {
  flex: 1;
  min-width: 0;
}

.hero-badges {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.badge-rank {
  background: var(--color-surface-alt);
  color: var(--color-primary);
}

.badge-symbol {
  background: var(--color-surface-alt);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.hero-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 4px;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin: 0 0 16px;
}

.hero-price {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.price-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.price-change {
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;

  &.positive {
    color: #16a34a;
    background: #f0fdf4;
  }

  &.negative {
    color: #dc2626;
    background: #fef2f2;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.stat-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 16px;
}

.links-section {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  margin-bottom: 24px;
}

.external-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-primary);
  text-decoration: none;
  word-break: break-all;
  transition: color var(--transition);

  &:hover {
    color: var(--color-primary-hover);
  }
}

.description-section {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.description-content {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-secondary);

  :deep(a) {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 640px) {
  .detail-hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px;
    gap: 20px;
  }

  .hero-badges {
    justify-content: center;
  }

  .hero-price {
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-title {
    font-size: 22px;
  }

  .price-value {
    font-size: 26px;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
