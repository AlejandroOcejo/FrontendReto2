import { ref } from 'vue'

export default function useFetch() {
    const data = ref([]);
    const error = ref();
    const call = async (url: string, method: string, inputData?: string | null) => {
        const requestOptions = {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: inputData
        };
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            } else {
                if (method == 'GET') {
                    const json = await response.json();
                    data.value = json;
                }
            }
        } catch (err) {
            console.error("Fetch error:", err);
            error.value = err;
        }
    };

    return { data, error, call };
}