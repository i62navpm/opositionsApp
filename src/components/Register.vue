<template lang="pug">
  form
    div
      label Email
      input.input(type='email' placeholder='Enter an email' v-model="email")
    div
      label Password
      input.input(type='password' placeholder='Enter a password' v-model="password")
    div
      button(@click.prevent="sendRegister") Sign up
</template>

<script>
const debug = require('debug')('register')
import { mapActions } from 'vuex'

export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      registerUser: 'auth/REGISTER_USER'
    }),
    async sendRegister() {
      debug('Sending register form')
      let userConfirmed = await this.registerUser({email: this.email.trim(), password: this.password.trim()})
      !userConfirmed && this.$router.push({ name: 'verification' })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
