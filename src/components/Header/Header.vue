<template>
    <header :class="styles.header">
        <div :class="styles.logoDiv">
            <router-link to="/">
                <a :class="styles.logoa"><canvas id="canvas"></canvas></a>
            </router-link>
        </div>
        <div :class="styles.sidenav" id="mySidenav">
            <a href="javascript:void(0)" :class="styles.closebtn" @click="closeNav()">&times;</a>
            <nav v-if="idLocal != 1 && idLocal != -1">
                <router-link to="/obras">Reservar</router-link>
                <router-link to="/myreserves">Mis reservas</router-link>
                <a href="/">Cerrar Sesión</a>
            </nav>
            <nav v-if="idLocal == -1">
                <router-link to="/adminPage">Administrador</router-link>
                <a href="/">Cerrar Sesión</a>
            </nav>
            <nav v-if="idLocal == 1">
                <router-link to="/obras">Reservar</router-link>
                <router-link to="/registro">Registro</router-link>
                <router-link to="/login">Inicio Sesion</router-link>
            </nav>
        </div>
        <span style="font-size:30px;position: absolute;right: 15px;cursor:pointer" @click="openNav()"><img
                src="../../assets/icons/iconomenu.png" alt=""></span>
    </header>

    <router-view />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'; // Importa onMounted y ref desde Vue

import styles from './Header.module.css';
import { useLocalStore } from '@/store/local-store';
import { storeToRefs } from 'pinia';

const localStore = useLocalStore();
const { idLocal: idLocal } = storeToRefs(localStore)

const headerWidth = ref(0);

function openNav(): void {
    const mySidenav: HTMLElement | null = document.getElementById("mySidenav");
    if (mySidenav !== null) {
        mySidenav.style.width = "250px";
    }
}

function closeNav(): void {
    const mySidenav: HTMLElement | null = document.getElementById("mySidenav");
    if (mySidenav !== null) {
        mySidenav.style.width = "0";
    }
}

const logout = () => {
    localStore.clearData
    console.log("click");
}



function draw(): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error("No se pudo obtener el contexto 2D del canvas.");
        return;
    }

    canvas.width = headerWidth.value;
    canvas.height = 100; 

    const logo = new Image();
    logo.src = '../src/assets/logos/logoblanco.png'; 
    logo.onload = () => {
        const scale = Math.min(canvas.width / logo.width, canvas.height / logo.height);

        const logoWidth = logo.width * scale;
        const logoHeight = logo.height * scale;

        let position = 0;

        const targetPosition = canvas.width / 2 - logoWidth / 2; 
        const speed = 6; 
        let rotationAngle = 0; 
        let animation: number;

        function animate() {
            ctx!.clearRect(0, 0, canvas.width, canvas.height);

            const rotationSpeed = 0.05; 
            rotationAngle += speed * rotationSpeed;

            ctx!.save();
            ctx!.translate(position + logoWidth / 2, canvas.height / 2);
            ctx!.rotate(rotationAngle);
            ctx!.drawImage(logo, -logoWidth / 2, -logoHeight / 2, logoWidth, logoHeight);
            ctx!.restore();

            position += speed;

            if (position >= targetPosition) {
                position = targetPosition;
                ctx!.clearRect(0, 0, canvas.width, canvas.height);
                ctx!.drawImage(logo, targetPosition, canvas.height / 2 - logoHeight / 2, logoWidth, logoHeight);
                cancelAnimationFrame(animation);
            } else {
                animation = requestAnimationFrame(animate);
            }
        }

        animation = requestAnimationFrame(animate);
    };
}



onMounted(() => {
    headerWidth.value = document.querySelector('header')?.clientWidth || 0;
    draw();
});
</script>

<style scoped>
#canvas {
    z-index: 1;
}
</style>
