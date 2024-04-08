import { createRouter, createWebHistory } from "vue-router"
import Login from './pages/LoginPage.vue'
import Register from './pages/RegisterPage.vue'
import Home from './pages/HomePage.vue'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router