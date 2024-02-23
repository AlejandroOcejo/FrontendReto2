<script setup lang="ts">
import { ref, reactive } from 'vue';
import styles from './AdminPage.module.css';
import AdminFetchDisplay from '@/components/AdminFetchDisplay/AdminFetchDisplay.vue';
import useObrasInfo from '@/composables/useObrasInfo';
import usePost from '@/composables/usePost';
import useDelete from '@/composables/useDelete';
import useUpdate from '@/composables/useUpdate';

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

const updatedElement = reactive<DataElement>({
    id: null,
    name: "",
    image: "",
    duration: "string",
    genre: "string",
    sessions: [],
})


const isObrasMenuOpen = ref(false);
const isUsuariosMenuOpen = ref(false);
const currentAction = ref('');
const { doPost, Posterror, PostisLoading } = usePost();
const { doDelete, Deleteerror, DeleteisLoading } = useDelete()
const { doUpdate, Updateerror, UpdateisLoading } = useUpdate()

const submitPost = async (id?: number) => {
    switch (currentAction.value) {
        case 'delete':
            await doDelete(`http://localhost:5255/obra/${id}`);
            await fetchObrasInfo()
            break;
        case 'update':
            const elementToUpdate = obrasInfo.value.data.find((element: DataElement) => element.id === id);
            if (elementToUpdate) {
                elementToUpdate.sessions = elementToUpdate.sessions || [];
                await doUpdate(`http://localhost:5255/obra/${id}`, elementToUpdate);
                await fetchObrasInfo();
            } else {
                console.error('Element not found for update');
            }
            break;
        case 'add':
            await doPost("http://localhost:5255/obra", formData);
            await fetchObrasInfo()
            break;
    }

    /* if (currentAction.value == 'delete') {
        doDelete(`http://localhost:5255/obra/${id}`);
    } else {
        doPost("http://localhost:5255/obra", formData);
    } */
};


function setAction(action: string) {
    if (currentAction.value != action) {
        currentAction.value = action;
        fetchObrasInfo();
    }
}

const obrasInfo = ref<{ data: any; error: any; isLoading: boolean }>({
    data: [],
    error: null,
    isLoading: false,
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
                        <div :class="styles.menuTitles" @click="setAction('add')">Añadir Obras</div>
                    </div>
                    <div :class="styles.deleteObras">
                        <div :class="styles.menuTitles" @click="setAction('delete')">Borrar Obras</div>
                    </div>
                    <div :class="styles.updateObras">
                        <div :class="styles.menuTitles" @click="setAction('update')">Actualizar Obras</div>
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
        <div :class="styles.display">
            <AdminFetchDisplay :action="currentAction" :data="obrasInfo.data" :formData="formData" @send-id="submitPost">
            </AdminFetchDisplay>

        </div>
    </main>
</template>
