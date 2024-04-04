<script setup lang="ts">
import styles from './MainPage.module.css'
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import ObraP from '@/components/Obra/ObraP.vue';

import { useObraStore } from '@/store/obras-store';
import { storeToRefs } from 'pinia';

const store = useObraStore();
const { dataObras: obras } = storeToRefs(store);

</script>

<template>
  <main>
    <Header>

    </Header>
    <video :class="styles.video" autoplay muted>
      <source src="../../assets/videos/trailer1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>

    <div>
      <ObraP />
    </div>

    <Footer>

    </Footer>
  </main>
</template>