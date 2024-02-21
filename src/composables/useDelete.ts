import { ref } from 'vue';

export default function useDelete() {

    const Deleteerror = ref();
    const DeleteisLoading = ref(false);

    const doDelete = async (url: string) => {
        DeleteisLoading.value = true;
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error: ${response.status}`);
            }
            DeleteisLoading.value = false;
        } catch (err) {
            console.error("Fetch error:", err);
            Deleteerror.value = err;
            DeleteisLoading.value = false;
        }
    };
    return { doDelete, Deleteerror, DeleteisLoading };
}