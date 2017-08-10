var debug = require('debug')('auth')

import AWSCognitoSDK from '@/utils/cognito.service.js'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    congitoSDK: null,
    user: null
  },
  getters: {

  },
  mutations: {
    SET_COGNITO: (state, cognito) => (state.congitoSDK = cognito),
    SET_USER: (state, user) => (state.user = user)
  },
  actions: {
    INIT_COGNITO: ({ commit }) => commit('SET_COGNITO', new AWSCognitoSDK()),
    REGISTER_USER: ({ commit, state }, { email, password }) => {
      state.congitoSDK.registerUser({ email, password }, (err, result) => {
        if (err) {
          debug('Error:', err)
          return
        }

        commit('SET_USER', result.user.username)
        !result.userConfirmed && router.push({name: 'verification'})
        debug('User registered correctly')
      })
    },
    VERIFICATE_CODE: ({ commit, state }, code) => {
      state.congitoSDK.verificateCode({username: state.user, code}, (err, result) => {
        if (err) {
          debug('Error:', err)
          return
        }

        !result.userConfirmed && router.push({name: 'login'})
        debug('User verified correctly')
      })
    },
    LOGIN_USER: ({ commit, state }, { email, password }) => {
      state.congitoSDK.loginUser({ username: state.user, email, password }, {
        onSuccess: (result) => {
          debug('access token + ' + result.getAccessToken().getJwtToken())
          debug(result)
          router.push({name: 'hello'})
          debug('User logged correctly')
        },
        onFailure: (err) => debug('Error:', err)
      })
    }
  }
}
