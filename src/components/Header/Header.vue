<template>
    <header :class="styles.header">
        <div :class="styles.logoDiv">
            <router-link to="/">
                <a :class="styles.logoa"><canvas id="canvas"></canvas></a>
            </router-link>
        </div>
        <div :class="styles.sidenav" id="mySidenav">
            <a href="javascript:void(0)" :class="styles.closebtn" @click="closeNav()">&times;</a>
            <nav>
                <router-link to="/obras">Reservar</router-link>
                <router-link to="/registro">Registro</router-link>
                <router-link to="/login">Inicio Sesion</router-link>
            </nav>
            <a id="logoutLink" :class="styles.logoutLink" href="/" @click.prevent="logout()">Cerrar Sesión</a>
        </div>
        <span style="font-size:30px;position: absolute;right: 15px;cursor:pointer" @click="openNav()"><img
                src="../../assets/icons/iconomenu.png" alt=""></span>
    </header>

    <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'; // Importa onMounted desde Vue
import styles from './Header.module.css';

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

function logout(): void {
    // Aquí puedes colocar la lógica para cerrar sesión
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

    // Carga tu logo (aquí debes reemplazar 'logoblanco.png' con la ruta de tu propio logo)
    const logo = new Image();
    logo.src = '../src/assets/logos/logoblanco.png'; // Ruta relativa desde la raíz del proyecto
    logo.onload = () => {
        canvas.width = logo.width; // Ajusta el ancho del canvas al ancho de la imagen
        canvas.height = logo.height;
    
    // Configuración inicial
    const initialPosition = -logo.width;
    const targetPosition = canvas.width / 2 - logo.width / 2;
    let position = initialPosition;
    const speed = 2; // Velocidad de movimiento
    let rotationAngle = 0; // Ángulo de rotación inicial
    let animation: number; // Variable para almacenar el identificador de la animación

    function animate() {
        // Borra el canvas
        ctx?.clearRect(0, 0, canvas.width, canvas.height);

        // Calcula el ángulo de rotación basado en la posición horizontal
        const rotationSpeed = 0.05; // Velocidad de rotación
        rotationAngle += speed * rotationSpeed;

        // Dibuja el logo aplicando la rotación
        ctx?.save();
        ctx?.translate(position + logo.width / 2, canvas.height / 2);
        ctx?.rotate(rotationAngle);
        ctx?.drawImage(logo, -logo.width / 2, -logo.height / 2);
        ctx?.restore();

        // Mueve el logo hacia la derecha
        position += speed;

        // Si el logo alcanza la posición objetivo, detén la animación
        if (position >= targetPosition) {
            position = targetPosition;
            cancelAnimationFrame(animation);
        } else {
            // Solicita al navegador que vuelva a dibujar la escena
            animation = requestAnimationFrame(animate);
        }
    }

    // Inicia la animación
    animation = requestAnimationFrame(animate);
}
}

// Llama a la función draw() cuando el componente se monta
onMounted(() => {
    draw();
});
</script>

<style scoped>
#canvas {
  width: 200px; /* ajusta según sea necesario */
  height: 100px; /* ajusta según sea necesario */
}
</style>