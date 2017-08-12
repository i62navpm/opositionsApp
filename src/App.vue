<template>
  <v-app id="app">
    <main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

body {
  overflow-x: hidden;
}
.card--flex-toolbar {
  margin-top: -64px;
}

</style>
