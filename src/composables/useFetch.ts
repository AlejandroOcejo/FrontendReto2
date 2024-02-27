import { ref } from 'vue'
import { useObraStore } from '@/store/obras-store';

export default function useFetch() {
    const obrasStore = useObraStore();

    const call = async ( url : string) => {
        obrasStore.setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error: ${response.status}`);
            }
            const json = await response.json();
            obrasStore.setData(json);
            obrasStore.setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            obrasStore.setError(err instanceof Error ? err : new Error(String(err)));
            obrasStore.setLoading(false);
        }
    };

    return { data: obrasStore.data, error: obrasStore.error, isLoading: obrasStore.isLoading, call };
}

/* 
Este hook se encarga de hacer el fetc, le entra una url y 
devuelve data que es la respuesta del fetch,
error que es el error si ocurre
isloading que es un booleano para saber si esta cargando la llamada
y call que es la funcion que recibe la url y se encarga de hacer el fetch
*/