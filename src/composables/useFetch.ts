import { ref } from 'vue'

export default function useFetch() {

    const data = ref(null)
    const error = ref(null)
    const isloading = ref(false)

    const call = (url: string) => {
        isloading.value = true
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
            .then((json) => (data.value = json, isloading.value = false))
            .catch((err) => (error.value = err, isloading.value = false))
    }
    return { data, error, isloading, call }
}