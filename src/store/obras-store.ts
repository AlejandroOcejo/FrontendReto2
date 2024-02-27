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
/* export const useObraStore = defineStore({
    id: 'obrasList',

    state: () => ({
        data: [] as ObrasData[] | null,
        error: null as any,
        isLoading: false,
    }),
    actions: {
        setData(data: any) {
            this.data = data;
        },
        setError(error: any) {
            this.error = error;
        },
        setLoading(isLoading: boolean) {
            this.isLoading = isLoading;
        },
    }
    
}); */


export const useObraStore = defineStore('obraStore', () => {
    const data = ref<ObrasData[]>()
    const error = ref<any>()
    const isLoading = ref<boolean>()

    function setData(newData: ObrasData[]) {
        data.value = newData;
    }

    function setError(err: any) {
        error.value = err;
    }

    function setLoading(loadingState: boolean) {
        isLoading.value = loadingState;
    }

    return { setData, setError, setLoading, data, error, isLoading }
})