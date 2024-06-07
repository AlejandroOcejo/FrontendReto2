<script setup lang="ts">
import UPopUp from '../UPopUp/UPopUp.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const obrasPage = computed(() => {
    return route.path === '/obras';
});

const obras = ref([
    { id: 1, name: 'La Traviata', genre: 'Opera', duration: '2h 30m', description: 'Una de las óperas más famosas de Verdi.', image: 'path/to/image1.jpg' },
    { id: 2, name: 'El lago de los cisnes', genre: 'Ballet', duration: '3h', description: 'El ballet más conocido de Tchaikovsky.', image: 'path/to/image2.jpg' },
    { id: 3, name: 'Hamlet', genre: 'Teatro', duration: '2h 45m', description: 'Una tragedia escrita por William Shakespeare.', image: 'path/to/image3.jpg' },
    { id: 4, name: 'La flauta mágica', genre: 'Opera', duration: '3h 15m', description: 'Una ópera en dos actos de Wolfgang Amadeus Mozart.', image: 'path/to/image4.jpg' },
]);

const searchQuery = ref('');

const filteredObras = computed(() => {
    if (!searchQuery.value) return obras.value;
    return obras.value?.filter(obra => {
        return obra.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
});

const uniqueGenres = computed(() => {
    return [...new Set(obras.value?.map(obra => obra.genre))];
});
    
const filteredObrasByGenre = (genre: string) => {
    return obras.value?.filter(obra => obra.genre === genre);
};

const reserve = (obraId: number) => {
    const obra = obras.value.find(o => o.id === obraId);
    if (obra) {
        localStorage.setItem('reservedObra', JSON.stringify({ id: obra.id, name: obra.name }));
        router.push({ name: 'reserve', params: { id: obraId } });
    }
}
</script>

<template>
    <div class="container" v-if="obrasPage">
        <input v-if="obrasPage" class="searchBar" type="text" v-model="searchQuery" placeholder="Nombre de la obra">
        <div class="obras-container">
            <div class="obra" v-for="obra in filteredObras" :key="obra.name">
                <h2 class="obra-title">{{ obra.name }}</h2>
                <img :src="obra.image" alt="Imagen de la obra" class="obra-image">
                <UPopUp :type="'button'" :label="'INFORMACIÓN'">
                    <div class="obraPopUp">
                        <h3 class="obra-title">{{ obra.name }}</h3>
                        <div>
                            Género: <b>{{ obra.genre }}</b>
                        </div>
                        <div>
                            Duración: <b>{{ obra.duration }}</b>
                        </div>
                        <div class="obraDescription">
                            {{ obra.description }}
                        </div>
                    </div>
                    <div class="button" @click="reserve(obra.id)">
                        Reservar
                    </div>
                </UPopUp>
            </div>
        </div>
    </div>
    <div class="container" v-if="!obrasPage">
        <div v-for="genre in uniqueGenres" :key="genre">
            <div class="genreTitle">{{ genre }}</div>
            <div class="obras-container-mainpage">
                <router-link class="obra-link" v-for="obra in filteredObrasByGenre(genre)" :to="'/obras'">
                    <div class="obra">
                        <h3 class="obra-title">{{ obra.name }}</h3>
                        <img :src="obra.image" alt="Imagen de la obra" class="obra-image">
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style>
.content {
    grid-row: 1;
}

.obras-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 75px;
    margin-left: 1%;
    margin-right: 1%;
}

.obra {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 350px;
    margin: 10px;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.obra-title {
    font-size: 1.2em;
    margin-bottom: 5px;
    text-align: center;
}

.obra-image {
    width: 100%;
    border-radius: 8px;
    height: 350px;
}

.obraPopUp {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    margin-bottom: 30px;
}

.button {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px lightgray solid;
    border-radius: 5px;
    background-color: white;
    padding: 6px;
    transition: background-color 0.4s ease;
    cursor: pointer;
    width: 150px;
    font-size: 120%;
    font-weight: bold;
}

.button:hover {
    background-color: #7E1034;
    color: white;
    transform: scale(1.1);
    cursor: pointer;
}

.searchBar {
    margin-top: 35px;
    margin-bottom: 35px;
    width: 300px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #7E1034;
    border-radius: 5px;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.obra-link {
    text-decoration: none;
    color: inherit;
}

.obras-container-mainpage {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-left: 1%;
    margin-right: 1%;
}

.genreTitle {
    text-align: center;
    font-weight: bolder;
    font-size: 250%;
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>
