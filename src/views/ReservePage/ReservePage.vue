<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import ReserveSeat from '@/components/ReserveSeat/ReserveSeat.vue';
import { useSessionsStore } from '@/store/sessions-store';
import Escenario from '@/components/Escenario/Escenario.vue';
import { useReservesStore } from '@/store/reserve-store';
import Butaca from '@/components/Butaca/Butaca.vue';
import { useSeatsStore } from '@/store/seats-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const sessionsStore = useSessionsStore();
const { dataSessions: sessions } = storeToRefs(sessionsStore)
const reserveStore = useReservesStore();
const { dataReserves: reserves } = storeToRefs(reserveStore)
const seatsStore = useSeatsStore();
const { dataSeats: seats } = storeToRefs(seatsStore)

const formattedSessions = sessions.value?.map(session => ({
    id: session.id,
    label: `${session.dateDay} - ${session.dateTime}`,
    value: session.id
}));
const selectedSessionId = ref(null);
seatsStore.getSessionsSeats(1)

</script>

<template>
    <Header></Header>
    <div class="mainDiv">
        <div class="escenarioDiv">
            <Escenario />
        </div>
        <div class="middleDiv">
            <div>
                <Dropdown v-model="selectedSessionId" :options="formattedSessions" placeholder="Selecciona la sesión"
                    option-label="label" option-value="value">
                </Dropdown>
            </div>
            <ReserveSeat :selectedSessionId="selectedSessionId" />
        </div>
    </div>
    <Footer></Footer>
</template>


<style scoped>
.mainDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}

.middleDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.escenarioDiv {
    margin-top: 20px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
