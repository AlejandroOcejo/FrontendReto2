<script setup lang="ts">
import styles from './MainPage.module.css'
</script>

<template>
  <main>
    <video :class="styles.video" autoplay muted>
      <source src="../../assets/videos/trailer1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </main>
</template>