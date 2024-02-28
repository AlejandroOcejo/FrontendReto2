import useFetch from "./useFetch";


export default async function useSeatInfo(url: string) {
    const { data, error, isLoading, call } = useFetch();
    try {
        /* await call(url) */

        if (Array.isArray(data.value)) {
            const mappedData = data.value.map(item => ({
                "id": item["id"],
                "number": item["number"],
                "state": item["state"],
                "userid": item["userid"],
                "user": item["user"],
                "sessionid": item["sessionid"],
                "session": item["session"],
            }));
            return { s_data: mappedData, s_error: null, s_isLoading: isLoading.value };
        } else {
            return { s_data: null, s_error: error, s_isLoading: isLoading.value };
        }
    } catch (err) {
        console.error('Error fetching seat:', err);
        return { s_data: null, s_error: err, s_isLoading: isLoading.value };
    }

}