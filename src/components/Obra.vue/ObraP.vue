<script setup lang="ts">
defineProps<{
    data: {
        id: number,
        name: string,
        image: string
    }[] | null;
    isLoading?: boolean
    error?: string
    action: string
    formData:{
        id: number ,
        name: string,
        image: string
    }[] | null;
}>()
</script>
<template></template>
<style></style>