<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(false);
const message = ref('');
let timeout: any = null;

const showPopup = (message: string, duration: 3000) => {
    console.log(message);

    timeout = setTimeout(() => {
        isVisible.value = false;
    }, duration);
};

const clearPopupTimeout = () => {
    clearTimeout(timeout);
};
</script>

<template>
    <div v-if="isVisible" class="popup">
        {{ message }}
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
  