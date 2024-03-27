import { defineStore } from 'pinia'
import { ref } from 'vue'
import useFetch from '@/composables/useFetch'
interface sessionData {
  id: number
  dateDay: string
  dateTime: string
  salaNumber: number
}

const API_URL = import.meta.env.VITE_APP_API_URL

const { data, error, call } = useFetch()

export const useSessionsStore = defineStore('sessionsStore', () => {
  const dataSessions = ref<sessionData[]>()
  const sessionError = ref<any>()
  const sessionIsLoading = ref<boolean>()

  const setData = (newData: sessionData[]) => {
    dataSessions.value = newData
  }

  const setError = (err: any) => {
    sessionError.value = err
  }

  const setLoading = (loadingState: boolean) => {
    sessionIsLoading.value = loadingState
  }

  const fetch = async () => {
    try {
      await call(`${API_URL}/session`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => {
          const dateObj = new Date(item['date'])
          const dateDay = dateObj.toLocaleDateString(undefined, {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
          })
          const dateTime = dateObj.toLocaleTimeString(undefined, { timeStyle: 'short' })

          return {
            id: item['id'],
            dateDay: dateDay,
            dateTime: dateTime,
            salaNumber: item['salaNumber']
          }
        })
        setData(mappedData), setError(null)
      } else {
        setData([]), setError(error)
      }
    } catch (err) {
      setData([]), setError(err)
    }
  }

  const getSessionsById = async (id: number) => {
    try {
      await call(`${API_URL}/session/${id}`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => {
          const dateObj = new Date(item['date'])
          const dateDay = dateObj.toLocaleDateString(undefined, {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
          })
          const dateTime = dateObj.toLocaleTimeString(undefined, { timeStyle: 'short' })

          return {
            id: item['id'],
            dateDay: dateDay,
            dateTime: dateTime,
            salaNumber: item['salaNumber']
          }
        })
        setData(mappedData), setError(null)
      } else {
        setData([]), setError(error)
      }
    } catch {
      setError(error)
    }
  }

  const getSessions = async () => {
    try {
      setLoading(true)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const addSessions = async (body: string) => {
    try {
      setLoading(true)
      await call(`${API_URL}/Session`, 'POST', body)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const deleteSessions = async (id: number) => {
    try {
      setLoading(true)
      await call(`${API_URL}/Session/${id}`, 'DELETE')
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const updateSessions = async (id: number, body: string) => {
    try {
      setLoading(true)
      await call(`${API_URL}/Session/${id}`, 'PUT', body)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const getObraSessions = async (id: number) => {
    setLoading(true)
    try {
      await call(`${API_URL}/obra/${id}/sessions`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => {
          const dateObj = new Date(item['date'])
          const dateDay = dateObj.toLocaleDateString(undefined, {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
          })
          const dateTime = dateObj.toLocaleTimeString(undefined, { timeStyle: 'short' })

          return {
            id: item['id'],
            dateDay: dateDay,
            dateTime: dateTime,
            salaNumber: item['salaNumber']
          }
        })
        setData(mappedData), setError(null), setLoading(false)
      } else {
        setData([]), setError(error), setLoading(false)
      }
    } catch (err) {
      setData([]), setError(err), setLoading(false)
    }
    setLoading(false)
  }
  

  return {
    getSessions,
    getSessionsById,
    addSessions,
    deleteSessions,
    updateSessions,
    getObraSessions,
    dataSessions,
    sessionError,
    sessionIsLoading
  }
})
