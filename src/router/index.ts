import { createRouter, createWebHistory } from 'vue-router'
import ObrasPage from '@/views/ObrasPage/ObrasPage.vue'
import MainPageVue from '../views/MainPage/MainPage.vue'
import RegisterPage from '@/views/RegisterPage/RegisterPage.vue'
import LoginPage from '@/views/LoginPage/LoginPage.vue'
import { useObraStore } from '@/store/obras-store'
import { useSessionsStore } from '@/store/sessions-store'
import MyReservesPage from '@/views/MyReservesPage/MyReservesPage.vue'
import { useLocalStore } from '@/store/local-store'
import { storeToRefs } from 'pinia'

const AdminPage = () => import('../views/AdminPage/AdminPage.vue')
const Registro = () => import('../views/RegisterPage/RegisterPage.vue')
const Reserva = () => import('../views/ReservePage/ReservePage.vue')
const Login = () => import('../views/LoginPage/LoginPage.vue')
const MyReserves = () => import('../views/MyReservesPage/MyReservesPage.vue')

const routes = [
  { path: '/', component: MainPageVue, name: 'mainpage', meta: { requiresObrasFetch: true } },
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
    name: 'admin',
    component: AdminPage,
    meta: { requiresAdmin: true }
  },
  {
    path: '/obras',
    name: 'ObrasPage',
    component: ObrasPage,
    meta: { requiresObrasFetch: true }
  },
  {
    path: '/myreserves',
    component: MyReserves,
    meta: { requiresNotAdmin: true }
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
  const localStore = useLocalStore()
  const { idLocal } = storeToRefs(localStore)

  if (to.meta.requiresObrasFetch) {
    const Obrastore = useObraStore()
    await Obrastore.getObras()
  }
  if (to.meta.requiresSessionFetch) {
    const Sessionstore = useSessionsStore()
    const obraId = Number(to.params.id)
    await Sessionstore.getObraSessions(obraId)
  }

  if (to.meta.requiresAdmin && idLocal.value !== -1) {
    next('/')
  } else if (to.meta.requiresNotAdmin && idLocal.value === -1) {
    next({ name: 'admin' })
  } else if (to.meta.requiresNotAdmin && idLocal.value === 1) {
    next({ name: 'mainpage' })
  } else {
    next()
  }
})

export default router
