<script setup lang="ts">
import { ref } from 'vue';
import styles from './AdminPage.module.css';
import AdminFetchDisplay from '@/components/AdminFetchDisplay/AdminFetchDisplay.vue';
import useObrasInfo from '@/composables/useObrasInfo';

const isObrasMenuOpen = ref(false);
const isUsuariosMenuOpen = ref(false);

const obrasInfo = ref<{ data: any; error: any; isLoading: boolean }>({
    data: [],
    error: null,
    isLoading: false
});


function openObrasMenu() {
    isObrasMenuOpen.value = !isObrasMenuOpen.value;
}

function openUsuariosMenu() {
    isUsuariosMenuOpen.value = !isUsuariosMenuOpen.value;
}

async function fetchObrasInfo() {
    const result = await useObrasInfo('http://localhost:5255/obra');
    obrasInfo.value = {
        data: result.data,
        error: result.error,
        isLoading: result.isLoading
    };
    console.log(result);
}


</script>


<template>
    <main>
        <div :class="styles.sideMenu">
            <div :class="styles.obrasMenu">
                <div @click="openObrasMenu()">Obras</div>
                <div :class="[styles.sideSubMenu, isObrasMenuOpen ? styles.menuOpen : '']">
                    <div :class="styles.addObras">
                        <div :class="styles.menuTitles" @click="fetchObrasInfo()">
                            Añadir
                            Obras</div>
                    </div>
                    <div :class="styles.deleteObras">
                        <div :class="styles.menuTitles">Borrar Obras</div>
                    </div>
                    <div :class="styles.updateObras">
                        <div :class="styles.menuTitles">Actualizar Obras</div>
                    </div>
                </div>
            </div>
            <div :class="styles.usuariosMenu">
                <div @click="openUsuariosMenu()">Usuarios</div>
                <div :class="[styles.sideSubMenu, isUsuariosMenuOpen ? styles.menuOpen : '']">
                    <div :class="styles.addUsuarios">
                        <div :class="styles.menuTitles">Añadir Usuarios</div>
                    </div>
                    <div :class="styles.deleteUsuarios">
                        <div :class="styles.menuTitles">Borrar Usuarios</div>
                    </div>
                    <div :class="styles.updateUsuarios">
                        <div :class="styles.menuTitles">Actualizar Usuarios</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="element in obrasInfo.data" :key="element.key" :class="styles.display">
            <AdminFetchDisplay :data="obrasInfo.data"></AdminFetchDisplay>
        </div>

    </main>
</template>
