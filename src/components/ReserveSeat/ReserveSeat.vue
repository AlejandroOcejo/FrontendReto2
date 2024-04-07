<script setup lang="ts">
import { useSeatsStore } from '@/store/seats-store';
import { useReservesStore } from '@/store/reserve-store';
import { useLocalStore } from '@/store/local-store';
import { storeToRefs } from 'pinia';
import { ref, watch, defineProps, reactive, computed } from 'vue';
import UPopUp from '../UPopUp/UPopUp.vue';
import Butaca from '../Butaca/Butaca.vue';

const seatsStore = useSeatsStore();
const { dataSeats: seats } = storeToRefs(seatsStore)
const reserveStore = useReservesStore();
const { dataReserves: reserves } = storeToRefs(reserveStore)
const localStore = useLocalStore();
const { idLocal: idLocal } = storeToRefs(localStore)

interface reservePost {
    seatIds: number[] | undefined,
    sessionId: number | null
    userId: number | undefined,

}

const reserve = reactive<reservePost>({
    seatIds: undefined,
    sessionId: null,
    userId: undefined,
});

const totalPrice = computed(() => {
    let price = 0;
    selectedSeats.value.forEach(seatId => {
        const selectedSeat = seats.value?.find(seat => seat.id === seatId);
        if (selectedSeat) {
            price += selectedSeat.price;
        }
    });
    return price;
});


const isReserved = (seatId: number) => {
    return reserves.value?.some(reserve => reserve.seat?.number === seatId);
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

const props = defineProps<{
    selectedSessionId: number | null
}>()


const selectedSeats = ref<Array<number>>([]);

const selectSeat = (seatId: number) => {
    if (!selectedSeats.value.includes(seatId)) {
        selectedSeats.value.push(seatId);
        console.log(selectedSeats.value);
        reserve.userId = idLocal.value;
        reserve.seatIds = selectedSeats.value;
        reserve.sessionId = props.selectedSessionId;
    } else {
        selectedSeats.value = selectedSeats.value.filter(id => id !== seatId);
    }
};

const fetchSeatsAndReserves = (sessionId: number) => {
    seatsStore.getSessionsSeats(sessionId);
    reserveStore.getReservesBySessionId(sessionId);
};

watch(() => props.selectedSessionId, (newSessionId) => {
    console.log("Selected session ID changed:", newSessionId);
    if (newSessionId !== null) {
        fetchSeatsAndReserves(newSessionId);
    }
});

const addReserve = async () => {
    try {
        await reserveStore.addReserve(JSON.stringify(reserve));
        await reserveStore.getReservesBySessionId(reserve.sessionId!);
    } catch (error) {
    }
};



</script>

<template>
    <div class="display">
        <div class="butacaDiv" v-if="!props.selectedSessionId">
            <div v-for="element in seats" :key="element.id" class="seatsNumber">
                <Butaca :color="'grey'" class="butacaSvg" src="@/assets/icons/butaca.svg" alt="Butaca SVG" />
                <div class="num">{{ element.number }}</div>
            </div>
        </div>
        <div class="butacaDiv" v-else>
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
            <UPopUp v-if="idLocal == 1" :type="'button'" :label="'comprar'" @click="addReserve">
                <input type="text" placeholder="Introduce un Email" class="input-field">
                <div class="button" @click="addReserve">
                    Comprar
                </div>
            </UPopUp>
            <div v-if="idLocal != 1" class="button" @click="addReserve">
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

.obraPopUp {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    margin-bottom: 30px;
}

.input-field {
    height: 50px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 120%;
}

.reservePopUp {
    padding: 10px;
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