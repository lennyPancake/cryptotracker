import { defineStore } from 'pinia'
import { fetchsCoin } from '../services/api'
import { SearchCoin, Root } from '../types/SearchCoin'
import { DetailCoin } from '../types/DetailCoin'
import { CategoryCoin } from '../types/CategoryCoin'
import { CategoryList } from '../types/CategoryList'

export const useCoinsStore = defineStore('coins-store', {
  state: () => ({
    sCoins: [] as SearchCoin[],
    dCoins: {} as DetailCoin,
    cCoins: [] as CategoryCoin[],
    cList: [] as CategoryList[],
    isLoadingDetail: true,
    isLoadingSearch: false,
    isLoadingCategory: false,
    errorMessage: '',
  }),
  actions: {
    async fetchSearchCoin(input: string) {
      this.isLoadingSearch = true
      this.errorMessage = ''
      try {
        const { data } = await fetchsCoin.fetchSearchCoin(input) as { data: Root }
        this.sCoins = data.coins
      } catch (error) {
        this.errorMessage = 'Failed to search coins'
        console.error(error)
      } finally {
        this.isLoadingSearch = false
      }
    },

    async fetchDetailCoin(input: string | string[]) {
      this.isLoadingDetail = true
      this.errorMessage = ''
      try {
        const id = Array.isArray(input) ? input[0] : input
        const { data } = await fetchsCoin.fetchDetailCoin(id)
        this.dCoins = data
      } catch (error) {
        this.errorMessage = 'Failed to load coin details'
        console.error(error)
      } finally {
        this.isLoadingDetail = false
      }
    },

    async fetchCategoryCoin(input: string, page: number, append = false) {
      this.isLoadingCategory = true
      this.errorMessage = ''
      try {
        const { data } = await fetchsCoin.fetchCategoryCoin(input, page)
        this.cCoins = append ? [...this.cCoins, ...data] : data
      } catch (error) {
        this.errorMessage = 'Failed to load category coins'
        console.error(error)
      } finally {
        this.isLoadingCategory = false
      }
    },

    async getCategoryList() {
      this.errorMessage = ''
      try {
        const { data } = await fetchsCoin.getCategoryList()
        this.cList = [{ category_id: 'None', name: 'None' }, ...data]
      } catch (error) {
        this.errorMessage = 'Failed to load categories'
        console.error(error)
      }
    },
  },
})
