import { createRouter, createWebHistory } from 'vue-router'
import ObrasPage from '@/views/ObrasPage/ObrasPage.vue'
import MainPageVue from '../views/MainPage/MainPage.vue'
import RegisterPage from '@/views/RegisterPage/RegisterPage.vue'
import LoginPage from '@/views/LoginPage/LoginPage.vue'
import { useObraStore } from '@/store/obras-store'
import { useSessionsStore } from '@/store/sessions-store'

const AdminPage = () => import('../views/AdminPage/AdminPage.vue')
const Registro = () => import('../views/RegisterPage/RegisterPage.vue')
const Reserva = () => import('../views/ReservePage/ReservePage.vue')
const Login = () => import('../views/LoginPage/LoginPage.vue')

const routes = [
  { path: '/', component: MainPageVue, meta: { requiresObrasFetch: true } },
  { path: '/registro', component: Registro },
  {
    path: '/reserve/:id',
    name: 'reserve',
    component: Reserva,
    meta: { requiresSessionFetch: true }
  },
  { path: '/Login', component: Login },
  {
    path: '/AdminPage',
    component: AdminPage
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
