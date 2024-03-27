import { createRouter, createWebHistory } from 'vue-router'
import ObrasPage from '@/views/ObrasPage/ObrasPage.vue'
import MainPageVue from '../views/MainPage/MainPage.vue'
import { useObraStore } from '@/store/obras-store'

const test = () => import('../views/AdminPage/AdminPage.vue')
const Registro = { template: '<div></div>' }
const Reserva = { template: '<div></div>' }
const InicioSesion = { template: '<div></div>' }

const routes = [
  { path: '/', component: MainPageVue, meta: { requiresFetch: true } },
  { path: '/registro', component: Registro },
  { path: '/reserva', component: Reserva },
  { path: '/iniciosesion', component: InicioSesion },
  {
    path: '/test',
    component: test
  },
  {
    path: '/obras',
    name: 'ObrasPage',
    component: ObrasPage,
    meta: { requiresFetch: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresFetch) {
    const Obrastore = useObraStore() // Initialize store inside the beforeEach hook
    await Obrastore.getObras()
  }
  next()
})

export default router
