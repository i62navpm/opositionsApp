<template lang="pug">
  form
    div
      label Email
      input.input(type='email' placeholder='Enter an email' v-model="email")
    div
      label Password
      input.input(type='password' placeholder='Enter a password' v-model="password")
    div
      button(@click.prevent="sendLogin") Sign in
</template>

<script>
const debug = require('debug')('login')
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'auth/LOGIN_USER'
    }),
    sendLogin() {
      debug('Sending login form')
      this.loginUser({email: this.email.trim(), password: this.password.trim()})
    }
  }
}
</script>

<style scoped lang="scss">

</style>
