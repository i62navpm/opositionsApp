var debug = require('debug')('auth')

import AWSCognitoSDK from '@/utils/cognito.service.js'

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
      return new Promise((resolve, reject) => {
        state.congitoSDK.registerUser({ email, password }, (err, result) => {
          if (err) {
            debug('Error:', err)
            reject(err)
            return
          }

          debug('User registered correctly')
          commit('SET_USER', result.user.username)
          resolve(result.userConfirmed)
        })
      })
    },
    VERIFICATE_CODE: ({ state }, code) => {
      return new Promise((resolve, reject) => {
        state.congitoSDK.verificateCode({ username: state.user, code }, (err, result) => {
          if (err) {
            debug('Error:', err)
            reject(err)
            return
          }

          debug('User verified correctly')
          resolve(true)
        })
      })
    },
    LOGIN_USER: ({ state }, { email, password }) => {
      return new Promise((resolve, reject) => {
        state.congitoSDK.loginUser({ username: state.user, email, password }, {
          onSuccess: (result) => {
            debug('User logged correctly')
            debug('access token + ' + result.getAccessToken().getJwtToken())

            resolve(result)
          },
          onFailure: (err) => {
            debug('Error:', err)
            reject(err)
          }
        })
      })
    },
    FORGOT_PASSWORD: ({ state }, email) => {
      return new Promise((resolve, reject) => {
        state.congitoSDK.forgotPassword(email, {
          onSuccess: (result) => {
            debug('Password reset correctly')
            resolve(result)
          },
          onFailure: (err) => {
            debug('Error:', err)
            reject(err)
          }
        })
      })
    },
    CONFIRM_PASSWORD: ({ state }, { code, password }) => {
      return new Promise((resolve, reject) => {
        state.congitoSDK.confirmPassword({ username: state.user, code, password }, {
          onSuccess: (result) => {
            debug('Password changed correctly')
            resolve(result)
          },
          onFailure: (err) => {
            debug('Error:', err)
            reject(err)
          }
        })
      })
    }
  }
}
