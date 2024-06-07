<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface UserFormData {
    name: string;
    lastName: string;
    mail: string;
    Password: string;
}

interface userLoginCheck {
    mail: string;
    Password: string;
}

const userLoginCheck = reactive<userLoginCheck>({
    mail: '',
    Password: ''
});

const userFormData = reactive<UserFormData>({
    name: '',
    lastName: '',
    mail: '',
    Password: ''
});

const validateForm = () => {
    return userFormData.name.trim() !== '' &&
        userFormData.lastName.trim() !== '' &&
        userFormData.mail.trim() !== '' &&
        userFormData.Password.trim() !== '';
}

const registerFailedInput = ref(false);
const registerFailedDB = ref(false);

const handleSubmit = () => {
    if (validateForm()) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some((user: UserFormData) => user.mail === userFormData.mail);

        if (userExists) {
            registerFailedDB.value = true;
            registerFailedInput.value = false;
        } else {
            users.push({ ...userFormData });
            localStorage.setItem('users', JSON.stringify(users));
            registerFailedInput.value = false;
            registerFailedDB.value = false;
            router.push('/login');
        }
    } else {
        registerFailedInput.value = true;
        registerFailedDB.value = false;
    }
}
</script>

<template>
    <div class="bigdiv">
        <div class="form-container">
            <h1>Registro</h1>
            <input type="text" v-model="userFormData.name" placeholder="Nombre" class="input-field">
            <input type="text" v-model="userFormData.lastName" placeholder="Apellidos" class="input-field">
            <input type="text" v-model="userFormData.mail" placeholder="Email" class="input-field">
            <input type="password" v-model="userFormData.Password" placeholder="Contraseña" class="input-field">
            <div class="failed" v-if="registerFailedInput">Registro Fallido, Complete todos los campos</div>
            <div class="failed" v-else-if="registerFailedDB">Registro Fallido, Usuario ya registrado</div>
            <button class="button" @click="handleSubmit">Enviar</button>
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
}

.bigdiv {
    margin-top: 109px;
    margin-bottom: 108px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.failed {
    color: rgb(226, 91, 91);
}
</style>
