import { useSeatsStore } from "@/store/seats-store";
import useFetch from "./useFetch";


export default async function useSeatInfo(url: string, method: string, inputData: string | undefined) {
    const { setError, setData, setLoading, dataSeats } = useSeatsStore();
    const { data, error, isLoading, call } = useFetch();

    try {
        await call(url, method, inputData);
        setLoading(isLoading.value)
        if (Array.isArray(data.value)) {
            const mappedData = data.value.map(item => ({
                "id": item["id"],
                "number": item["number"],
                "userId": item["userId"],
                "price": item["price"],
                "state": item["state"],
            }));
            setData(mappedData), setError(null), setLoading(isLoading.value)
        } else {
            setData([]), setError(error), setLoading(isLoading.value)
        };
    } catch (err) {
        console.error('Error fetching seats:', err);
        setData([]), setError(err), setLoading(isLoading.value)
    };

}