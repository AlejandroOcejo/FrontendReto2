import { defineStore } from 'pinia'
import { ref } from 'vue'
import useFetch from '@/composables/useFetch'
interface sessionData {
  id: number
  dateDay: string
  dateTime: string
  salaNumber: number
}

interface obraData {
  id: number
  name: string
  duration: string
  description: string
}

interface sessionFormData {
  obraId: number | undefined
  salaId: number | undefined
  date: any
  salaNumber: number | undefined
}

interface sessionPutData {
  id: number
  obraId: number | undefined
  date: any
}

const API_URL = import.meta.env.VITE_APP_API_URL

const { data, error, call } = useFetch()

const formatDate = (obraId: number, object: sessionData) => {
  const dateDay = new Date(object.dateDay)
  const day = dateDay.getDate()
  const month = dateDay.getMonth() + 1
  const year = dateDay.getFullYear()
  const dateTime = new Date(object.dateTime)
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()

  const adjustedHour = hour + 2

  const date = new Date(year, month - 1, day, adjustedHour, minute)

  const isoDateString = date.toISOString()

  const newObject: sessionPutData = {
    id: object.id,
    obraId: obraId,
    date: isoDateString
  }

  return newObject
}

const formatDatePost = (obraId: number, object: sessionFormData) => {
  if (object.date instanceof Date) {
    const adjustedDate = new Date(object.date.getTime() + 2 * 60 * 60 * 1000)
    const newObject: sessionFormData = {
      obraId: obraId,
      salaId: object.salaId,
      date: adjustedDate,
      salaNumber: object.salaNumber
    }

    return newObject
  }
}

export const useSessionsStore = defineStore('sessionsStore', () => {
  const dataSessions = ref<sessionData[]>()
  const dataObraSessions = ref<obraData>()

  const sessionError = ref<any>()
  const sessionIsLoading = ref<boolean>()

  const setData = (newData: sessionData[]) => {
    dataSessions.value = newData
  }

  const setObraData = (newData: obraData) => {
    dataObraSessions.value = newData
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

  const addSessions = async (obraId: number, body: sessionFormData) => {
    try {
      const formattedBody = formatDatePost(obraId, body)
      setLoading(true)
      await call(`${API_URL}/Session`, 'POST', JSON.stringify(formattedBody))
      getObraSessions(obraId)
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const deleteSessions = async (id: number, obraId: number) => {
    try {
      setLoading(true)
      await call(`${API_URL}/Session/${id}`, 'DELETE')
      getObraSessions(obraId)
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const updateSessions = async (id: number, obraId: number, body: sessionData) => {
    try {
      setLoading(true)
      let updatedBody = formatDate(obraId, body)
      await call(`${API_URL}/Session/${id}`, 'PUT', JSON.stringify(updatedBody))
      getObraSessions(obraId)
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

  const getObraBySessionId = async (id: number | null) => {
    setLoading(true)
    try {
      await call(`${API_URL}/session/${id}`, 'GET')
      if (Array.isArray(data.value) && data.value.length > 0) {
        const mappedData: obraData = {
          id: data.value[0]['id'],
          name: data.value[0]['name'],
          duration: data.value[0]['duration'],
          description: data.value[0]['description']
        }
        setObraData(mappedData)
        setError(null)
      } else {
        setObraData({ id: 0, name: '', duration: '', description: '' })
        setError('Data is not an array or array is empty')
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    getSessions,
    getSessionsById,
    addSessions,
    deleteSessions,
    updateSessions,
    getObraSessions,
    getObraBySessionId,
    dataObraSessions,
    dataSessions,
    sessionError,
    sessionIsLoading
  }
})
