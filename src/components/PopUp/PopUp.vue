<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useObraStore } from '@/store/obras-store';
import { useSessionsStore } from '@/store/sessions-store';
import { useUserStore } from '@/store/user-store';
import { useSeatsStore } from '@/store/seats-store';
import { useReservesStore } from '@/store/reserve-store';
import { useSalaStore } from '@/store/salas-store';
import { storeToRefs } from 'pinia';


const storeObras = useObraStore();
const storeSessions = useSessionsStore();
const storeReserves = useReservesStore();
const storeUser = useUserStore();
const storeSeats = useSeatsStore();
const storeSalas = useSalaStore();

setupLoadingWatcher(storeObras, 'obraIsLoading');
setupLoadingWatcher(storeSessions, 'sessionIsLoading');
setupLoadingWatcher(storeUser, 'userIsLoading');
setupLoadingWatcher(storeReserves, 'seatIsLoading');
setupLoadingWatcher(storeSeats, 'seatIsLoading');
setupLoadingWatcher(storeSalas, 'salaIsLoading');

function setupLoadingWatcher(store: any, isLoadingProperty: any) {
    watch(() => store[isLoadingProperty], (isLoading) => {
        if (isLoading) {
            showPopup.value = true;
            setTimeout(() => {
                showPopup.value = false;
            }, 1000);
        }
    });
}
const anyLoading = computed(() => {
    return (
        Boolean(storeObras.obraIsLoading) ||
        Boolean(storeSessions.sessionIsLoading) ||
        Boolean(storeUser.userIsLoading) ||
        Boolean(storeReserves.seatIsLoading) ||
        Boolean(storeSeats.seatIsLoading) ||
        Boolean(storeSalas.salaIsLoading)
    );
});


watch(anyLoading, (loading) => {
    showPopup.value = loading;
});


const showPopup = ref(false);




</script>

<template>
    <div v-if="showPopup" class="loading-overlay">
        <div class="popup">
            <div class="loading-spinner"></div>
        </div>
    </div>
</template>

<style scoped>
.popup {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ffffffcc;
    border: 1px solid black;
    color: rgb(0, 0, 0);
    font-weight: bold;
    text-transform: uppercase;
    font-size: 120%;
    padding: 30px 40px;
    border-radius: 5px;
    z-index: 999;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loading-text {
    margin-top: 20px;
    color: white;
}
</style>