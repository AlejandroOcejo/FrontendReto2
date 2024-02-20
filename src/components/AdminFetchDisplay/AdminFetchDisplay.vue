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
}>()


</script>

<template>
    <div v-if="data">
        <div v-for="element in data" :key="element.id">
            <p>ID: {{ element.id }}</p>
            <p>Name: {{ element.name }}</p>
            <p>Image: {{ element.image }}</p>
            <p>Duration: {{ element.duration }}</p>
            <p>Genre: {{ element.genre }}</p>
            <p>Seats: {{ element.seats }}</p>
        </div>
    </div>
</template>  