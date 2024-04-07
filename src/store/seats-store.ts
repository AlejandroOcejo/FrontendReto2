import { defineStore } from 'pinia'
import { ref } from 'vue'
import useFetch from '@/composables/useFetch'
interface seatsData {
  id: number
  number: number
  price: number
  state: string
}

interface SeatFormData {
  id: number | undefined
  number: number | undefined
  price: number | undefined | null
  state: string | undefined
}
const API_URL = import.meta.env.VITE_APP_API_URL

const { data, error, call } = useFetch()

export const useSeatsStore = defineStore('seatStore', () => {
  const dataSeats = ref<seatsData[]>()
  const seatError = ref<any>()
  const seatIsLoading = ref<boolean>()

  const setData = (newData: seatsData[]) => {
    dataSeats.value = newData
  }

  const setError = (err: any) => {
    seatError.value = err
  }

  const setLoading = (loadingState: boolean) => {
    seatIsLoading.value = loadingState
  }

  const fetch = async () => {
    try {
      await call(`${API_URL}/seat`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => ({
          id: item['id'],
          number: item['number'],
          price: item['price'],
          state: item['state']
        }))
        setData(mappedData), setError(null)
      } else {
        setData([]), setError(error)
      }
    } catch (err) {
      console.error('Error fetching seats:', err)
      setData([]), setError(err)
    }
  }

  const getSeats = async () => {
    try {
      setLoading(true)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const getSeatsById = async (id: number) => {
    try {
      await call(`${API_URL}/seat/${id}`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => ({
          id: item['id'],
          number: item['number'],
          userId: item['userId'],
          price: item['price'],
          state: item['state']
        }))
        setData(mappedData), setError(null)
      } else {
        setData([]), setError(error)
      }
    } catch {
      setError(error)
    }
  }

  const addSeats = async (body: string) => {
    try {
      setLoading(true)
      await call(`${API_URL}/seat`, 'POST', body)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const deleteSeats = async (id: number) => {
    try {
      setLoading(true)
      await call(`${API_URL}/seat/${id}`, 'DELETE')
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const updateSeats = async (id: number | undefined, body: SeatFormData) => {
    try {
      setLoading(true)
      await call(`${API_URL}/seat/${id}`, 'PUT', JSON.stringify(body))
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const getSessionsSeats = async (id: number) => {
    setLoading(true)
    try {
      await call(`${API_URL}/Session/${id}/seats`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => ({
          id: item['id'],
          number: item['number'],
          userId: item['userId'],
          price: item['price'],
          state: item['state']
        }))
        setData(mappedData), setError(null), setLoading(false)
      } else {
        setData([]), setError(error), setLoading(false)
      }
    } catch {
      setError(error), setLoading(false)
    }
    setLoading(false)
  }

  const getUserSeats = async (id: number) => {
    setLoading(true)
    try {
      await call(`${API_URL}/User/${id}/seats`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => ({
          id: item['id'],
          number: item['number'],
          userId: item['userId'],
          price: item['price'],
          state: item['state']
        }))
        setData(mappedData), setError(null), setLoading(false)
      } else {
        setData([]), setError(error), setLoading(false)
      }
    } catch {
      setError(error), setLoading(false)
    }
    setLoading(false)
  }

  return {
    getSeats,
    getSeatsById,
    addSeats,
    deleteSeats,
    updateSeats,
    getSessionsSeats,
    getUserSeats,
    dataSeats,
    seatError,
    seatIsLoading
  }
})
