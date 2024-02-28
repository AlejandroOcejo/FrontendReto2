<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useObraStore } from '@/store/obras-store';
import { storeToRefs } from 'pinia';

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
            <div>Wenos dias</div>
        </div>
    </div>
</template>

<style scoped>
.popup {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 999;
}
</style>