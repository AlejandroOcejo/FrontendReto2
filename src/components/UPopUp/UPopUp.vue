<script setup lang="ts">
import { ref } from 'vue';

const showPopup = ref(false);

const togglePopUp = () => {
    showPopup.value = !showPopup.value;
}

const closePopUp = () => {
    showPopup.value = false;
}
</script>

<template>
    <button @click="togglePopUp">AAAAAAAA</button>
    <div v-if="showPopup" class="popup-overlay" @click="closePopUp">
        <div class="popup" @click.stop.passive>
            <button class="closeButton" @click="closePopUp">X</button>

            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    position: relative;
}

.closeButton {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 0px;
}
</style>