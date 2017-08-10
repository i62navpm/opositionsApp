import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Register from '@/components/Register'
import Verification from '@/components/Verification'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/verification',
      name: 'verification',
      component: Verification
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
