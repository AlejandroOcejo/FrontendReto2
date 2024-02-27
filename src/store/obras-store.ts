import { defineStore } from "pinia";
interface ObrasData {
    id: number;
    name: string;
    image: string;
    duration: number;
    genre: string;
    sessions: number;
}
export const useObraStore = defineStore({
    id: 'obrasList',
    state: () => ({
        data: [] as ObrasData[],
        error: null as Error | null,
        isLoading: false,
    }),
    actions: {
        setData(data: ObrasData[]) {
            this.data = data;
        },
        setError(error: Error) {
            this.error = error;
        },
        setLoading(isLoading: boolean) {
            this.isLoading = isLoading;
        },
    }
});