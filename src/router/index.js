import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Main from '@/components/Main'
import Register from '@/components/Register'
import Verification from '@/components/Verification'
import Login from '@/components/Login'
import ForgotPassword from '@/components/ForgotPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
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
        },
        {
          path: '/forgotPassword',
          name: 'forgotPassword',
          component: ForgotPassword
        }
      ]
    }
  ]
})
