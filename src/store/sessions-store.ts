import { defineStore } from 'pinia'
import { ref } from 'vue'
interface sessionData {
  id: number
  dateDay: string
  dateTime: string
  salaNumber: number
}

export const useSessionsStore = defineStore('sessionsStore', () => {
  const dataSessions = ref<sessionData[]>()
  const sessionError = ref<any>()
  const sessionIsLoading = ref<boolean>()

  function setData(newData: sessionData[]) {
    dataSessions.value = newData
  }

  function setError(err: any) {
    sessionError.value = err
  }

  function setLoading(loadingState: boolean) {
    sessionIsLoading.value = loadingState
  }

  return { setData, setError, setLoading, dataSessions, sessionError, sessionIsLoading }
})
