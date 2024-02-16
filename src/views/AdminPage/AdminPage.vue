<script setup lang="ts">
import { ref } from 'vue';
import styles from './AdminPage.module.css';
import AdminFetchDisplay from '@/components/AdminFetchDisplay/AdminFetchDisplay.vue';
import useObrasInfo from '@/composables/useObrasInfo';

const isObrasMenuOpen = ref(false);
const isUsuariosMenuOpen = ref(false);

/* me cago en el que hizo typescript hay que hacer la mierda esta de abajo para todo lo que mandemos de la api tambien */

const obrasInfo = ref<{ data: { activity: string; type: string; participants: number; price: number; link: string; key: string; accessibility: number }[] | null, error: unknown, isLoading: boolean }>({
    data: null,
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
    const result = await useObrasInfo('https://www.boredapi.com/api/activity');
    obrasInfo.value = {
        data: result.data,
        error: result.error,
        isLoading: result.isLoading
    };
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
        <div v-for="obra in obrasInfo" :class="styles.display">
            <AdminFetchDisplay :data="obrasInfo.data"></AdminFetchDisplay>
        </div>
    </main>
</template>
