// var debug = require('debug')('auth')

import AWSCognitoSDK from '@/utils/cognito.service.js'

export default {
  namespaced: true,
  state: {
    congitoSDK: null
  },
  getters: {

  },
  mutations: {
    SET_COGNITO(state, cognito) {
      state.congitoSDK = cognito
    }
  },
  actions: {
    INIT_COGNITO: ({commit}) => commit('SET_COGNITO', new AWSCognitoSDK())
  }
}
