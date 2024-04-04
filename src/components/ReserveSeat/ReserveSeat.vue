<script setup lang="ts">

import { useSeatsStore } from '@/store/seats-store';
import { storeToRefs } from 'pinia';



const seatsStore = useSeatsStore();
const { dataSeats: seats } = storeToRefs(seatsStore)

</script>

<template>
    <div class="pruebaDiv">
        <div class="butacaDiv">
            <div v-for="element in seats" v-if="seats" class="seatsNumber">
                <Butaca v-if="element.userId == null" :color="'green'" class=" butacaSvg"
                    src="@/assets/icons/butaca.svg" alt="Butaca SVG" @click="selectedSeat(element.id)" />
                <Butaca v-if="element.userId != null" :color="'red'" class=" butacaSvg" src="@/assets/icons/butaca.svg"
                    alt="Butaca SVG" @click="selectedSeat(element.id)" />
                <a class="aTest">{{ element.id }}</a>
            </div>
        </div>
    </div>
</template>

<style scoped></style>