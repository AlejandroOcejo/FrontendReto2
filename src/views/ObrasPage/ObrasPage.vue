<template>
  <div class="wrapper">
    <div class="content">
      <div class="obras-container">
        <div class="obra" v-for="obra in obras" :key="obra.name">
          <h2 class="obra-title">{{ obra.name }}</h2>
          <img :src="obra.image" alt="Imagen de la obra" class="obra-image">
        </div>
      </div>
    </div>
    <footer class="footer">
      <!-- Contenido de tu footer aquí -->
    </footer>
  </div>
</template>

<script setup lang="ts">
import useObrasInfo from '@/composables/useUsersInfo';
import { useObraStore } from '@/store/obras-store';
import { storeToRefs } from 'pinia';

const store = useObraStore();
const { dataObras: obras } = storeToRefs(store);
</script>

<style scoped>
.wrapper {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
}

.content {
  grid-row: 1;
}

.obras-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.obra {
  width: 200px;
  margin: 10px;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.obra-title {
  font-size: 1.2em;
  margin-bottom: 5px;
}

.obra-image {
  width: 100%;
  border-radius: 8px;
}

.footer {
  grid-row: 3;
}
</style>
