<script setup lang="ts">
import { useObraStore } from '@/store/obras-store';
import { useSeatsStore } from '@/store/seats-store';
import { useUserStore } from '@/store/user-store';
import { useSessionsStore } from '@/store/sessions-store';
import { useSalaStore } from '@/store/salas-store';
import { useReservesStore } from '@/store/reserve-store';
import { storeToRefs } from 'pinia';
import { ref, reactive } from 'vue';
import UPopUp from '../UPopUp/UPopUp.vue';
import Calendar from "primevue/calendar"
import Dropdown from 'primevue/dropdown';
import Butaca from '../Butaca/Butaca.vue';


const Obrastore = useObraStore();
const { dataObras: obras } = storeToRefs(Obrastore)
const UserStore = useUserStore();
const { dataUsers: users } = storeToRefs(UserStore)
const seatsStore = useSeatsStore();
const { dataSeats: seats } = storeToRefs(seatsStore)
const sessionsStore = useSessionsStore();
const { dataSessions: sessions } = storeToRefs(sessionsStore)
const salaStore = useSalaStore();
const { dataSalas: salas } = storeToRefs(salaStore)
const reserveStore = useReservesStore();
const { dataReserves: reserves } = storeToRefs(reserveStore)




const state = ref(false)

defineProps<{
  formData: {
    name: string,
    image: string,
    genre: string,
    duration: string,
    description: string,
    sessions: any[]
  };
  userformData: {
    name: string,
    lastName: string,
    mail: string,
    password?: string,
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
  price: number | undefined | null,
  state: string | undefined,
}

const seatFormData = reactive<SeatFormData>({
  id: undefined,
  number: undefined,
  price: undefined,
  state: undefined
})

interface seatReseve {
  seatId: number | undefined
  number: number | undefined
  salaId: number | undefined
}

const seatReserveFormData = reactive<seatReseve>({
  seatId: undefined,
  number: undefined,
  salaId: undefined
})

interface sessionReserve {
  sessionId: number | undefined
  date?: Date | undefined
  obra?: obraReserve | undefined
}

const sessionReserveFormData = reactive<sessionReserve>({
  sessionId: undefined,
  date: undefined,
  obra: undefined
})

interface obraReserve {
  name: string | undefined
}

const obraReserveFormData = reactive<obraReserve>({
  name: undefined,
})

interface reserveData {
  id: number
  seat?: seatReseve | undefined
  session: sessionReserve | undefined
  userId?: number | undefined
  price?: number | undefined
  date?: Date | undefined
  dateDay?: string | undefined
  dateTime?: string | undefined
  salaNumber?: number | undefined
  seatNumber?: number | undefined
  seatId?: number | undefined
}



const reserveFormData = reactive<reserveData>({
  id: 0,
  seat: undefined,
  session: undefined,
  userId: undefined,
  price: undefined,
  date: undefined,
  dateDay: undefined,
  dateTime: undefined,
  salaNumber: undefined,
  seatNumber: undefined,
  seatId: undefined,
})

const emit = defineEmits(['send-id']);

const sendId = (action: any, element: any,) => {
  emit('send-id', action, element);
};


const selectedSeat = (id: number | undefined) => {
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

const isReserved = (seatId: number) => {
  return reserves.value?.some(reserve => reserve.seat?.number === seatId);
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
        <td><input type="text" placeholder="Descripción" v-model="formData.description" class="input-field"></td>
        <td></td>
        <td><button class="addButton" @click="sendId('add', null)">Añadir Obra</button></td>
        <td></td>
      </tr>
      <tr v-for="obra in obras " :key="obra.id">
        <td><b>{{ obra.id }}</b></td>
        <td><input type="text" v-model="obra.name" class="input-field"></td>
        <td><input type="text" v-model="obra.image" class="input-field"></td>
        <td><input type="text" v-model="obra.duration" class="input-field"></td>
        <td><input type="text" v-model="obra.genre" class="input-field"></td>
        <td><input type="text" v-model="obra.description" class="input-field"></td>
        <td @click=" sessionsStore.getObraSessions(obra.id)">
          <UPopUp :type="'img'" :image="'session'" @click="console.log('mierdon')">
            <table>
              <tr>
                <td>
                  <Dropdown @click="salaStore.getSalas" v-model="sessionFormData.salaId" placeholder="Numero de sala"
                    :options="salas?.map(sala => sala.id)" class="input-field" />
                </td>
                <td>
                  <Calendar v-model="sessionFormData.date" placeholder="Fecha y hora" showTime />
                </td>
                <td></td>
                <td></td>
                <td><button class="addButton" @click="sessionsStore.addSessions(obra.id, sessionFormData)">Crear
                    Sesión</button>
                </td>
              </tr>
              <tr v-for="element in sessions ">
                <td>
                  <b>{{ element.salaNumber }}</b>
                </td>
                <td>
                  <Calendar v-model="element.dateDay" />
                </td>
                <td>
                  <Calendar v-model="element.dateTime" timeOnly />
                </td>
                <td @click="seatsStore.getSessionsSeats(element.id), reserveStore.getReservesBySessionId(element.id)">
                  <UPopUp :type="'butaca'" class="butacaSvg">
                    <div class="pruebaDiv">
                      <div class="butacaDiv">
                        <div v-for="element in seats" v-if="!isButacaSelected" class="seatsNumber">
                          <Butaca :color="isReserved(element.id) ? 'red' : 'green'" class="butacaSvg"
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
                            <td><button class="updateButton" @click="">Actualizar</button>
                              <!-- seatsStore.updateSeats(selectedButaca?.id, selectedButaca) -->
                            </td>
                          </table>
                        </div>
                      </div>
                    </div>
                  </UPopUp>
                </td>
                <td> <button class="updateButton"
                    @click="sessionsStore.updateSessions(element.id, obra.id, element)">Actualizar</button>
                </td>
                <td> <button class="deleteButton"
                    @click="sessionsStore.deleteSessions(element.id, obra.id)">Borrar</button></td>
              </tr>
            </table>
          </UPopUp>
        </td>
        <td><button class="updateButton" @click="sendId('update', obra.id)">Actualizar</button></td>
        <td><button class="deleteButton" @click="sendId('delete', obra.id)">Borrar</button></td>
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
        <th><b>Password</b></th>
        <th><b>Seats</b></th>
      </tr>
      <tr class="add-row">
        <td></td>
        <td><input type="text" placeholder="Nombre del usuario" v-model="userformData.name" class="input-field"></td>
        <td><input type="text" placeholder="Imagen" v-model="userformData.lastName" class="input-field"></td>
        <td><input type="text" placeholder="Genero" v-model="userformData.mail" class="input-field"></td>
        <td><input type="text" placeholder="Genero" v-model="userformData.password" class="input-field"></td>
        <td></td>
        <td><button class="addButton" @click="sendId('add', null)">Añadir Usuario</button></td>
        <td></td>
      </tr>
      <tr v-for=" user in users " :key="user.id">
        <td><b>{{ user.id }}</b></td>
        <td><input type="text" v-model="user.name" class="input-field"></td>
        <td><input type="text" v-model="user.lastName" class="input-field"></td>
        <td><input type="text" v-model="user.mail" class="input-field"></td>
        <td><input type="text" v-model="user.password" class="input-field"></td>
        <td @click="reserveStore.getReservesByUserId(user.id)">
          <UPopUp type="butaca">
            <table>
              <tr>
                <td><b>Id</b></td>
                <td><b>Dia</b></td>
                <td><b>Hora</b></td>
                <td><b>Número de sala</b></td>
                <td><b>Número de asiento</b></td>
                <td><b>Precio</b></td>
                <td><b>Nombre de la obra</b></td>
              </tr>
              <tr v-for="element in reserves">
                <td>{{ element.id }}</td>
                <td>{{ element.dateDay }}</td>
                <td>{{ element.dateTime }}</td>
                <td>{{ element.salaNumber }}</td>
                <td>{{ element.seatNumber }}</td>
                <td>{{ element.price }}</td>
                <td>{{ element.session?.obra?.name }}</td>
                <td><button class="deleteButton"
                    @click="reserveStore.deleteReserve(element.id, user.id)">Borrar</button></td>
              </tr>
            </table>
          </UPopUp>
        </td>
        <td><button class="updateButton" @click="UserStore.updateUser(user.id, user)">Actualizar</button></td>
        <td><button class="deleteButton" @click="sendId('delete', user.id)">Borrar</button></td>
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
        <td><input type="text" placeholder="Genero" v-model="userformData.password" class="input-field"></td>
        <td><button class="addButton" @click="sendId('add', null)">Añadir Usuario</button></td>
      </tr>
      <tr v-for=" element in seats " :key="element.id">
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
          <Dropdown @click="sessionsStore.getSessions" v-model="salaformData.sessionId" placeholder="Sesión"
            :options="sessions?.map(session => session.id)" class="input-field" />
        </td>
        <td><button class="addButton" @click="sendId('add', null)">Añadir Sala</button></td>
        <td></td>
      </tr>
      <tr v-for=" element in salas " :key="element.number">
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
  width: 86px;

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