import { ref } from 'vue';

export default function usePost() {

    const Posterror = ref();
    const PostisLoading = ref(false);

    const doPost = async (url: string, postData: any) => {
        PostisLoading.value = true;
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
            PostisLoading.value = false;
        } catch (err) {
            console.error("Fetch error:", err);
            Posterror.value = err;
            PostisLoading.value = false;
        }
    };

    return { doPost, Posterror, PostisLoading };
}