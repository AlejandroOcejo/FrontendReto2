import { useSalaStore } from "@/store/salas-store";
import useFetch from "./useFetch";

export default async function useSalaInfo(url: string, method: string, inputData: string | undefined) {
    const { setError, setData, setLoading, dataSalas } = useSalaStore();
    const { data, error, isLoading, call } = useFetch();

    try {
        await call(url, method, inputData);
        setLoading(isLoading.value);

        if (Array.isArray(data.value)) {
            const mappedData = data.value.map(item => ({
                "id": item["id"],
                "number": item["number"],
                "sessionId": item["sessionId"],
                "seats": item["seats"]
            }));
            setData(mappedData), setError(null), setLoading(isLoading.value)
        } else {
            setData([]), setError(error), setLoading(isLoading.value)
        }
    } catch (err) {
        setData([]), setError(err), setLoading(isLoading.value)
    }
}
