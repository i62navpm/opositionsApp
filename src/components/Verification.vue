<template lang="pug">
  form
    div
      label Verification code
      input.input(type='text' placeholder='Enter the verification code' v-model="code")
    div
      button(@click.prevent="sendCode") Verificate
</template>

<script>
const debug = require('debug')('verification')
import { mapActions } from 'vuex'

export default {
  name: 'verification',
  data() {
    return {
      code: ''
    }
  },
  methods: {
    ...mapActions({
      verificationCode: 'auth/VERIFICATE_CODE'
    }),
    async sendCode() {
      debug('Sending verification form')
      let userVerificated = await this.verificationCode(this.code.trim())
      !userVerificated && this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
