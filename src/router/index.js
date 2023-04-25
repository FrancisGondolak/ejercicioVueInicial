import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/v-list.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'unknow',
      component: () => import('@/views/v-error.vue')
    }
  ]
})

export default router
