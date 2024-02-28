<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import styles from './AdminPage.module.css';
import AdminFetchDisplay from '@/components/AdminFetchDisplay/AdminFetchDisplay.vue';
import PopUp from "@/components/PopUp/PopUp.vue";
import useObrasInfo from '@/composables/useObrasInfo';
import { useObraStore } from '@/store/obras-store';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user-store';
import useUsersInfo from '@/composables/useUsersInfo';


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

interface UserFormData {
    name: string;
    lastName: string;
    mail: string;
    seats: any[];
}

const userformData = reactive<UserFormData>({
    name: '',
    lastName: '',
    mail: '',
    seats: [],
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
const Userstore = useUserStore();
const { dataUsers: users } = storeToRefs(Userstore);

const submitPost = async (currentAction: any, id?: number,) => {

    switch (currentAction) {
        case 'delete':
            if (currentTargetEndpoint.value === 'obras') {
                await useObrasInfo(`http://localhost:5255/obra/${id}`, 'DELETE', undefined);
                await fetchObrasInfo();
            } else if (currentTargetEndpoint.value === 'users') {
                await useUsersInfo(`http://localhost:5255/user/${id}`, 'DELETE', undefined);
                await fetchUsersInfo();
            }
            break;
        case 'update':
            if (currentTargetEndpoint.value === 'obras') {
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
            } else if (currentTargetEndpoint.value === 'users') {
                if (users && users.value) {
                    const elementToUpdate = users.value.find((element: { id: number }) => element.id === id);
                    if (elementToUpdate) {
                        elementToUpdate.seats = elementToUpdate.seats || [];
                        await useUsersInfo(`http://localhost:5255/user/${id}`, 'PUT', JSON.stringify(elementToUpdate));
                        await fetchUsersInfo();
                    }
                    else {
                        console.error('users is undefined or obras.value is undefined');
                    }
                } else {
                    console.error('Element not found for update');
                }
            }
            break;
        case 'add':
            if (currentTargetEndpoint.value === 'obras') {
                await useObrasInfo("http://localhost:5255/obra", 'POST', JSON.stringify(formData));
                await fetchObrasInfo();
            } else if (currentTargetEndpoint.value === 'users') {
                await useUsersInfo("http://localhost:5255/user", 'POST', JSON.stringify(userformData));
                await fetchUsersInfo();
            }
            break;
    }

};

function setTargetEndpoint(test: string) {
    if (test == 'obras') {
        fetchObrasInfo();
        currentTargetEndpoint.value = test;
    } else if (test == 'users') {
        fetchUsersInfo();
        currentTargetEndpoint.value = test;
    }
}

function openObrasMenu() {
    isObrasMenuOpen.value = !isObrasMenuOpen.value;
}

function openUsuariosMenu() {
    isUsuariosMenuOpen.value = !isUsuariosMenuOpen.value;
}

async function fetchObrasInfo() {
    await useObrasInfo('http://localhost:5255/obra', 'GET', undefined);
    console.log(obras);
}
async function fetchUsersInfo() {
    await useUsersInfo('http://localhost:5255/user', 'GET', undefined);
    console.log(users);
}
</script>


<template>
    <main>
        <div :class="styles.sideMenu">
            <div :class="styles.obrasMenu">
                <div @click="openObrasMenu(), setTargetEndpoint('obras')">Obras</div>
            </div>
            <div :class="styles.usuariosMenu">
                <div @click="openUsuariosMenu(), setTargetEndpoint('users')">Usuarios</div>
            </div>
        </div>
        <div :class="styles.display">
            <AdminFetchDisplay :action="currentAction" :data="obras" :formData="formData" :userformData="userformData"
                @send-id="submitPost" :currentTargetEndpoint="currentTargetEndpoint">
            </AdminFetchDisplay>
        </div>
        <PopUp>
        </PopUp>
    </main>
</template>
