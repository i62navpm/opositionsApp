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
    GET_CURRENT_USER: ({ dispatch, state, commit }) => {
      return new Promise(async (resolve, reject) => {
        if (!state.user) {
          debug('No user logged')
          reject(false)
          return
        }
        state.congitoSDK.getSession((err, session) => {
          if (err) {
            debug('Error:', err)
            reject(err)
            return
          }
          debug('User session valid:', session.isValid())
          state.congitoSDK.setToken(session.getIdToken().jwtToken)
          state.congitoSDK.refreshCredentials((err) => {
            if (err) {
              commit('SET_USER', null)
              debug('Error:', err)
              reject(err)
              return
            }
            debug('User session refreshed')
            resolve(true)
          })
        })
      })
    },
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
    LOGIN_USER: ({ state, commit }, { email, password }) => {
      return new Promise((resolve, reject) => {
        state.congitoSDK.loginUser({ email, password }, {
          onSuccess: (result) => {
            debug('User logged correctly')
            state.congitoSDK.setToken(result.getIdToken().jwtToken)
            commit('SET_USER', email)
            resolve(result)
          },
          onFailure: (err) => {
            debug('Error:', err)
            reject(err)
          }
        })
      })
    },
    LOGOUT_USER: ({ state, commit }) => {
      return new Promise((resolve, reject) => {
        state.congitoSDK.logoutUser(() => {
          debug('User logout correctly')
          commit('SET_USER', null)
          state.congitoSDK.setToken(null)
          resolve(true)
        })
      })
    },
    FORGOT_PASSWORD: ({ state, commit, dispatch }, email) => {
      return new Promise((resolve, reject) => {
        state.congitoSDK.forgotPassword(email, {
          onSuccess: async (result) => {
            debug('Password reset correctly')
            await dispatch('LOGOUT_USER')
            resolve(true)
          },
          onFailure: (err) => {
            debug('Error:', err)
            reject(err)
          }
        })
      })
    },
    CONFIRM_PASSWORD: ({ state }, { email, code, password }) => {
      return new Promise((resolve, reject) => {
        state.congitoSDK.confirmPassword({ username: email, code, password }, {
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
