<template>
  <v-app id="app">
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapActions({
      initCognito: 'auth/INIT_COGNITO',
      getCurrentUser: 'auth/GET_CURRENT_USER'
    })
  },
  created: async function () {
    this.initCognito()
    await this.getCurrentUser()
  }
}
</script>

<style>
  @import '~vuetify/dist/vuetify.min.css';
</style>
