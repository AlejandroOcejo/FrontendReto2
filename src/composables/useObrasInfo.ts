import { useObraStore } from '@/store/obras-store';
import useFetch from './useFetch';
const { setError, setData, setLoading, dataObras } = useObraStore();

export default async function useObrasInfo(url: string) {
    const { data, error, isLoading, call } = useFetch();
    try {
        await call(url);
        if (Array.isArray(data.value)) {
            const mappedData = data.value.map(item => ({
                "id": item["id"],
                "name": item["name"],
                "image": item["image"],
                "duration": item["duration"],
                "genre": item["genre"],
                "sessions": item["sessions"],
            }));
            setData(mappedData), setError(null), setLoading(isLoading.value)
        } else {
            setData([]), setError(error), setLoading(isLoading.value)
        };
    } catch (err) {
        console.error('Error fetching obras:', err);
        setData([]), setError(err), setLoading(isLoading.value)
    };
}