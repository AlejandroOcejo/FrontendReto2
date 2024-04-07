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



// Definir la función draw()
function draw(): void {
    // Configuración del canvas
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error("No se pudo obtener el contexto 2D del canvas.");
        return;
    }

    // Ajusta el ancho del canvas para que coincida con el ancho del header
    canvas.width = headerWidth.value;
    canvas.height = 100; // ajusta según sea necesario

    // Carga tu logo (aquí debes reemplazar 'logoblanco.png' con la ruta de tu propio logo)
    const logo = new Image();
    logo.src = '../src/assets/logos/logoblanco.png'; // Ruta relativa desde la raíz del proyecto
    logo.onload = () => {
        // Calcula el factor de escala para ajustar el tamaño del logo proporcionalmente
        const scale = Math.min(canvas.width / logo.width, canvas.height / logo.height);

        // Calcula las dimensiones del logo ajustado
        const logoWidth = logo.width * scale;
        const logoHeight = logo.height * scale;

        // Inicializa la posición del logo para que comience desde el borde izquierdo del header
        let position = 0;

        // Configuración inicial
        const targetPosition = canvas.width / 2 - logoWidth / 2; // Centrar el logo
        const speed = 6; // Velocidad de movimiento
        let rotationAngle = 0; // Ángulo de rotación inicial
        let animation: number; // Variable para almacenar el identificador de la animación

      /*   function interpolateRotation(startAngle: number, targetAngle: number, t: number): number {
            // Función de interpolación para la rotación
            return startAngle + (targetAngle - startAngle) * t;
        } */

        function animate() {
            // Borra el canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calcula el ángulo de rotación basado en la posición horizontal
            const rotationSpeed = 0.05; // Velocidad de rotación
            rotationAngle += speed * rotationSpeed;

            // Dibuja el logo aplicando la rotación
            ctx.save();
            ctx.translate(position + logoWidth / 2, canvas.height / 2);
            ctx.rotate(rotationAngle);
            ctx.drawImage(logo, -logoWidth / 2, -logoHeight / 2, logoWidth, logoHeight);
            ctx.restore();

            // Mueve el logo hacia la derecha
            position += speed;

            // Si el logo alcanza la posición objetivo, detén la animación
            if (position >= targetPosition) {
                position = targetPosition;
                // Dibuja el logo una vez más sin aplicar rotación
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(logo, targetPosition, canvas.height / 2 - logoHeight / 2, logoWidth, logoHeight);
                cancelAnimationFrame(animation);
            } else {
                // Solicita al navegador que vuelva a dibujar la escena
                animation = requestAnimationFrame(animate);
            }
        }

        // Inicia la animación
        animation = requestAnimationFrame(animate);
    };
}



// Llama a la función draw() cuando el componente se monta
onMounted(() => {
    // Obtén el ancho del header
    headerWidth.value = document.querySelector('header')?.clientWidth || 0;
    draw();
});
</script>

<style scoped>
#canvas {
    z-index: 1;

    width: 200px;
    /* ajusta según sea necesario */
    height: 100px;
    /* ajusta según sea necesario */
}
</style>
