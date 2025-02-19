import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ListOfStudent from '@/views/ListOfStudent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  
    {
      path: '/students',
      name: 'students',
      component: ListOfStudent,
    },
  
  ],
})

export default router
