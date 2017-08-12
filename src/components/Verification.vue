<template lang="pug">
v-card.grey.lighten-5(flat)
  v-toolbar.primary.elevation-3(dark, extended)
    v-toolbar-title Opposition APP
  v-layout(row)
    v-flex(xs12 sm10 offset-sm1 md6 offset-md3)
      v-card.card--flex-toolbar
        v-toolbar.white(card, prominent)
          v-icon security
          v-toolbar-title Verificate email
        v-divider
        v-card-text
          form(@keyup.enter="sendCode")
            v-text-field(label="Enter the verification code", v-model="code", required)
            v-layout(row justify-space-between)
              small *indicates required field
              v-btn(info :loading="loading"  @click.prevent="sendCode" :disabled="loading") Verificate code
            v-alert(error dismissible transition="scale-transition" v-model="alert") {{error}}

</template>

<script>
const debug = require('debug')('verification')
import { mapActions } from 'vuex'

export default {
  name: 'verification',
  data() {
    return {
      code: '',
      loading: false,
      alert: false,
      error: ''
    }
  },
  methods: {
    ...mapActions({
      verificationCode: 'auth/VERIFICATE_CODE'
    }),
    async sendCode() {
      debug('Sending verification form')
      this.loading = true

      try {
        let userVerificated = await this.verificationCode(this.code.trim())
        userVerificated && this.$router.push({ name: 'login' })
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
