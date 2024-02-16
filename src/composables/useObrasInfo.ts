import { ref } from 'vue';
import useFetch from './useFetch';


export default async function useObrasInfo(url: string) {
    const { data, error, isLoading, call } = useFetch();

    try {
        await call(url);
        if (data.value) {
            const mappedData = data.value.map((result) => ({
                /* esta mierda hay que hacerla para nuestra api en concreto dependiendo de lo que nos devuelva
                "activity" pues lo tendriamos que cambiar por "obraId"...  */
                "activity": result["activity"],
                "type": result["type"],
                "participants": result["participants"],
                "price": result["price"],
                "link": result["link"],
                "key": result["key"],
                "accessibility": result["latitude"]
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