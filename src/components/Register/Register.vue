<script setup lang="ts">


</script>

<template>
    <div class="bigdiv">
        <div class="form-container">
            <h1>Registro</h1>
            <input type="text" placeholder="Nombre" class="input-field">
            <input type="text" placeholder="Apellidos" class="input-field">
            <input type="text" placeholder="Email" class="input-field">
            <input type="password" placeholder="Contraseña" class="input-field">
            <button class="button">Enviar</button>
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
</style>