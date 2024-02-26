<script setup lang="ts">
import styles from './AdminFetchDisplay.module.css';


defineProps<{
    data?: {
        id: number;
        name: string;
        image: string;
        duration: string;
        genre: string;
        sessions: any[];

    }[] | null;
    isLoading?: boolean
    error?: string
    action: string
    formData: {
        name: string,
        image: string,
        genre: string,
        duration: string,
        sessions: any[]
    };
}>()

const emit = defineEmits(['send-id']);


const sendId = (action: any, element: any,) => {
    emit('send-id', action, element);
};


</script>

<template>
    <div v-if="data">
        <table class="default">
            <tr>
                <th><b>Id</b></th>
                <th><b>name</b></th>
                <th><b>image</b></th>
                <th><b>duration</b></th>
                <th><b>genre</b></th>
            </tr>
            <tr v-for="element in data" :key="element.id">
                <td><b>{{ element.id }}</b></td>
                <td><input type="text" v-model="element.name" class="input-field"></td>
                <td><input type="text" v-model="element.image" class="input-field"></td>
                <td><input type="text" v-model="element.duration" class="input-field"></td>
                <td><input type="text" v-model="element.genre" class="input-field"></td>
                <td><button class="updateButton" @click="sendId('update', element.id,)">Actualizar</button></td>
                <td><button class="deleteButton" @click="sendId('delete', element.id,)">Borrar</button></td>
            </tr>
            <tr class="add-row">
                <td></td>
                <td><input type="text" placeholder="Nombre de la obra" v-model="formData.name" class="input-field"></td>
                <td> <input type="text" placeholder="Imagen" v-model="formData.image" class="input-field"> </td>
                <td> <input type="text" placeholder="Genero" v-model="formData.genre" class="input-field"> </td>
                <td> <input type="text" placeholder="Duración" v-model="formData.duration" class="input-field"></td>
                <td> <button class="addButton" @click="sendId('add', null,)">Añadir Obra</button></td>
            </tr>
        </table>
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

.updateButton {
    border: 1px lightgray solid;
    border-radius: 5px;
    background-color: white;
    padding: 6px;
}

.updateButton:hover {
    border: 1px lightgray solid;
    border-radius: 5px;
    background-color: rgb(238, 227, 126);
    padding: 6px;
    cursor: pointer;
    transition: 0.4s ease;
}

.addButton {
    border: 1px lightgray solid;
    border-radius: 5px;
    background-color: white;
    padding: 6px;
}

.addButton:hover {
    border: 1px lightgray solid;
    border-radius: 5px;
    background-color: rgb(137, 236, 137);
    padding: 6px;
    cursor: pointer;
    transition: 0.4s ease;
}

.add-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    background-color: beige;
}

.input-field {
    padding: 8px;
    border: 1px solid lightgray;
    border-radius: 5px;
    width: 200px;
}

.add-row {
    background-color: transparent !important;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}
</style>