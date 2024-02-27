import { defineStore } from "pinia";
import { ref } from "vue";
interface ObrasData {
    id: number;
    name: string;
    image: string;
    duration: number;
    genre: string;
    sessions: any;
}


export const useObraStore = defineStore('obraStore', () => {
    const dataObras = ref<ObrasData[]>()
    const error = ref<any>()
    const isLoading = ref<boolean>()

    function setData(newData: ObrasData[]) {
        dataObras.value = newData;
    }

    function setError(err: any) {
        error.value = err;
    }

    function setLoading(loadingState: boolean) {
        isLoading.value = loadingState;
    }

    return { setData, setError, setLoading, dataObras, error, isLoading }
})