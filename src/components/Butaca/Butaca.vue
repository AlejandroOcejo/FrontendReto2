<script setup lang="ts">

defineProps<{
    color: string

}>()

</script>

<template>
    <svg class="butacaSvg" width="140" height="160" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="120" height="90" rx="15" ry="15" :fill="`${color}`" stroke="black"
            stroke-width="2" />
        <rect x="10" y="120" width="20" height="40" rx="0" ry="0" :fill="`${color}`" stroke="black" stroke-width="2" />
        <rect x="110" y="120" width="20" height="40" rx="0" ry="0" :fill="`${color}`" stroke="black" stroke-width="2" />
        <rect x="10" y="65" width="120" height="70" rx="0" ry="0" :fill="`${color}`" stroke="black" stroke-width="2" />
        <rect x="10" y="115" width="120" height="20" rx="0" ry="0" :fill="`${color}`" stroke="black" stroke-width="2" />
        <rect x="0" y="65" width="20" height="60" rx="0" ry="0" :fill="`${color}`" stroke="black" stroke-width="2" />
        <rect x="120" y="65" width="20" height="60" rx="0" ry="0" :fill="`${color}`" stroke="black" stroke-width="2" />
    </svg>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 80" width="240" height="1350">
        <rect id="respaldo" x="5" y="10" width="45" height="40" :fill="color" rx="10" ry="10" />
        <text x="27" y="25" dominant-baseline="middle" text-anchor="middle" fill="white"></text>
        <rect id="base" x="5" y="47" width="45" height="15" :fill="color" rx="5" ry="5" />
        <rect id="resto" x="10" y="62" width="10" height="13" :fill="color" />
        <rect id="resto" x="35" y="62" width="10" height="13" :fill="color" />
        <rect id="resto" x="0" y="40" width="10" height="15" :fill="color" rx="2" ry="2" />
        <rect id="resto" x="45" y="40" width="10" height="15" :fill="color" rx="2" ry="2" />
    </svg> -->
</template>

<style scoped></style>