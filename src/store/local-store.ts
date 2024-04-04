import { defineStore } from 'pinia'
import { ref } from 'vue'
import useFetch from '@/composables/useFetch'

interface userInfo {
  userId?: number
  mail?: string
}

export const useObraStore = defineStore('obraStore', () => {
  /* const dataObras = ref<ObrasData[]>() */

  /* const setData = (newData: ObrasData[]) => {
    dataObras.value = newData
  } */

  return {}
})
