const debug = require('debug')('utils:cognitoSDK')
const config = require('@/../config/config.js')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

export default class AWSCognitoSDK {
  constructor() {
    debug('Init AWSCognitoSDK')
    this.createUserPool()
    console.log(this.userPool)
    return this.userPool
  }

  createUserPool() {
    let poolData = {
      UserPoolId: config.cognito.UserPoolId,
      ClientId: config.cognito.ClientId
    }

    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
  }
}

