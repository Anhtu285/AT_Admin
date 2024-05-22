import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AboutUs from '../views/AboutUs.vue'
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
          path: '/student',
          name: 'student',
          component: () => import('../components/Students/IndexView.vue')
        },
        {
          path: '/demo',
          name: 'demo',
          component: () => import('../views/DemoChart.vue')
        },
      ]
    }
  ]
})

export default router
