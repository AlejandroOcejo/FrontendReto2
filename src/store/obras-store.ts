import { defineStore } from 'pinia'
import { ref } from 'vue'
import useFetch from '@/composables/useFetch'

interface ObrasData {
  id: number
  name: string
  image: string
  duration: number
  genre: string
  description: string
  sessions: any
}

const API_URL = import.meta.env.VITE_APP_API_URL

const { data, error, call } = useFetch()

export const useObraStore = defineStore('obraStore', () => {
  const dataObras = ref<ObrasData[]>()
  const obraError = ref<any>()
  const obraIsLoading = ref<boolean>()

  const setData = (newData: ObrasData[]) => {
    dataObras.value = newData
  }

  const setError = (err: any) => {
    obraError.value = err
  }

  const setLoading = (loadingState: boolean) => {
    obraIsLoading.value = loadingState
  }

  const fetch = async () => {
    try {
      await call(`${API_URL}/obra`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => ({
          id: item['id'],
          name: item['name'],
          image: item['image'],
          duration: item['duration'],
          genre: item['genre'],
          description: item['description'],
          sessions: item['sessions']
        }))
        setData(mappedData), setError(null)
      } else {
        setData([]), setError(error)
      }
    } catch (err) {
      console.error('Error fetching obras:', err)
      setData([]), setError(err)
    }
  }

  const getObras = async () => {
    try {
      setLoading(true)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const getObrasById = async (id: number) => {
    try {
      setLoading(true)
      await call(`${API_URL}/obra/${id}`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => ({
          id: item['id'],
          name: item['name'],
          image: item['image'],
          duration: item['duration'],
          genre: item['genre'],
          description: item['description'],
          sessions: item['sessions']
        }))
        setData(mappedData), setError(null)
      } else {
        setData([]), setError(error)
      }
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const addObras = async (body: string) => {
    try {
      setLoading(true)
      await call(`${API_URL}/obra`, 'POST', body)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const deleteObras = async (id: number) => {
    try {
      setLoading(true)
      await call(`${API_URL}/obra/${id}`, 'DELETE')
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const updateObras = async (id: number, body: string) => {
    try {
      setLoading(true)
      await call(`${API_URL}/obra/${id}`, 'PUT', body)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  return {
    dataObras,
    obraError,
    obraIsLoading,
    getObras,
    getObrasById,
    addObras,
    deleteObras,
    updateObras
  }
})
