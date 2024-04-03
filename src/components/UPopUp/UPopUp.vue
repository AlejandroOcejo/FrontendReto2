<script setup lang="ts">
import { ref } from 'vue';
import Butaca from '../Butaca/Butaca.vue';

defineProps<{
    label?: {

    },
    type: string,
    image?: string
}>()

const showPopup = ref(false);

const togglePopUp = () => {
    showPopup.value = !showPopup.value;
}

const closePopUp = () => {
    showPopup.value = false;
}

const getImagePath = (image: string | undefined) => {
    const basePath = "../../src/assets/icons/";
    let imgSrc = basePath + image + ".png";
    console.log(imgSrc);

    return imgSrc
}

</script>

<template>
    <img v-if="type === 'img'" class="image" @click="togglePopUp" :src="getImagePath(image)">
    <Butaca v-if="type === 'butaca'" :color="'grey'" class="butaca" @click="togglePopUp" />
    <button v-if="type == 'button'" class="button" @click="togglePopUp">{{ label }}</button>
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

.button {
    border: 1px lightgray solid;
    border-radius: 5px;
    background-color: white;
    padding: 6px;
    transition: background-color 0.4s ease;
    cursor: pointer;
    width: 200px;
    font-size: 120%;
    font-weight: bold;
}

.button:hover {
    background-color: #7E1034;
    color: white;
    transform: scale(1.1);
    cursor: pointer;
}

.image {
    width: 35px;
    height: 35px;
}

.image:hover {
    transform: scale(1.1);
    cursor: pointer;
}

.butacaSvg {
    max-width: 25px;
    max-height: 30px;
    margin: 10px;
    box-sizing: border-box;
    cursor: pointer;
}

.butacaSvg:hover {
    transform: scale(1.2);
    cursor: pointer;
}
</style>