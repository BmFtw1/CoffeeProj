import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Uploads from '../views/Uploads.vue'
import Map from '../views/Map.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import {auth} from '../Firebase/firebaseinit'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/uploads',
    name: 'Uploads',
    component: Uploads,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser){
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  next();
})
export default router
