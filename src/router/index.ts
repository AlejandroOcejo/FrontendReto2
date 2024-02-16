import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../views/MainPage/MainPage.vue');
const test = () => import('../views/AdminPage/AdminPage.vue')
const Registro = { template: '<div></div>' };
const Reserva = { template: '<div></div>' };
const InicioSesion = { template: '<div></div>' };



const routes = [
  { path: '/', component: Home },
  { path: '/registro', component: Registro },
  { path: '/reserva', component: Reserva },
  { path: '/iniciosesion', component: InicioSesion },
  {
    path: '/test', component: test,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
