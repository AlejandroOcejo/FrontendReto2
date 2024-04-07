<script setup lang="ts">
import { useSeatsStore } from '@/store/seats-store';
import { useReservesStore } from '@/store/reserve-store';
import { storeToRefs } from 'pinia';
import { ref, watch, defineProps } from 'vue';
import Butaca from '../Butaca/Butaca.vue';

const seatsStore = useSeatsStore();
const { dataSeats: seats } = storeToRefs(seatsStore)
const reserveStore = useReservesStore();
const { dataReserves: reserves } = storeToRefs(reserveStore)

const isReserved = (seatId: number) => {
    return reserves.value?.some(reserve => reserve.seat?.number === seatId);
}

const props = defineProps<{
    selectedSessionId: number | null
}>()

watch(() => props.selectedSessionId, (newSessionId) => {
    console.log("algo");
    if (newSessionId !== null) {
        seatsStore.getSessionsSeats(newSessionId);
        reserveStore.getReservesBySessionId(newSessionId)
    }
});

</script>

<template>
    <div class="display">
        <div>pantalla</div>
        <div class="butacaDiv" v-if="!props.selectedSessionId">
            <div v-for="element in seats" class="seatsNumber">
                <Butaca :color="'grey'" class="butacaSvg" src="@/assets/icons/butaca.svg" alt="Butaca SVG" @click="" />
            </div>
        </div>
        <div class="butacaDiv" v-else>
            <div v-for="element in seats" class="seatsNumber">
                <Butaca :color="isReserved(element.id) ? 'red' : 'green'" class="butacaSvg"
                    src="@/assets/icons/butaca.svg" alt="Butaca SVG" @click="" />
                <div class="num">{{ element.number }}</div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.display {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.butacaDiv {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: auto;
    width: 700px;
}

.butacaSvg {
    flex: 1 0 20%;
    max-width: 50px;
    max-height: 60px;
    margin: 10px;
    box-sizing: border-box;
    cursor: pointer;
}

.seatsNumber {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.num {
    margin-right: 4px;
}
</style>