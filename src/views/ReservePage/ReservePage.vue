<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import ReserveSeat from '@/components/ReserveSeat/ReserveSeat.vue';
import { useSessionsStore } from '@/store/sessions-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const sessionsStore = useSessionsStore();
const { dataSessions: sessions } = storeToRefs(sessionsStore)
const formattedSessions = sessions.value?.map(session => ({
    id: session.id,
    label: `${session.dateDay} - ${session.dateTime}`,
    value: session.id
}));
const selectedSessionId = ref(null);

</script>

<template>
    <Header></Header>
    <Dropdown v-model="selectedSessionId" :options="formattedSessions" placeholder="Selecciona la sesión"
        option-label="label" option-value="value">
    </Dropdown>
    <ReserveSeat>

    </ReserveSeat>
    <Footer></Footer>
</template>

<style scoped></style>
