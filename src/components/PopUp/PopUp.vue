<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useObraStore } from '@/store/obras-store';
import { storeToRefs } from 'pinia';

defineProps<{
    currentTargetEndpoint: string
    action: string
}>()

const store = useObraStore();
const { obraIsLoading } = storeToRefs(store);

const showPopup = ref(false);


watch(obraIsLoading, (obraIsLoading) => {
    if (obraIsLoading) {
        showPopup.value = true;
        setTimeout(() => {
            showPopup.value = false;
        }, 3000);
    }
});


</script>

<template>
    <div v-if="showPopup">
        <div class="popup">
            <div v-if="action == 'add'">{{ "Añadiendo" + " " + currentTargetEndpoint }}</div>
            <div v-if="action == 'update'">{{ "Actualizando" + " " + currentTargetEndpoint }}</div>
            <div v-if="action == 'delete'">{{ "Borrando" + " " + currentTargetEndpoint }}</div>
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
</style>