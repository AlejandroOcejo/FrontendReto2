import { useSessionsStore } from "@/store/sessions-store";
import useFetch from "./useFetch";

export default async function useSessionInfo(url: string, method: string, inputData: string | undefined) {
    const { setError, setData, setLoading, dataSessions } = useSessionsStore();
    const { data, error, isLoading, call } = useFetch();

    try {
        await call(url, method, inputData);
        setLoading(isLoading.value);

        if (Array.isArray(data.value)) {
            const mappedData = data.value.map(item => {
                const dateObj = new Date(item["date"]);
                const dateDay = dateObj.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: 'numeric' });
                const dateTime = dateObj.toLocaleTimeString(undefined, { timeStyle: 'long' });

                return {
                    "id": item["id"],
                    "dateDay": dateDay,
                    "dateTime": dateTime
                };
            });
            setData(mappedData), setError(null), setLoading(isLoading.value)
        } else {
            setData([]), setError(error), setLoading(isLoading.value)
        }
    } catch (err) {
        setData([]), setError(err), setLoading(isLoading.value)
    }
}
