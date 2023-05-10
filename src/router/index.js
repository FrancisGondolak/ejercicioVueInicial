import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/v-login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/v-list.vue')
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: () => import('@/views/v-pokedex.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'unknow',
      component: () => import('@/views/v-error.vue')
    }
  ]
})

export default router
