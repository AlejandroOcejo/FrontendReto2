import { ref } from 'vue'

export default function useFetch() {
    const data = ref([]);
    const error = ref();
    const isLoading = ref(false);

    const call = async (url: string) => {
        isLoading.value = true;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const json = await response.json();
            data.value = json;
            isLoading.value = false;
        } catch (err) {
            console.error("Fetch error:", err);
            error.value = err;
            isLoading.value = false;
        }
    };

    return { data, error, isLoading, call };
}