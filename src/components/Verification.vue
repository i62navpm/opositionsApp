<template lang="pug">
  v-container(fluid)
    v-layout(row wrap)
      v-flex(xs12 md6 offset-md3)
        v-card
          v-toolbar.indigo(dark)
            v-toolbar-title Verificate email
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
