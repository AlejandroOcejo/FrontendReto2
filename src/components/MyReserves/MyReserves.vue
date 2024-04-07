<script setup lang="ts">
import { useSeatsStore } from '@/store/seats-store';
import { storeToRefs } from 'pinia';
import { useReservesStore } from '@/store/reserve-store';
import { useLocalStore } from '@/store/local-store';

const seatsStore = useSeatsStore();
const { dataSeats: seats } = storeToRefs(seatsStore);
const reserveStore = useReservesStore();
const { dataReserves: reserves } = storeToRefs(reserveStore);
const localStore = useLocalStore();
const { idLocal: idLocal } = storeToRefs(localStore);

reserveStore.getReservesByUserId(idLocal.value);
</script>

<template>
    <div class="reservation">
        <h1 class="title">Mis reservas:</h1>
        <ul>
            <li v-for="reserve in reserves" :key="reserve.id" class="reservation-item">
                <span class="session-name"><b>Nombre de la Obra:</b> {{ reserve.session?.obra?.name }}</span>
                <span class="seat-number"><b>Numero de asiento:</b> {{ reserve.seat?.number }}</span>
                <span class="date"><b>Día</b>{{ reserve.dateDay }}</span>
                <span class="time"><b>Hora</b>{{ reserve.dateTime }}</span>
                <span class="price"><b>Precio</b>{{ reserve.price }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.reservation {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.reservation-item {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 10px 0;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    width: 100%;
}

.session-details {
    flex: 1;
}

.session-time {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.title {
    margin-top: 50px;
    margin-bottom: 30px;
    font-size: 55px;
    text-align: center;
}

@media screen and (max-width: 768px) {
    .reservation-item {
        flex-direction: column;
        gap: 10px;
    }
}
</style>
