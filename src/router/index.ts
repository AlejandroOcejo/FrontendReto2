import { createRouter, createWebHistory } from 'vue-router'
import ObrasPage from '@/views/ObrasPage/ObrasPage.vue'
import MainPageVue from '../views/MainPage/MainPage.vue'
import { useObraStore } from '@/store/obras-store'
import { useSessionsStore } from '@/store/sessions-store'

const test = () => import('../views/AdminPage/AdminPage.vue')
const Registro = { template: '<div></div>' }
const Reserva = () => import('../views/ReservePage/ReservePage.vue')
const InicioSesion = { template: '<div></div>' }

const routes = [
  { path: '/', component: MainPageVue, meta: { requiresObrasFetch: true } },
  { path: '/registro', component: Registro },
  { path: '/reserve/:id', name: 'reserve', component: Reserva, meta: { requiresSessionFetch: true } },
  { path: '/iniciosesion', component: InicioSesion },
  {
    path: '/test',
    component: test
  },
  {
    path: '/obras',
    name: 'ObrasPage',
    component: ObrasPage,
    meta: { requiresObrasFetch: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      resolve({ left: 0, top: 0 })
    })
  }
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresObrasFetch) {
    const Obrastore = useObraStore()
    await Obrastore.getObras()
  }
  if (to.meta.requiresSessionFetch) {
    const Sessionstore = useSessionsStore()
    const obraId = Number(to.params.id)
    await Sessionstore.getObraSessions(obraId)
  }
  next()
})

export default router
