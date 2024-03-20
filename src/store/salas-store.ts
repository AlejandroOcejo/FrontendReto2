import { defineStore } from "pinia";
import { ref } from "vue"

interface SalasData {
    id: number;
    number: number;
    sessionId: number;
}


export const useSalaStore = defineStore('salaStore', () => {
    const dataSalas = ref<SalasData[]>()
    const salaError = ref<any>()
    const salaIsLoading = ref<boolean>()

    function setData(newData: SalasData[]) {
        dataSalas.value = newData;
    }

    function setError(err: any) {
        salaError.value = err;
    }

    function setLoading(loadingState: boolean) {
        salaIsLoading.value = loadingState;
    }

    return { setData, setError, setLoading, dataSalas, salaError, salaIsLoading }
})