<script setup lang="ts">
import { ref, watch, defineProps, reactive, computed } from 'vue';
import UPopUp from '../UPopUp/UPopUp.vue';
import Butaca from '../Butaca/Butaca.vue';

const seats = ref([
    { id: 1, number: 'A1', price: 10 },
    { id: 2, number: 'A2', price: 10 },
    { id: 3, number: 'A3', price: 10 },
    { id: 4, number: 'A4', price: 10 },
    { id: 5, number: 'A5', price: 10 },
    { id: 6, number: 'A6', price: 10 },
    { id: 7, number: 'A7', price: 10 },
    { id: 8, number: 'A8', price: 10 },
    { id: 9, number: 'A9', price: 10 },
    { id: 10, number: 'A10', price: 10 },
    { id: 11, number: 'B1', price: 15 },
    { id: 12, number: 'B2', price: 15 },
    { id: 13, number: 'B3', price: 15 },
    { id: 14, number: 'B4', price: 15 },
    { id: 15, number: 'B5', price: 15 },
    { id: 16, number: 'B6', price: 15 },
    { id: 17, number: 'B7', price: 15 },
    { id: 18, number: 'B8', price: 15 },
    { id: 19, number: 'B9', price: 15 },
    { id: 20, number: 'B10', price: 15 },
    { id: 21, number: 'C1', price: 20 },
    { id: 22, number: 'C2', price: 20 },
    { id: 23, number: 'C3', price: 20 },
    { id: 24, number: 'C4', price: 20 },
    { id: 25, number: 'C5', price: 20 },
    { id: 26, number: 'C6', price: 20 },
    { id: 27, number: 'C7', price: 20 },
    { id: 28, number: 'C8', price: 20 },
    { id: 29, number: 'C9', price: 20 },
    { id: 30, number: 'C10', price: 20 },
    { id: 31, number: 'D1', price: 25 },
    { id: 32, number: 'D2', price: 25 },
    { id: 33, number: 'D3', price: 25 },
    { id: 34, number: 'D4', price: 25 },
    { id: 35, number: 'D5', price: 25 },
    { id: 36, number: 'D6', price: 25 },
    { id: 37, number: 'D7', price: 25 },
    { id: 38, number: 'D8', price: 25 },
    { id: 39, number: 'D9', price: 25 },
    { id: 40, number: 'D10', price: 25 },
    { id: 41, number: 'E1', price: 30 },
    { id: 42, number: 'E2', price: 30 },
    { id: 43, number: 'E3', price: 30 },
    { id: 44, number: 'E4', price: 30 },
    { id: 45, number: 'E5', price: 30 },
    { id: 46, number: 'E6', price: 30 },
    { id: 47, number: 'E7', price: 30 },
    { id: 48, number: 'E8', price: 30 },
    { id: 49, number: 'E9', price: 30 },
    { id: 50, number: 'E10', price: 30 }
]);

const reserves = ref(JSON.parse(localStorage.getItem('reserves') || '[]'));

const props = defineProps<{
    selectedSessionId: number | null
}>();

interface reservePost {
    seatIds: number[] | undefined,
    sessionId: number | null,
    mail: string | undefined,
    totalPrice: number
}

const reserve = reactive<reservePost>({
    seatIds: undefined,
    sessionId: null,
    mail: undefined,
    totalPrice: 0
});

const selectedSeats = ref<Array<number>>([]);
const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

// Depuración: Verificar el contenido de currentUser
console.log('currentUser:', currentUser);

const totalPrice = computed(() => {
    let price = 0;
    selectedSeats.value.forEach(seatId => {
        const selectedSeat = seats.value.find(seat => seat.id === seatId);
        if (selectedSeat) {
            price += selectedSeat.price;
        }
    });
    return price;
});

const isReserved = (seatId: number) => {
    return reserves.value.some((reserve: { seatId: number | any; sessionId: number | any; }) => reserve.seatId === seatId && reserve.sessionId === props.selectedSessionId);
}

const getSeatColor = (seatId: number) => {
    if (isReserved(seatId)) {
        return 'red';
    } else if (selectedSeats.value.includes(seatId)) {
        return 'orange';
    } else {
        return 'green';
    }
};

const updateLocalStorage = () => {
    localStorage.setItem('clickedSeats', JSON.stringify(selectedSeats.value));
};

const selectSeat = (seatId: number) => {
    let action = '';
    if (!selectedSeats.value.includes(seatId)) {
        selectedSeats.value.push(seatId);
        reserve.mail = currentUser.mail;
        reserve.seatIds = selectedSeats.value;
        reserve.sessionId = props.selectedSessionId;
        reserve.totalPrice = totalPrice.value;
        action = 'selected';
    } else {
        selectedSeats.value = selectedSeats.value.filter(id => id !== seatId);
        action = 'deselected';
    }
    updateLocalStorage();
    const clickedSeats = JSON.parse(localStorage.getItem('clickedSeats') || '[]');
    clickedSeats.push({ seatId, action });
    localStorage.setItem('clickedSeats', JSON.stringify(clickedSeats));
};

const addReserve = () => {
    const newReserves = selectedSeats.value.map(seatId => ({
        id: reserves.value.length + 1,
        seatId,
        sessionId: props.selectedSessionId,
        mail: currentUser.mail,
        totalPrice: totalPrice.value
    }));
    console.log('newReserves:', newReserves);
    reserves.value.push(...newReserves);

    localStorage.setItem('reserves', JSON.stringify(reserves.value));
    selectedSeats.value = [];
    updateLocalStorage();
};

watch(() => props.selectedSessionId, (newSessionId) => {
    console.log("Selected session ID changed:", newSessionId);
    if (newSessionId !== null) {
        selectedSeats.value = [];
        updateLocalStorage();
    }
});
</script>

<template>
    <div class="display">
        <div class="butacaDiv">
            <div v-for="element in seats" :key="element.id" class="seatsNumber">
                <Butaca :color="getSeatColor(element.id)" class="butacaSvg" src="@/assets/icons/butaca.svg"
                    alt="Butaca SVG" @click="!isReserved(element.id) && selectSeat(element.id)" />
                <div class="num">{{ element.number }}</div>
            </div>
        </div>
        <UPopUp :type="'button'" :label="'Reservar'">
            <div class="reservePopUp">
                Precio Total: {{ totalPrice }}€
            </div>
            <div class="button" id="reserveTag" @click="addReserve">
                Comprar
            </div>
        </UPopUp>
    </div>
</template>

<style scoped>
.display {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.butacaDiv {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: auto;
    width: 700px;
    margin-bottom: 30px;
}

.butacaSvg {
    flex: 1 0 20%;
    max-width: 50px;
    max-height: 60px;
    margin: 10px;
    box-sizing: border-box;
    cursor: pointer;
}

.seatsNumber {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.num {
    margin-right: 4px;
}

.reservePopUp {
    padding: 10px;
}

.button {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px lightgray solid;
    border-radius: 5px;
    background-color: white;
    padding: 6px;
    transition: background-color 0.4s ease;
    cursor: pointer;
    width: 150px;
    font-size: 120%;
    font-weight: bold;
}

.button:hover {
    background-color: #7E1034;
    color: white;
    transform: scale(1.1);
    cursor: pointer;
}

@media screen and (max-width: 768px) {
    .butacaSvg {
        flex: 1 0 20%;
        max-width: 17px;
        max-height: 15px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .butacaDiv {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        height: auto;
        width: 375px;
    }
}
</style>
