<script setup lang="ts">
import { useObraStore } from '@/store/obras-store';
import { storeToRefs } from 'pinia';
import UPopUp from '../UPopUp/UPopUp.vue';

const store = useObraStore();
const { dataObras: obras } = storeToRefs(store);
</script>

<template>
    <div class="obras-container">
        <div class="obra" v-for="obra in obras" :key="obra.name">
            <h2 class="obra-title">{{ obra.name }}</h2>
            <img :src="obra.image" alt="Imagen de la obra" class="obra-image">
            <UPopUp :type="'button'" :label="'INFORMACIÓN'"></UPopUp>
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
    margin-top: 75px;
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
}

.obra-image {
    width: 100%;
    border-radius: 8px;
    height: 350px;
}
</style>