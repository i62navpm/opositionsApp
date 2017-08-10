const debug = require('debug')('utils:cognitoSDK')
const config = require('@/../config/config.js')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
import AWSSDK from './aws.service'

export default class AWSCognitoSDK extends AWSSDK {
  constructor() {
    super()
    debug('Init AWSCognitoSDK')
    this.createUserPool()
    debug('Initialized AWSCognitoSDK')
  }

  createUserPool() {
    let poolData = {
      UserPoolId: config.cognito.UserPoolId,
      ClientId: config.cognito.ClientId
    }

    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
  }

  registerUser({ email, password }, callback) {
    debug('Registering User', email)

    return this.userPool.signUp(email, password, null, null, callback)
  }

  verificateCode({ username, code }, callback) {
    debug('Verificating code', code)

    this.cognitoUser = this.cognitoUser || this.getCognitoUser(username)
    return this.cognitoUser.confirmRegistration(code, true, callback)
  }

  loginUser({ username, email, password }, { onSuccess, onFailure }) {
    debug('Login User', email)
    var authenticationData = {
      Email: email,
      Password: password
    }
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)

    this.cognitoUser = this.cognitoUser || this.getCognitoUser(username)
    return this.cognitoUser.authenticateUser(authenticationDetails, { onSuccess, onFailure })
  }

  getCognitoUser(Username) {
    var userData = {
      Username,
      Pool: this.userPool
    }
    return new AmazonCognitoIdentity.CognitoUser(userData)
  }
}

