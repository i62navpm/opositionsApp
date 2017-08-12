<template lang="pug">
  .hello
    button(@click.prevent="logout()") Logout
    h1 {{ msg }}
    button(@click.prevent="callLambda()") Call lambda
</template>

<script>
import { mapActions } from 'vuex'
import AWSLambdaSDK from '@/utils/lambda.service'

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      lambda: null
    }
  },
  created() {
    this.lambda = new AWSLambdaSDK()
  },
  methods: {
    ...mapActions({
      logoutUser: 'auth/LOGOUT_USER'
    }),
    callLambda() {
      this.lambda.invoke()
    },
    async logout() {
      await this.logoutUser()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
