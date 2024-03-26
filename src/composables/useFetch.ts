import { ref } from 'vue'

export default function useFetch() {
    const data = ref([]);
    const error = ref();
    const call = async (url: string, method: string, inputData?: string | null) => {
        const requestOptions = {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: inputData
        };
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            } else {
                if (method == 'GET') {
                    const json = await response.json();
                    data.value = json;
                }
            }
        } catch (err) {
            console.error("Fetch error:", err);
            error.value = err;
        }
    };

    return { data, error, call };
}

/* 
Este hook se encarga de hacer el fetc, le entra una url y 
devuelve data que es la respuesta del fetch,
error que es el error si ocurre
isloading que es un booleano para saber si esta cargando la llamada
y call que es la funcion que recibe la url y se encarga de hacer el fetch
*/