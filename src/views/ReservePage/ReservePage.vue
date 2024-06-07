<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import ReserveSeat from '@/components/ReserveSeat/ReserveSeat.vue';
import Escenario from '@/components/Escenario/Escenario.vue';
import Butaca from '@/components/Butaca/Butaca.vue';
import { ref } from 'vue';
const sessions = ref([
    { id: 1, dateDay: '2024-06-10', dateTime: '18:00', obraId: 1 },
    { id: 2, dateDay: '2024-06-11', dateTime: '20:00', obraId: 2 },
    { id: 3, dateDay: '2024-06-12', dateTime: '19:00', obraId: 3 },
    { id: 4, dateDay: '2024-06-13', dateTime: '21:00', obraId: 4 }
]);

const formattedSessions = sessions.value.map(session => ({
    id: session.id,
    label: `${session.dateDay} - ${session.dateTime}`,
    value: session.id
}));

const selectedSessionId = ref(JSON.parse(localStorage.getItem('selectedSessionId')) || null);

const handleSessionChange = (sessionId) => {
    localStorage.setItem('selectedSessionId', JSON.stringify(sessionId));
};

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
                    option-label="label" option-value="value" @change="handleSessionChange">
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
