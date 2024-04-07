<script setup lang="ts">

import { useUserStore } from '@/store/user-store';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';
import { useLocalStore } from '@/store/local-store';
import { useRouter } from 'vue-router';

const UserStore = useUserStore();
const { dataUsers: users } = storeToRefs(UserStore)
const { loginResponse: loginResponse } = storeToRefs(UserStore)
const localStore = useLocalStore();


interface UserFormData {
    mail: string;
    Password: string;
}

const userFormData = reactive<UserFormData>({
    mail: '',
    Password: ''
});

interface userInfo {
    userId?: number
    mail?: string
}


const validateForm = () => {
    return userFormData.mail.trim() !== '' &&
        userFormData.Password.trim() !== '';
}

const loginFailedInput = ref(false)
const loginFailedDB = ref(false)

const router = useRouter();

const handleSubmit = async () => {
    if (validateForm()) {
        await UserStore.loginUser(userFormData);
        if (loginResponse.value.trim() === "Incorrect password") {
            loginFailedDB.value = true;
            loginFailedInput.value = false;
        } else if (loginResponse.value.trim() === 'User not found') {
            loginFailedDB.value = true;
            loginFailedInput.value = false;
        }
        else {
            UserStore.loginUser(userFormData);
            loginFailedInput.value = false;
            loginFailedDB.value = false;
            localStore.fetchUserIdByMail(userFormData.mail)
            const user: userInfo = {
                mail: userFormData.mail
            };
            localStore.setData(user)
            router.push('/obras');
        }
    } else {
        loginFailedInput.value = true;
        loginFailedDB.value = false;
    }
}


</script>

<template>
    <div class="bigdiv">
        <div class="form-container">
            <h1>Inicio de Sesión</h1>
            <input type="text" v-model="userFormData.mail" placeholder="Email" class="input-field">
            <input type="password" v-model="userFormData.Password" placeholder="Contraseña" class="input-field">
            <div class="failed" v-if="loginFailedInput">Complete todos los campos</div>
            <div class="failed" v-else-if="loginFailedDB">Usuario o contraseña incorrectos</div>
            <button class="button" @click="handleSubmit">Iniciar Sesión</button>
        </div>
    </div>
</template>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    padding: 15px;
    gap: 20px;
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

.button {
    border: 1px lightgray solid;
    border-radius: 5px;
    background-color: white;
    padding: 6px;
    transition: background-color 0.4s ease;
    cursor: pointer;
    width: 200px;
    font-size: 120%;
    font-weight: bold;
}

.button:hover {
    background-color: #7E1034;
    color: white;
    transform: scale(1.1);
}

@media screen and (min-width: 768px) {
    .form-container {
        max-width: 400px;
    }

    .bigdiv {
        margin-top: 50px;
        margin-bottom: 50px;
    }
}

.bigdiv {
    margin-top: 178px;
    margin-bottom: 179px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.failed {
    color: rgb(226, 91, 91);
}
</style>