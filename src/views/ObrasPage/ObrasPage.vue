<template>
  <div class="wrapper">
    <div class="content">
      <ObraP />
    </div>
  </div>
</template>

<script setup lang="ts">

import ObraP from '@/components/Obra/ObraP.vue';

</script>

<style scoped>
.wrapper {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
}
</style>
