<script setup lang="ts">
import styles from './AdminFetchDisplay.module.css';

defineProps<{
    data?: {
        activity: string;
        type: string;
        participants: number;
        price: number;
        alink: string;
        key: string;
        accessibility: number;
    }[] | null;
    isLoading?: boolean
    error?: string
}>()


</script>

<template>
    <div v-if="data">
        <div v-for="element in data" :key="element.key">
            <p>Activity: {{ element.activity }}</p>
            <p>Type: {{ element.type }}</p>
            <p>Participants: {{ element.participants }}</p>
            <p>Price: {{ element.price }}</p>
            <p>Link: {{ element.alink }}</p>
            <p>Key: {{ element.key }}</p>
            <p>Accessibility: {{ element.accessibility }}</p>
        </div>
    </div>
</template>  