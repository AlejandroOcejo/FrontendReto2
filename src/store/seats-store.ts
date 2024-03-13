import { defineStore } from "pinia";
import { ref } from "vue";
interface seatsData {
    id: number;
    number: string;
    state: string;
    user:any;
    session: any;
}


export const useSeatsStore = defineStore('seatStore', () => {
    const dataSeats = ref<seatsData[]>()
    const seatError = ref<any>()
    const seatIsLoading = ref<boolean>()

    function setData(newData: seatsData[]) {
        dataSeats.value = newData;
    }

    function setError(err: any) {
        seatError.value = err;
    }

    function setLoading(loadingState: boolean) {
        seatIsLoading.value = loadingState;
    }

    return { setData, setError, setLoading, dataSeats, seatError, seatIsLoading }
})