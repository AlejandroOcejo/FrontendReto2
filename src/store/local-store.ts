import { defineStore } from 'pinia'
import { ref } from 'vue'
import useFetch from '@/composables/useFetch'

interface userInfo {
  mail?: string
}

const dataLocal = ref<userInfo>()
const errorLocal = ref()
const idLocal = ref(1)

const API_URL = import.meta.env.VITE_APP_API_URL

const { data, error, call } = useFetch()

export const useLocalStore = defineStore('localStore', () => {
  const setData = (newData: userInfo) => {
    dataLocal.value = newData
  }

  const setId = (newId: number) => {
    idLocal.value = newId
  }
  const clearData = () => {
    dataLocal.value = {}
    idLocal.value = 1
  }

  const setError = (newError: any) => {
    errorLocal.value = newError
  }

  const fetchUserIdByMail = async (Mail: string) => {
    try {
      await call(`${API_URL}/user/${Mail}/id`, 'GET')
      if (data.value && typeof data.value === 'object' && 'id' in data.value) {
        const userId: number = data.value.id as number
        setId(userId)
        setError(null)
      } else {
        setId(1)
        setError(error)
      }
    } catch (err) {
      console.error('Error fetching seats:', err)
      setId(1)
      setError(err)
    }
  }

  return {
    dataLocal,
    idLocal,
    setData,
    fetchUserIdByMail,
    clearData
  }
})
