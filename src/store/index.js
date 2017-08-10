import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({key: 'user', paths: ['auth.user']})],
  strict: true,
  modules: {
    auth
  }
})
