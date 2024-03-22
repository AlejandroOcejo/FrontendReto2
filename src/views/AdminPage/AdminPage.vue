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
import useSeatInfo from '@/composables/useSeatInfo';
import { useSeatsStore } from '@/store/seats-store';
import { useSalaStore } from '@/store/salas-store';
import useSalaInfo from '@/composables/useSalaInfo';


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
interface SeatFormData {
    id: number
    number: number;
    userId: number | null;
    price: number;
    state: string;
}

const seatformData = reactive<SeatFormData>({
    id: 0,
    number: 0,
    userId: 0,
    price: 0,
    state: '',
});
interface SalaFormData {
    id: number
    number: number,
    sessionId: number,
}
const salaformData = reactive<SalaFormData>({
    id: 0,
    number: 0,
    sessionId: 0,
});


const currentAction = ref('')
const currentTargetEndpoint = ref('')

const store = useObraStore();
const { dataObras: obras } = storeToRefs(store);
const Userstore = useUserStore();
const { dataUsers: users } = storeToRefs(Userstore);
const seatsStore = useSeatsStore();
const { dataSeats: seats } = storeToRefs(seatsStore);
const salaStore = useSalaStore();
const { dataSalas: salas } = storeToRefs(salaStore)


const submitPost = async (action: any, id?: number,) => {
    currentAction.value = action;
    switch (action) {
        case 'delete':
            if (currentTargetEndpoint.value === 'obras') {
                await useObrasInfo(`http://localhost:5255/obra/${id}`, 'DELETE', undefined);
                await fetchObrasInfo();
            } else if (currentTargetEndpoint.value === 'users') {
                await useUsersInfo(`http://localhost:5255/user/${id}`, 'DELETE', undefined);
                await fetchUsersInfo();
            } else if (currentTargetEndpoint.value === 'sala') {
                await useSalaInfo(`http://localhost:5255/sala/${id}`, 'DELETE', undefined);
                await fetchSalasInfo();
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
                }
            } else if (currentTargetEndpoint.value === 'users') {
                if (users && users.value) {
                    const elementToUpdate = users.value.find((element: { id: number }) => element.id === id);
                    if (elementToUpdate) {
                        elementToUpdate.seats = elementToUpdate.seats || [];
                        await useUsersInfo(`http://localhost:5255/user/${id}`, 'PUT', JSON.stringify(elementToUpdate));
                        await fetchUsersInfo();
                    }
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
            } else if (currentTargetEndpoint.value === 'seats') {
                await useSeatInfo("http://localhost:5255/seat", 'POST', JSON.stringify(seatformData));
                await fetchSeatsInfo();
            } else if (currentTargetEndpoint.value === 'sala') {
                await useSalaInfo("http://localhost:5255/sala", 'POST', JSON.stringify(salaformData));
                await fetchSalasInfo();
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
    else if (test == 'sala') {
        fetchSalasInfo();
        currentTargetEndpoint.value = test;
    }
}



async function fetchObrasInfo() {
    await useObrasInfo('http://localhost:5255/obra', 'GET', undefined);
    console.log(obras);
}
async function fetchUsersInfo() {
    await useUsersInfo('http://localhost:5255/user', 'GET', undefined);
    console.log(users);
}
async function fetchSeatsInfo() {
    await useSeatInfo('http://localhost:5255/seat', 'GET', undefined);
    console.log(seats);
}
async function fetchSalasInfo() {
    await useSalaInfo('http://localhost:5255/Sala', 'GET', undefined);
    console.log(salas);
}
</script>


<template>
    <main>
        <div :class="styles.sideMenu">
            <div :class="styles.obrasMenu">
                <div @click=" setTargetEndpoint('obras')">Obras</div>
            </div>
            <div :class="styles.usuariosMenu">
                <div @click=" setTargetEndpoint('users')">Usuarios</div>
            </div>
            <div :class="styles.asientosMenu">
                <div @click="setTargetEndpoint('seats')">Asientos</div>
            </div>
            <div :class="styles.asientosMenu">
                <div @click="setTargetEndpoint('sala')">Salas</div>
            </div>
        </div>
        <div :class="styles.display">
            <AdminFetchDisplay :action="currentAction" :data="obras" :formData="formData" :userformData="userformData"
                :seatformData="seatformData" @send-id="submitPost" :currentTargetEndpoint="currentTargetEndpoint"
                :salaformData="salaformData">
            </AdminFetchDisplay>
        </div>
        <PopUp :currentTargetEndpoint="currentTargetEndpoint" :action="currentAction">
        </PopUp>
    </main>
</template>

<style scoped></style>
