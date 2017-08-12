<template lang="pug">
  v-container(fluid)
    v-layout(row wrap)
      v-flex(xs12 md6 offset-md3)
        v-card
          v-toolbar.indigo(dark)
            v-toolbar-title Login
          v-card-text
            form(@keyup.enter="sendLogin")
              v-text-field(type="email" label="Email", v-model="email", required)
              v-text-field(type="password" label="Password", hint="The length must be more than 8 characters", v-model="password" required)
              v-layout(row justify-space-between)
                small *indicates required field
                v-btn(info :loading="loading"  @click.prevent="sendLogin" :disabled="loading") Sign in
              v-alert(error dismissible transition="scale-transition" v-model="alert") {{error}}
            v-layout(row-sm column child-flex-sm justify-space-between)
              v-btn(small flat primary :to="'forgotPassword'") Forgot the password?
              v-btn(small flat primary :to="'Register'") You don't have an account yet?
</template>

<script>
const debug = require('debug')('login')
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      alert: false,
      error: ''
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'auth/LOGIN_USER'
    }),
    async sendLogin() {
      debug('Sending login form')
      this.loading = true

      try {
        await this.loginUser({ email: this.email.trim(), password: this.password.trim() })
        this.$router.push({ name: 'hello' })
      } catch (error) {
        debug('Error:', error.message)
        this.error = error.message
        this.alert = true
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">

</style>
