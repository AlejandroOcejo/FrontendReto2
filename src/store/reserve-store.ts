import { defineStore } from 'pinia'
import { ref } from 'vue'
import useFetch from '@/composables/useFetch'

interface seatReseve {
  seatId: number | undefined
  number: number | undefined
  salaId: number | undefined
}

interface sessionReserve {
  sessionId: number | undefined
  date?: Date | undefined
  obra?: obraReserve | undefined
}

interface obraReserve {
  name: string | undefined
}

interface reserveData {
  id: number
  seat?: seatReseve | undefined
  session: sessionReserve | undefined
  userId?: number | undefined
  price?: number | undefined
  date?: Date | undefined
  dateDay?: string | undefined
  dateTime?: string | undefined
  salaNumber?: number | undefined
  seatNumber?: number | undefined
  seatId?: number | undefined
}

const API_URL = import.meta.env.VITE_APP_API_URL

const { data, error, call } = useFetch()

export const useReservesStore = defineStore('reserveStore', () => {
  const dataReserves = ref<reserveData[]>()
  const seatError = ref<any>()
  const seatIsLoading = ref<boolean>()

  const setData = (newData: reserveData[]) => {
    dataReserves.value = newData
  }

  const setError = (err: any) => {
    seatError.value = err
  }

  const setLoading = (loadingState: boolean) => {
    seatIsLoading.value = loadingState
  }

  const fetch = async () => {
    try {
      await call(`${API_URL}/Reserve`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => ({
          id: item['id'],
          seat: {
            seatId: item['seatId'],
            number: item['seat']['number'],
            salaId: item['seat']['salaId']
          },
          session: {
            sessionId: item['sessionId'],
            date: new Date(item['session']['date'])
          },
          userId: item['userId']
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

  const getReserves = async () => {
    try {
      setLoading(true)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const getReservesBySessionId = async (id: number) => {
    try {
      await call(`${API_URL}/session/${id}/reserves`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => ({
          id: item['id'],
          seat: {
            seatId: item['seatId'],
            number: item['seat']['number'],
            salaId: item['seat']['salaId']
          },
          session: {
            sessionId: item['sessionId'],
            date: new Date(item['session']['date'])
          },
          userId: item['userId']
        }))
        setData(mappedData), setError(null)
      } else {
        setData([]), setError(error)
      }
    } catch {
      setError(error)
    }
  }

  const addReserve = async (body: string) => {
    try {
      setLoading(true)
      await call(`${API_URL}/Reserve`, 'POST', body)
      fetch()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const deleteReserve = async (id: number, userId: number) => {
    try {
      setLoading(true)
      await call(`${API_URL}/Reserve/${id}`, 'DELETE')
      getReservesByUserId(userId)
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const getReservesByUserId = async (id: number) => {
    setLoading(true)
    try {
      await call(`${API_URL}/Reserve/${id}/seats`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => {
          const dateObj = new Date(item['session']['date'])
          const dateDay = dateObj.toLocaleDateString(undefined, {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
          })
          const dateTime = dateObj.toLocaleTimeString(undefined, { timeStyle: 'short' })
          return {
            id: item['reserveId'],
            seatId: item['id'],
            seatNumber: item['number'],
            price: item['price'],
            seat: {
              seatId: item['id'],
              number: item['number'],
              salaId: item['salaId']
            },
            session: {
              sessionId: item['session']['id'],
              obra: {
                name: item['session']['obra']['name']
              }
            },
            salaNumber: item['session']['salaNumber'],
            dateDay: dateDay,
            dateTime: dateTime
          }
        })
        setData(mappedData), setError(null)
      } else {
        setData([]), setError(error), setLoading(false)
      }
    } catch {
      setError(error), setLoading(false)
    }
    setLoading(false)
  }

  return {
    getReserves,
    getReservesBySessionId,
    addReserve,
    deleteReserve,
    getReservesByUserId,
    dataReserves,
    seatError,
    seatIsLoading
  }
})
