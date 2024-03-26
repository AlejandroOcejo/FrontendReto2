import { defineStore } from "pinia";
import { ref } from "vue";
import useFetch from "@/composables/useFetch";

interface ObrasData {
    id: number;
    name: string;
    image: string;
    duration: number;
    genre: string;
    sessions: any;
}

const API_URL = 'http://localhost:5255'

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

    async function fetchObras() {
        const { data, error, call } = useFetch();
        try {
            await call(`${API_URL}/obras`, 'GET');
            if (Array.isArray(data.value)) {
                const mappedData = data.value.map(item => ({
                    "id": item["id"],
                    "name": item["name"],
                    "image": item["image"],
                    "duration": item["duration"],
                    "genre": item["genre"],
                    "sessions": item["sessions"],
                }));
                setData(mappedData), setError(null)
            } else {
                setData([]), setError(error)
            };
        } catch (err) {
            console.error('Error fetching obras:', err);
            setData([]), setError(err)
        };
    }

    async function fetch() {
        setLoading(true)
        fetch()
        setLoading(false)
    }

    async function addObras(body: string) {
        const { error, call } = useFetch();
        try {
            setLoading(true)
            await call(`${API_URL}/obras`, 'POST', body);
            fetch()
            setLoading(false)
        }
        catch {
            error
        }
    }

    async function deleteObras(id: string) {
        const { error, call } = useFetch();
        try {
            setLoading(true)
            await call(`${API_URL}/obras/${id}`, 'DELETE');
            fetch()
            setLoading(false)
        }
        catch {
            error
        }
    }

    async function updateObras(id: string, body: string) {
        const { error, call } = useFetch();
        try {
            setLoading(true)
            await call(`${API_URL}/obras/${id}`, 'POST', body);
            fetch()
            setLoading(false)
        }
        catch {
            error
        }
    }

    return { dataObras, obraError, obraIsLoading, fetchObras, addObras, deleteObras, updateObras }

})
