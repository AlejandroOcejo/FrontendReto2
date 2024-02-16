<script setup lang="ts">
import styles from './AdminFetchDisplay.module.css';

defineProps<{
    data?: {
        activity: string;
        type: string;
        participants: number;
        price: number;
        link: string;
        key: string;
        accessibility: number;
    }[] | null;
    isLoading?: boolean
    error?: string
}>()


</script>

<template>
    <div>{{ data }}</div>
</template>