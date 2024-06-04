import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { DefaultLayout } from '@/layouts/indexs'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DefaultLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/student',
          name: 'student',
          component: () => import('../components/Students/IndexView.vue')
        },
        {
          path: '/familyst',
          name: 'familyst',
          component: () => import('../components/FamilySt/IndexView.vue')
        },
        {
          path: '/profilest',
          name: 'profilest',
          component: () => import('../components/ProfileSt/IndexView.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})

export default router
