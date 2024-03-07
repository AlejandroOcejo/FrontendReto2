import useObrasInfo from '@/composables/useObrasInfo';
import { createRouter, createWebHistory } from 'vue-router';
import ObrasPage from '@/views/ObrasPage/ObrasPage.vue';

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
  {
    path: '/obras',
    name: 'ObrasPage',
    component: ObrasPage,
    meta: { requiresFetch: true } 
  },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to,from,next)=>{
  if(to.meta.requiresFetch){
    useObrasInfo('http://localhost:5255/obra', 'GET', undefined).then(()=>{next();});
    
  }else {
    next();
  }
})

export default router;
