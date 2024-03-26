import { defineStore } from "pinia";
import { ref } from "vue";


export const useObraStore = defineStore('obraStore', () => {
    const isLoading = ref<boolean>()

    function setLoading(loadingState: boolean) {
        isLoading.value = loadingState;
    }

    return { setLoading, isLoading }
})