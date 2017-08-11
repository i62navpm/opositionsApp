<template lang="pug">
  form(v-if="showPasswordForm")
    div
      label Code
        input.input(type='text' placeholder='Enter a code' v-model="code")
      label Password
      input.input(type='password' placeholder='Enter a password' v-model="password")
    div
      button(@click.prevent="sendActivatePassword") Set password
  form(v-else)
    div
      label Email
      input.input(type='email' placeholder='Enter an email' v-model="email")
      div
        button(@click.prevent="sendForgotPassword") Forgot password
</template>

<script>
const debug = require('debug')('forgotPassword')
import { mapActions } from 'vuex'

export default {
  name: 'forgotPassword',
  data() {
    return {
      showPasswordForm: false,
      email: '',
      code: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      forgotPassword: 'auth/FORGOT_PASSWORD',
      confirmPassword: 'auth/CONFIRM_PASSWORD'
    }),
    async sendForgotPassword() {
      debug('Sending forgot password form')
      this.showPasswordForm = await this.forgotPassword(this.email.trim())
    },
    async sendActivatePassword() {
      debug('Sending confirm password form')
      await this.confirmPassword({code: this.code.trim(), password: this.password.trim()})
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style scoped lang="scss">

</style>
