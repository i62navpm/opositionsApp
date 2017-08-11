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
    div
      router-link(:to="'forgotPassword'") Forgot the password?
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
    async sendLogin() {
      debug('Sending login form')
      await this.loginUser({email: this.email.trim(), password: this.password.trim()})
      this.$router.push({ name: 'hello' })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
