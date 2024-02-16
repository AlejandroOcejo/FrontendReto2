import { ref } from 'vue'

export default function useFetch() {

    const data = ref([])
    const error = ref(null)
    const isLoading = ref(false)

    const call = async (url: string) => {
        isLoading.value = true
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 404) {
                        throw new Error("Not Found");
                    }
                    throw new Error(`${res.status}`);
                }
                return res.json()
            })
            .then((json) => (data.value = json, isLoading.value = false))
            .catch((err) => (error.value = err, isLoading.value = false))
    }
    return { data, error, isLoading, call }
}