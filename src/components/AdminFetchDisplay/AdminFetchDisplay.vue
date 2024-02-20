<script setup lang="ts">
import styles from './AdminFetchDisplay.module.css';

defineProps<{
    data?: {
        id: number;
        name: string;
        image: string;
        duration: string;
        genre: string;
        seats: string[];

    }[] | null;
    isLoading?: boolean
    error?: string
    action: string
    formData: {
        name: string,
        image: string,
        genre: string,
        duration: string,
    };
}>()


</script>

<template>
    <div v-if="data">
        <div v-if="action == 'add'">
            <input type="text" placeholder="Nombre de la obra" v-model="formData.name">
            <input type="text" placeholder="Imagen" v-model="formData.image">
            <input type="text" placeholder="Genero" v-model="formData.genre">
            <input type="text" placeholder="Duración" v-model="formData.duration">
            <div>TESTESTESTESTADD</div>
            <slot></slot>
        </div>
        <div v-if="action == 'delete'">
            <div v-for="element in data" :key="element.id">
                <p>ID: {{ element.id }}</p>
                <p>Name: {{ element.name }}</p>
                <p>Image: {{ element.image }}</p>
                <p>Duration: {{ element.duration }}</p>
                <p>Genre: {{ element.genre }}</p>
                <p>Seats: {{ element.seats }}</p>
            </div>
            <div>DELETEDELETEDELETE</div>
        </div>
    </div>
</template>  