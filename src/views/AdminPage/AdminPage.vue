<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import styles from './AdminPage.module.css';
import AdminFetchDisplay from '@/components/AdminFetchDisplay/AdminFetchDisplay.vue';
import PopUp from "@/components/PopUp/PopUp.vue";
import useObrasInfo from '@/composables/useObrasInfo';
import { useObraStore } from '@/store/obras-store';
import { storeToRefs } from 'pinia';


interface MyFormData {
    name: string;
    image: string;
    genre: string;
    duration: string;
    sessions: any[];
}

const formData = reactive<MyFormData>({
    name: '',
    image: '',
    genre: '',
    duration: '',
    sessions: [],
});

interface DataElement {
    id: number | null;
    name: string;
    image: string;
    duration: string;
    genre: string;
    sessions: any[];
}

const isObrasMenuOpen = ref(false);
const isUsuariosMenuOpen = ref(false);
const currentAction = ref('')
const currentTargetEndpoint = ref('')

const store = useObraStore();
const { dataObras: obras } = storeToRefs(store);

const submitPost = async (currentAction: any, id?: number,) => {
    if (currentTargetEndpoint.value === 'obras') {
        switch (currentAction) {
            case 'delete':
                await useObrasInfo(`http://localhost:5255/obra/${id}`, 'DELETE', undefined);
                break;
            case 'update':
                if (obras && obras.value) {
                    const elementToUpdate = obras.value.find((element: { id: number }) => element.id === id);
                    if (elementToUpdate) {
                        elementToUpdate.sessions = elementToUpdate.sessions || [];
                        await useObrasInfo(`http://localhost:5255/obra/${id}`, 'PUT', JSON.stringify(elementToUpdate));
                        await fetchObrasInfo();
                    }
                    else {
                        console.error('obras is undefined or obras.value is undefined');
                    }
                } else {
                    console.error('Element not found for update');
                }
                break;
            case 'add':
                await useObrasInfo("http://localhost:5255/obra", 'POST', JSON.stringify(formData));
                await fetchObrasInfo();
                break;
        }
    }
};


function setTargetEndpoint(test: string) {
    if (currentTargetEndpoint.value != test) {
        currentTargetEndpoint.value = test;
        fetchObrasInfo();
    }
}

function openObrasMenu() {
    isObrasMenuOpen.value = !isObrasMenuOpen.value;
}

function openUsuariosMenu() {
    isUsuariosMenuOpen.value = !isUsuariosMenuOpen.value;
}

async function fetchObrasInfo() {
    await useObrasInfo('https://reqres.in/api/users', 'GET', undefined);
    console.log(obras);
}

</script>


<template>
    <main>
        <div :class="styles.sideMenu">
            <div :class="styles.obrasMenu">
                <div @click="openObrasMenu(), setTargetEndpoint('obras')">Obras</div>
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
        <div :class="styles.display">
            <AdminFetchDisplay :action="currentAction" :data="obras" :formData="formData" @send-id="submitPost">
            </AdminFetchDisplay>
        </div>
        <!--         <div>
            <button @click="showNotification">Mostrar Notificación</button>
            <PopUp ref="popup" />
        </div> -->
    </main>
</template>
