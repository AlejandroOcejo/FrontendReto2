import { defineStore } from 'pinia'
import { ref } from 'vue'
import useFetch from '@/composables/useFetch'
interface usersData {
  id: number
  name: string
  lastName: string
  mail: string
  password?: string
  seats: any
}

interface UserUpdate {
  id: number
  name: string
  lastName: string
  mail: string
  password?: string
}

const API_URL = import.meta.env.VITE_APP_API_URL

const { data, error, call } = useFetch()

const loginResponse = ref('')

const callLogin = async (userLogin: { mail: string; Password: string }) => {
  const { mail, Password } = userLogin
  const url = `${API_URL}/Login?mail=${mail}&Password=${Password}`
  try {
    const response = await fetch(url, { method: 'POST' })
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const responseBody = await response.text()
    loginResponse.value = responseBody
    console.log(responseBody)
  } catch (err) {
    console.error('Fetch error:', err)
    error.value = err
  }
}

export const useUserStore = defineStore('userStore', () => {
  const dataUsers = ref<usersData[]>()
  const userError = ref<any>()
  const userIsLoading = ref<boolean>()

  const setData = (newData: usersData[]) => {
    dataUsers.value = newData
  }

  const setError = (err: any) => {
    userError.value = err
  }

  const setLoading = (loadingState: boolean) => {
    userIsLoading.value = loadingState
  }

  const fetchUser = async () => {
    try {
      await call(`${API_URL}/user`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => ({
          id: item['id'],
          name: item['name'],
          lastName: item['lastName'],
          mail: item['mail'],
          seats: item['seats']
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

  const getUser = async () => {
    try {
      setLoading(true)
      fetchUser()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const getUserById = async (id: number) => {
    try {
      await call(`${API_URL}/user${id}`, 'GET')
      if (Array.isArray(data.value)) {
        const mappedData = data.value.map((item) => ({
          id: item['id'],
          name: item['name'],
          lastName: item['lastName'],
          mail: item['mail'],
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

  const addUser = async (body: string) => {
    try {
      setLoading(true)
      await call(`${API_URL}/user`, 'POST', body)
      fetchUser()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const deleteUser = async (id: number) => {
    try {
      setLoading(true)
      await call(`${API_URL}/user/${id}`, 'DELETE')
      fetchUser()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const updateUser = async (id: number, body: UserUpdate) => {
    try {
      setLoading(true)
      await call(`${API_URL}/user/${id}`, 'PUT', JSON.stringify(body))
      fetchUser()
      setLoading(false)
    } catch {
      setError(error)
    }
  }

  const loginUser = async (body: { mail: string; Password: string }) => {
    try {
      setLoading(true)
      await callLogin(body)
      setLoading(false)
    } catch (error) {
      setError(error)
    }
  }

  return {
    getUser,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    loginUser,
    dataUsers,
    userError,
    userIsLoading,
    loginResponse
  }
})
