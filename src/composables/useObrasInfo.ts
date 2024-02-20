import useFetch from './useFetch';

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
                "seats": item["seats"],
            }));
            return { data: mappedData, error: null, isLoading: isLoading.value };
        } else {
            return { data: null, error, isLoading: isLoading.value };
        }
    } catch (err) {
        console.error('Error fetching obras:', err);
        return { data: null, error: err, isLoading: isLoading.value };
    }
}

/* 
Este es el hook para hacer llamadas a useFetch, pasa la url a useFetch
tambien mapea la información, este es el que hay que llamar en los componentes,
hay que cambiarlo para obras, y hay que hacer uno para cada cosa que recibamos de la api
*/