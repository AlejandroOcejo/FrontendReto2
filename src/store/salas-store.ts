import { defineStore } from 'pinia'
import { ref } from 'vue'
import useFetch from '@/composables/useFetch'
interface SalasData {
  id: number
  number: number
  sessionId: number
  seats: Array<object>
}

const API_URL = import.meta.env.VITE_APP_API_URL

const { data, error, call } = useFetch()

export const useSalaStore = defineStore('salaStore', () => {
  const dataSalas = ref<SalasData[]>()
  const salaError = ref<any>()
  const salaIsLoading = ref<boolean>()

  const setData = (newData: SalasData[]) => {
    dataSalas.value = newData
  }

  const setError = (err: any) => {
    salaError.value = err
  }

  const setLoading = (loadingState: boolean) => {
    salaIsLoading.value = loadingState
  }

  const fetch = async () => {
    try {
      await call(`${API_URL}/salas`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => ({
          id: item['id'],
          number: item['number'],
          sessionId: item['sessionId'],
          seats: item['seats']
        }))
        setData(mappedData), setError(null)
      } else {
        setData([]), setError(error)
      }
    } catch (err) {
      setData([]), setError(err)
    }
  }

  const getSalas = async () => {
    try {
      setLoading(true)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const getSalasById = async (id: number) => {
    try {
      await call(`${API_URL}/salas/${id}`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => ({
          id: item['id'],
          number: item['number'],
          sessionId: item['sessionId'],
          seats: item['seats']
        }))
        setData(mappedData), setError(null)
      } else {
        setData([]), setError(error)
      }
    } catch {
      setError(error)
    }
  }

  const addSalas = async (body: string) => {
    try {
      setLoading(true)
      await call(`${API_URL}/sala`, 'POST', body)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const deleteSalas = async (id: number) => {
    try {
      setLoading(true)
      await call(`${API_URL}/sala/${id}`, 'DELETE')
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const updateSalas = async (id: number, body: string) => {
    try {
      setLoading(true)
      await call(`${API_URL}/sala/${id}`, 'PUT', body)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  return {
    getSalas,
    getSalasById,
    addSalas,
    deleteSalas,
    updateSalas,
    dataSalas,
    salaError,
    salaIsLoading
  }
})
