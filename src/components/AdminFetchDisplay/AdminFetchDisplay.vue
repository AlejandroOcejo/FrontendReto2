<script setup lang="ts">
import styles from './AdminFetchDisplay.module.css';

defineProps<{
    data?: {
        id: number;
        name: string;
        image: string;
        duration: string;
        genre: string;
        sessions: string[];

    }[] | null;
    isLoading?: boolean
    error?: string
    action: string
    formData: {
        name: string,
        image: string,
        genre: string,
        duration: string,
        sessions: []
    };
}>()

const emit = defineEmits<{
    (e: 'delete-obra', id: number): void
}>();

const deleteObra = (id: number) => {
    emit('delete-obra', id);
};


</script>

<template>
    <div v-if="data">
        <div v-if="action == 'add'">
            <input type="text" placeholder="Nombre de la obra" v-model="formData.name">
            <input type="text" placeholder="Imagen" v-model="formData.image">
            <input type="text" placeholder="Genero" v-model="formData.genre">
            <input type="text" placeholder="Duración" v-model="formData.duration">
            <slot></slot>
        </div>
        <div v-if="action == 'delete'">
            <table class="default">
                <tr>
                    <th><b>Id</b></th>
                    <th><b>name</b></th>
                    <th><b>image</b></th>
                    <th><b>duration</b></th>
                    <th><b>genre</b></th>
                    <th><b>sessions</b></th>
                </tr>
                <tr v-for="element in data" :key="element.id">
                    <td><b>{{ element.id }}</b></td>
                    <td>{{ element.name }}</td>
                    <td>{{ element.image }}</td>
                    <td>{{ element.duration }}</td>
                    <td>{{ element.genre }}</td>
                    <td>{{ element.sessions }}</td>
                    <td><button class="deleteButton" @click="deleteObra(element.id)">Borrar</button></td>
                </tr>
            </table>
        </div>
    </div>
</template>  

<style scoped>
table {
    border-collapse: collapse;
}

th {
    text-align: center;
    padding: 8px;
    font-size: 20px;
    text-transform: uppercase;
}

td {
    text-align: center;
    padding: 8px;
    font-size: 16px;
}

tr:nth-child(even) {
    background-color: beige;
}

.deleteButton {
    border: 1px lightgray solid;
    border-radius: 5px;
    background-color: white;
    padding: 6px;
}

.deleteButton:hover {
    border: 1px lightgray solid;
    border-radius: 5px;
    background-color: rgb(238, 126, 126);
    padding: 6px;
    cursor: pointer;
    transition: 0.4s ease;
}
</style>