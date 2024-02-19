import useFetch from './useFetch';

export default async function useObrasInfo(url: string) {
    const { data, error, isLoading, call } = useFetch();
    try {
        await call(url);
        if (data.value && !Array.isArray(data.value)) {
            const mappedData = [{
                "activity": data.value["activity"],
                "type": data.value["type"],
                "participants": data.value["participants"],
                "price": data.value["price"],
                "alink": data.value["link"],
                "key": data.value["key"],
                "accessibility": data.value["accessibility"]
            }];
            return { data: mappedData, error: null, isLoading: isLoading.value };
        } else {
            return { data: null, error, isLoading: isLoading.value };
        }
    } catch (err) {
        console.error('Error fetching obras:', err);
        return { data: null, error: err, isLoading: isLoading.value };
    }
}