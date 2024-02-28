import { defineStore } from "pinia";
import { ref } from "vue";
interface usersData {
    id: number;
    name: string;
    lastName: string;
    mail: string;
    seats: any;
}


export const useUserStore = defineStore('userStore', () => {
    const dataUsers = ref<usersData[]>()
    const userError = ref<any>()
    const userIsLoading = ref<boolean>()

    function setData(newData: usersData[]) {
        dataUsers.value = newData;
    }

    function setError(err: any) {
        userError.value = err;
    }

    function setLoading(loadingState: boolean) {
        userIsLoading.value = loadingState;
    }

    return { setData, setError, setLoading, dataUsers, userError, userIsLoading }
})