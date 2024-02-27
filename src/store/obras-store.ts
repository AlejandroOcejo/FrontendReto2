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
    const obraError = ref<any>()
    const obraIsLoading = ref<boolean>()

    function setData(newData: ObrasData[]) {
        dataObras.value = newData;
    }

    function setError(err: any) {
        obraError.value = err;
    }

    function setLoading(loadingState: boolean) {
        obraIsLoading.value = loadingState;
    }

    return { setData, setError, setLoading, dataObras, obraError, obraIsLoading }
})