<script setup lang="ts">
import { useObraStore } from '@/store/obras-store';
import { useSeatsStore } from '@/store/seats-store';
import { useUserStore } from '@/store/user-store';
import { useSessionsStore } from '@/store/sessions-store';
import { useSalaStore } from '@/store/salas-store';
import { storeToRefs } from 'pinia';
import { ref, reactive } from 'vue';
import UPopUp from '../UPopUp/UPopUp.vue';
import useSessionInfo from '@/composables/useSessionsInfo';
import Calendar from "primevue/calendar"
import Dropdown from 'primevue/dropdown';
import useSalaInfo from '@/composables/useSalaInfo';


const store = useObraStore();
const { dataObras: obras } = storeToRefs(store)
const UserStore = useUserStore();
const { dataUsers: users } = storeToRefs(UserStore)
const seatsStore = useSeatsStore();
const { dataSeats: seats } = storeToRefs(seatsStore)
const sessionsStore = useSessionsStore();
const { dataSessions: sessions } = storeToRefs(sessionsStore)
const salaStore = useSalaStore();
const { dataSalas: salas } = storeToRefs(salaStore)



const state = ref(false)

defineProps<{
  formData: {
    name: string,
    image: string,
    genre: string,
    duration: string,
    sessions: any[]
  };
  userformData: {
    name: string,
    lastName: string,
    mail: string,
    seats: any[]
  };
  seatformData: {
    number: string,
    state: string,
    user: any;
    session: any;
  };
  salaformData: {
    number: number,
    sessionId: number,
  };
  currentTargetEndpoint: string
}>()

interface sessionFormData {
  obraId: number | undefined;
  salaId: number | undefined;
  date: any;
}

const sessionFormData = reactive<sessionFormData>({
  obraId: undefined,
  salaId: undefined,
  date: undefined,
});

interface salaFormData {
  id: number | undefined
  number: number | undefined,
  sessionId: number | undefined,
}


const salaFormData = reactive<salaFormData>({
  id: undefined,
  number: undefined,
  sessionId: undefined,
})

const emit = defineEmits(['send-id']);

const sendId = (action: any, element: any,) => {
  emit('send-id', action, element);
};

async function fetchSessionInfo() {
  await useSessionInfo('http://localhost:5255/Session', 'GET', undefined);
}

async function fetchObraSessionInfo(obraId: number) {
  await useSessionInfo(`http://localhost:5255/Obra/${obraId}/sessions`, 'GET', undefined);
}

async function fetchSalasInfo() {
  await useSalaInfo('http://localhost:5255/sala', 'GET', undefined)
}

async function createSession(obraId: number) {
  sessionFormData.obraId = obraId;
  await useSessionInfo(`http://localhost:5255/Session`, 'POST', JSON.stringify(sessionFormData));
  fetchObraSessionInfo(obraId)
}

</script>

<template>
  <div v-if="obras && currentTargetEndpoint === 'obras'">
    <table class="default">
      <tr>
        <th><b>Id</b></th>
        <th><b>name</b></th>
        <th><b>image</b></th>
        <th><b>duration</b></th>
        <th><b>genre</b></th>
        <th><b>Sessions</b></th>
      </tr>
      <tr class="add-row">
        <td></td>
        <td><input type="text" placeholder="Nombre de la obra" v-model="formData.name" class="input-field"></td>
        <td><input type="text" placeholder="Imagen" v-model="formData.image" class="input-field"></td>
        <td><input type="text" placeholder="Duración" v-model="formData.duration" class="input-field"></td>
        <td><input type="text" placeholder="Genero" v-model="formData.genre" class="input-field"></td>
        <td></td>
        <td><button class="addButton" @click="sendId('add', null)">Añadir Obra</button></td>
      </tr>
      <tr v-for="element in obras" :key="element.id">
        <td><b>{{ element.id }}</b></td>
        <td><input type="text" v-model="element.name" class="input-field"></td>
        <td><input type="text" v-model="element.image" class="input-field"></td>
        <td><input type="text" v-model="element.duration" class="input-field"></td>
        <td><input type="text" v-model="element.genre" class="input-field"></td>
        <td @click="fetchObraSessionInfo(element.id)">
          <UPopUp>
            <table>
              <tr>
                <td>
                  <Dropdown v-model="sessionFormData.salaId" placeholder="Numero de 1sala"
                    :options="salas?.map(sala => sala.id)" class="input-field" />

                </td>
                <td>
                  <Calendar v-model="sessionFormData.date" placeholder="Fecha y hora" showTime />
                </td>
                <td></td>
                <td><button class="addButton" @click="createSession(element.id)">Crear Sesión</button></td>
              </tr>
              <tr v-for="element in sessions">
                <td>
                  {{ sessionFormData.salaId }} aaaeee
                </td>
                <td>
                  <Calendar v-model="element.dateDay" />
                </td>
                <td>
                  <Calendar v-model="element.dateTime" timeOnly />
                </td>
                <td> <button class="updateButton" @click="sendId('update', element.id)">Actualizar</button></td>
                <td> <button class="deleteButton" @click="sendId('delete', element.id)">Borrar</button></td>
              </tr>
            </table>
          </UPopUp>
        </td>
        <td><button class="updateButton" @click="sendId('update', element.id)">Actualizar</button></td>
        <td><button class="deleteButton" @click="sendId('delete', element.id)">Borrar</button></td>
      </tr>
    </table>
  </div>
  <div v-if="users && currentTargetEndpoint === 'users'">
    <table class="default">
      <tr>
        <th><b>Id</b></th>
        <th><b>name</b></th>
        <th><b>lastname</b></th>
        <th><b>mail</b></th>
        <th><b>Seats</b></th>
      </tr>
      <tr class="add-row">
        <td></td>
        <td><input type="text" placeholder="Nombre del usuario" v-model="userformData.name" class="input-field"></td>
        <td><input type="text" placeholder="Imagen" v-model="userformData.lastName" class="input-field"></td>
        <td><input type="text" placeholder="Genero" v-model="userformData.mail" class="input-field"></td>
        <td></td>
        <td><button class="addButton" @click="sendId('add', null)">Añadir Usuario</button></td>
      </tr>
      <tr v-for="element in users" :key="element.id">
        <td><b>{{ element.id }}</b></td>
        <td><input type="text" v-model="element.name" class="input-field"></td>
        <td><input type="text" v-model="element.lastName" class="input-field"></td>
        <td><input type="text" v-model="element.mail" class="input-field"></td>
        <td></td>
        <td><button class="updateButton" @click="sendId('update', element.id)">Actualizar</button></td>
        <td><button class="deleteButton" @click="sendId('delete', element.id)">Borrar</button></td>
      </tr>

    </table>
  </div>
  <div v-if="seats && currentTargetEndpoint === 'seats'">
    <table class="default">
      <tr>
        <th><b>Id</b></th>
        <th><b>number</b></th>
        <th><b>state</b></th>
      </tr>
      <tr class="add-row">
        <td></td>
        <td><input type="text" placeholder="Nombre del usuario" v-model="userformData.name" class="input-field"></td>
        <td><input type="text" placeholder="Imagen" v-model="userformData.lastName" class="input-field"></td>
        <td><input type="text" placeholder="Genero" v-model="userformData.mail" class="input-field"></td>
        <td><button class="addButton" @click="sendId('add', null)">Añadir Usuario</button></td>
      </tr>
      <tr v-for="element in seats" :key="element.id">
        <td><b>{{ element.id }}</b></td>
        <td><input type="text" v-model="element.number" class="input-field"></td>
        <td><input type="text" v-model="element.state" class="input-field"></td>
        <td><button class="updateButton" @click="sendId('update', element.id)">Actualizar</button></td>
        <td><button class="deleteButton" @click="sendId('delete', element.id)">Borrar</button></td>
      </tr>
    </table>
  </div>
  <div v-if="salas && currentTargetEndpoint === 'sala'">
    <table class="default">
      <tr>
        <th></th>
        <th><b>Numero de sala</b></th>
        <th><b>Id de la Sesión</b></th>
      </tr>
      <tr class="add-row">
        <td></td>
        <td><input type="text" placeholder="Numero de Sala" v-model="salaformData.number" class="input-field"></td>
        <td>
          <Dropdown @click="fetchSessionInfo" v-model="salaformData.sessionId" placeholder="Sesión"
            :options="sessions?.map(session => session.id)" class="input-field" />
        </td>
        <td><button class="addButton" @click="sendId('add', null)">Añadir Sala</button></td>
      </tr>
      <tr v-for="element in salas" :key="element.number">
        <td></td>
        <td><input type="text" v-model="element.number" class="input-field"></td>
        <td><input type="text" v-model="element.sessionId" class="input-field"></td>
        <td><button class="updateButton" @click="sendId('update', element.id)">Actualizar</button></td>
        <td><button class="deleteButton" @click="sendId('delete', element.id)">Borrar</button></td>
      </tr>
    </table>
  </div>
</template> 

<style scoped>
table {
  border-collapse: collapse;
}

th {
  text-align: center;
  padding: 8px;
  font-size: 20px;
  text-transform: uppercase;
}

td {
  text-align: center;
  padding: 8px;
  font-size: 16px;
}

tr:nth-child(even) {
  background-color: beige;
}

.deleteButton {
  border: 1px lightgray solid;
  border-radius: 5px;
  background-color: white;
  padding: 6px;
  transition: background-color 0.4s ease;
  cursor: pointer;
}

.deleteButton:hover {
  background-color: rgb(238, 126, 126);
  transform: scale(1.1);
  cursor: pointer;
}

.updateButton {
  border: 1px lightgray solid;
  border-radius: 5px;
  background-color: white;
  padding: 6px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: background-color 0.4s ease;
  cursor: pointer;

}

.updateButton:hover {
  background-color: rgb(238, 227, 126);
  transform: scale(1.1);
  cursor: pointer;
}


.addButton {
  border: 1px lightgray solid;
  border-radius: 5px;
  background-color: white;
  padding: 6px;
  transition: background-color 0.4s ease;
  cursor: pointer;
}

.addButton:hover {
  background-color: rgb(137, 236, 137);
  transform: scale(1.1);
  cursor: pointer;
}

.add-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: beige;
}

.input-field {
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 200px;
}

.add-row {
  background-color: transparent !important;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

.p-dropdown,
.p-calendar {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  padding: 8px;
  font-size: 14px;
}

.p-dropdown {
  width: 200px;
}

.p-calendar {
  width: 200px;
}

:deep(.p-inputtext) {
  border: 1px solid transparent;
  box-shadow: none !important;
}

.divSessions {
  display: flex;
  gap: 20px;
  padding: 5px;
  justify-content: center;
  align-items: center;
}
</style>