<script setup lang="ts">
import useObrasInfo from '@/composables/useObrasInfo';
import { useObraStore } from '@/store/obras-store';
import { storeToRefs } from 'pinia';


/* const store = useObraStore();
const { dataObras: obras } = storeToRefs(store); */
</script>

<template>
  <!--   <div v-for="obra in obras" :key="obra.name">
        <h2>{{ obra.name }}</h2>
        <img :src="obra.image" alt="Imagen de la obra">
    </div> -->
</template>
<style>
</style>