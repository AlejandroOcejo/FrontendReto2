<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import styles from './AdminPage.module.css';
import AdminFetchDisplay from '@/components/AdminFetchDisplay/AdminFetchDisplay.vue';
import PopUp from "@/components/PopUp/PopUp.vue";
import { useObraStore } from '@/store/obras-store';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user-store';
import { useSeatsStore } from '@/store/seats-store';
import { useSalaStore } from '@/store/salas-store';


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

const Obrastore = useObraStore();
const { dataObras: obras } = storeToRefs(Obrastore);
const Userstore = useUserStore();
const { dataUsers: users } = storeToRefs(Userstore);
const seatsStore = useSeatsStore();
const { dataSeats: seats } = storeToRefs(seatsStore);
const salaStore = useSalaStore();
const { dataSalas: salas } = storeToRefs(salaStore)


const submitPost = async (action: any, id: number,) => {
    currentAction.value = action;
    switch (action) {
        case 'delete':
            if (currentTargetEndpoint.value === 'obras') {
                Obrastore.deleteObras(id)
            } else if (currentTargetEndpoint.value === 'users') {
                Userstore.deleteUser(id)
            } else if (currentTargetEndpoint.value === 'sala') {
                salaStore.deleteSalas(id)
            }
            break;
        case 'update':
            if (currentTargetEndpoint.value === 'obras') {
                if (obras && obras.value) {
                    const elementToUpdate = obras.value.find((element: { id: number }) => element.id === id);
                    if (elementToUpdate) {
                        elementToUpdate.sessions = elementToUpdate.sessions || [];
                        Obrastore.updateObras(id, JSON.stringify(elementToUpdate))
                    }
                }
            } else if (currentTargetEndpoint.value === 'users') {
                if (users && users.value) {
                    const elementToUpdate = users.value.find((element: { id: number }) => element.id === id);
                    if (elementToUpdate) {
                        elementToUpdate.seats = elementToUpdate.seats || [];
                        Userstore.updateUser(id, JSON.stringify(elementToUpdate))
                    }
                }
            }
            break;
        case 'add':
            if (currentTargetEndpoint.value === 'obras') {
                Obrastore.addObras(JSON.stringify(formData))
            } else if (currentTargetEndpoint.value === 'users') {
                Userstore.addUser(JSON.stringify(userformData));
            } else if (currentTargetEndpoint.value === 'seats') {
                seatsStore.addSeats(JSON.stringify(seatformData))
            } else if (currentTargetEndpoint.value === 'sala') {
                salaStore.addSalas(JSON.stringify(salaformData))
            }
            break;
    }
};

function setTargetEndpoint(test: string) {
    if (test == 'obras') {
        Obrastore.getObras()
        currentTargetEndpoint.value = test;
    } else if (test == 'users') {
        Userstore.getUser()
        currentTargetEndpoint.value = test;
    }
    else if (test == 'sala') {
        salaStore.getSalas()
        currentTargetEndpoint.value = test;
    }
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
