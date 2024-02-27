import { useObraStore } from '@/store/obras-store';

export default async function useObrasInfo(url: string) {
    const obrasStore = useObraStore(); 

    try {
        obrasStore.setLoading(true); 
        const response = await fetch(url);
        if (!response.ok) {
            console.log(response);
            throw new Error(`Error: ${response.status}`);
        }
        const json = await response.json();
        obrasStore.setData(json); 
        obrasStore.setLoading(false); 

        
        const mappedData = json.map((item : any)=> ({
            "id": item.id,
            "name": item.name,
            "image": item.image,
            "duration": item.duration,
            "genre": item.genre,
            "sessions": item.sessions,
        }));

        return { data: mappedData, error: null, isLoading: false }; 
    } catch (err:any) {
        console.error('Error fetching obras:', err);
        obrasStore.setError(err); 
        obrasStore.setLoading(false); 
        return { data: null, error: err, isLoading: false }; 
    }
}
