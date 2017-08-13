import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import UserApp from '@/components/UserApp'
import Hello from '@/components/Hello'
import Register from '@/components/Register'
import Verification from '@/components/Verification'
import Login from '@/components/Login'
import ForgotPassword from '@/components/ForgotPassword'
import store from '../store/index'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'userApp',
      component: UserApp,
      meta: { requiresAuth: true },
      redirect: 'hello',
      children: [
        {
          path: '/hello',
          name: 'hello',
          component: Hello
        }
      ]
    },
    {
      path: '/user',
      name: 'main',
      component: Main,
      redirect: 'login',
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

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      let aux = await store.dispatch('auth/GET_CURRENT_USER')
      aux && next()
    } catch (error) {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
