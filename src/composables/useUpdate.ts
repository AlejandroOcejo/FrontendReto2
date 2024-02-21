import { ref } from 'vue';

export default function useUpdate() {

    const Updateerror = ref();
    const UpdateisLoading = ref(false);

    const doUpdate = async (url: string, postData: any) => {
        UpdateisLoading.value = true;
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        };
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error: ${response.status}`);
            }
            UpdateisLoading.value = false;
        } catch (err) {
            console.error("Fetch error:", err);
            Updateerror.value = err;
            UpdateisLoading.value = false;
        }
    };

    return { doUpdate, Updateerror, UpdateisLoading };
}