<script setup lang="ts">
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

}
</script>

<template>
    <header :class="styles.header">
        <div :class="styles.logoDiv">
            <router-link to="/">
                <a :class="styles.logoa"><img src="../../assets/logos/logoblanco.png" alt=""></a>
            </router-link>
        </div>
        <div :class="styles.sidenav" id="mySidenav">
            <a href="javascript:void(0)" :class="styles.closebtn" @click="closeNav()">&times;</a>
            <nav>
                <router-link to="/reserva">Reserva</router-link>
                <router-link to="/registro">Registro</router-link>
                <router-link to="/iniciosesion">Inicio Sesion</router-link>
                <router-link to="/about">About</router-link>
            </nav>
            <a id="logoutLink" :class="styles.logoutLink" href="/" @click.prevent="logout()">Cerrar Sesión</a>
        </div>
        <span style="font-size:30px;position: absolute;right: 15px;cursor:pointer" @click="openNav()"><img
                src="../../assets/icons/iconomenu.png" alt=""></span>
    </header>

    <router-view />
</template>