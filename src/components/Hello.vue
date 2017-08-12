<template lang="pug">
  .hello
    h1 {{ msg }}
    button(@click.prevent="callLambda()") Call lambda
</template>

<script>
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
    callLambda() {
      this.lambda.invoke()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
