<script setup lang="ts">
import styles from './MainPage.module.css'
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
</script>

<template>
  <main>
    <Header>

    </Header>
    <video :class="styles.video" autoplay muted>
      <source src="../../assets/videos/trailer1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <Footer>

    </Footer>
  </main>
</template>