import { useObraStore } from '@/store/obras-store';
import useFetch from './useFetch';
import { useUserStore } from '@/store/user-store';
const { setError, setData, setLoading, dataUsers } = useUserStore();

export default async function useObrasInfo(url: string, method: string, inputData: string | undefined) {
    const { data, error, isLoading, call } = useFetch();
    try {
        await call(url, method, inputData);
        setLoading(isLoading.value)
        if (Array.isArray(data.value)) {
            const mappedData = data.value.map(item => ({
                "id": item["id"],
                "name": item["name"],
                "lastName": item["lastName"],
                "mail": item["mail"],
                "seats": item["seats"],
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