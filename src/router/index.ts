import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../views/MainPage/MainPage.vue');
const Registro = { template: '<div></div>' };
const Reserva = { template: '<div></div>' };
const InicioSesion = { template: '<div></div>' };



const routes = [
  { path: '/', component: Home },
  { path: '/registro', component: Registro },
  { path: '/reserva', component: Reserva },
  { path: '/iniciosesion', component: InicioSesion },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
