<script setup lang="ts">
import styles from './Footer.module.css';
</script>

<template>
    <footer :class="styles.footer">
        <div :class="styles.left_column">
            <img src="../../assets/logos/logoblanco.png" alt="" :class="styles.logo_footer">
        </div>

        <div :class="styles.center_column">
            <h2>Contactanos</h2>
            <div :class="styles.contact">
                <div>
                    <img src="../../assets/icons/Phone-handset.png" alt="" :class="styles.icon">
                    <p :class="styles.txt">+34 976 459 12 92</p>
                </div>
                <div><img src="../../assets/icons/correo-electronico.png" alt="" :class="styles.icon">
                    <p :class="styles.email_txt">teatralis@gmail.com</p>
                </div>
                <div><img src="../../assets/icons/pasador-de-ubicacion.png" alt="" :class="styles.icon">
                    <p :class="styles.txt">C/</p>
                </div>
            </div>
        </div>

        <div :class="styles.right_column">
            <div :class="styles.socials">
                <img src="../../assets/icons/logotipo-de-instagram.png" alt="">
                <img src="../../assets/icons/gorjeo.png" alt="">
                <img src="../../assets/icons/facebook.png" alt="">
            </div>
        </div>
    </footer>
</template>