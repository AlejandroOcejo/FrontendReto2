<script setup lang="ts">

import ObraP from '@/components/Obra/ObraP.vue';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';

</script>

<template>
  <Header></Header>
  <div class="wrapper">
    <div class="content">
      <ObraP />
    </div>
  </div>
  <Footer></Footer>
</template>

<style scoped>
.wrapper {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
}
</style>
