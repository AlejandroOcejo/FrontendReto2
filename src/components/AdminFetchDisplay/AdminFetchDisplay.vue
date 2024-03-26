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
import useSeatInfo from '@/composables/useSeatInfo';
import Butaca from '../Butaca/Butaca.vue';


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
    id: number,
    number: number,
    userId: number | null;
    state: string,
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
  salaNumber: number | undefined;
}

const sessionFormData = reactive<sessionFormData>({
  obraId: undefined,
  salaId: undefined,
  date: undefined,
  salaNumber: undefined
});

interface SalaFormData {
  id: number | undefined
  number: number | undefined,
  sessionId: number | undefined,
}

const salaFormData = reactive<SalaFormData>({
  id: undefined,
  number: undefined,
  sessionId: undefined,
})

interface SeatFormData {
  id: number | undefined
  number: number | undefined,
  userId: number | undefined | null,
  price: number | undefined | null,
  state: string | undefined,
}

const seatFormData = reactive<SeatFormData>({
  id: undefined,
  number: undefined,
  userId: undefined,
  price: undefined,
  state: undefined
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

async function fetchSeatsInSession(id: number) {
  await useSeatInfo(`http://localhost:5255/Session/${id}/seats`, 'GET', undefined)
}

async function createSession(obraId: number) {
  sessionFormData.obraId = obraId;
  await useSessionInfo(`http://localhost:5255/Session`, 'POST', JSON.stringify(sessionFormData));
  fetchObraSessionInfo(obraId)
}

const selectedSeat = (id: number) => {
  isButacaSelected.value = (true)
  selectedButacaId.value = (id)
  const matchingSeat = seats.value?.find(seat => seat.id === id);
  console.log(matchingSeat);
  selectedButaca.value = matchingSeat
}

const deselectButaca = () => {
  isButacaSelected.value = (false)
}

const isButacaSelected = ref(false)

const selectedButacaId = ref()

const selectedButaca = ref<SeatFormData>()


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
      <tr v-for="element in  obras " :key="element.id">
        <td><b>{{ element.id }}</b></td>
        <td><input type="text" v-model="element.name" class="input-field"></td>
        <td><input type="text" v-model="element.image" class="input-field"></td>
        <td><input type="text" v-model="element.duration" class="input-field"></td>
        <td><input type="text" v-model="element.genre" class="input-field"></td>
        <td @click=" fetchObraSessionInfo(element.id)">
          <UPopUp :label="'Boton'" @click="console.log('mierdon')">
            <table>
              <tr>
                <td>
                  <Dropdown @click="fetchSalasInfo" v-model="sessionFormData.salaId" placeholder="Numero de sala"
                    :options="salas?.map(sala => sala.id)" class="input-field" />
                </td>
                <td>
                  <Calendar v-model="sessionFormData.date" placeholder="Fecha y hora" showTime />
                </td>
                <td></td>
                <td></td>
                <td><button class="addButton" @click="createSession(element.id)">Crear Sesión</button></td>
              </tr>
              <tr v-for="element in  sessions ">
                <td>
                  <b>{{ element.salaNumber }}</b>
                </td>
                <td>
                  <Calendar v-model="element.dateDay" />
                </td>
                <td>
                  <Calendar v-model="element.dateTime" timeOnly />
                </td>
                <td @click="fetchSeatsInSession(element.id)">
                  <UPopUp :label="'Boton'">
                    <div class="pruebaDiv">
                      <div class="butacaDiv">
                        <div v-for="element in seats" v-if="!isButacaSelected" class="seatsNumber">
                          <Butaca v-if="element.userId == null" :color="'green'" class=" butacaSvg"
                            src="@/assets/icons/butaca.svg" alt="Butaca SVG" @click="selectedSeat(element.id)" />
                          <Butaca v-if="element.userId != null" :color="'red'" class=" butacaSvg"
                            src="@/assets/icons/butaca.svg" alt="Butaca SVG" @click="selectedSeat(element.id)" />
                          <a class="aTest">{{ element.id }}</a>
                        </div>
                        <div v-if="isButacaSelected">
                          <img class="returnButton" src="@/assets/icons/left.png" @click="deselectButaca" />
                          <table v-if="selectedButaca">
                            <td><input type="text" placeholder="Precio" v-model="selectedButaca.price"
                                class="input-field-xxs">
                            </td>
                            <td><input type="text" placeholder="Tipo de butaca" v-model="selectedButaca.state"
                                class="input-field-reduced"></td>
                            <td><input type="text" placeholder="Id de usuario" v-model="selectedButaca.userId"
                                class="input-field-reduced"></td>
                            <td><button class="updateButton"
                                @click="sendId('update', selectedButaca.id)">Actualizar</button>
                            </td>
                            <td><button class="deleteButton" @click="sendId('delete', selectedButaca.id)">Borrar</button>
                            </td>
                          </table>
                        </div>
                      </div>
                    </div>
                  </UPopUp>
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
      <tr v-for=" element  in  users " :key="element.id">
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
      <tr v-for=" element  in  seats " :key="element.id">
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
      <tr v-for=" element  in  salas " :key="element.number">
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

.input-field-reduced {
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 100px;
}

.input-field-xxs {
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 60px;
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

.butacaDiv {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 450px;
  height: auto;
}

.butacaSvg {
  flex: 1 0 20%;
  max-width: 25px;
  max-height: 35px;
  margin: 10px;
  box-sizing: border-box;
  cursor: pointer;
}

.returnButton {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  cursor: pointer;
}

.pruebaDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
}

.seatsNumber {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>