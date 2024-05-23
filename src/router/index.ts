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
          path: '/aboutus',
          name: 'aboutus',
          component: () => import('../views/AboutUs.vue')
        },
        {
          path: '/Addstudent',
          name: 'Addstudent',
          component: () => import('../components/Students/AddView.vue')
        },
        {
          path: '/student',
          name: 'student',
          component: () => import('../components/Students/IndexView.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('../components/Login.vue')
        }
      ]
    }
  ]
})

export default router
