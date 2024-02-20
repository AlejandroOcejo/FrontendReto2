import { ref } from 'vue';

export default function usePost() {

    const data = ref(null);
    const error = ref();
    const isLoading = ref(false);

    const doPost = async (url: string, postData: any) => {
        isLoading.value = true;
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        };
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                console.log(response);

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


    // Return the doPost function along with the reactive properties
    return { doPost, data, error, isLoading };
}
