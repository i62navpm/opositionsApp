const debug = require('debug')('utils:cognitoSDK')
const config = require('@/../config/config.js')
const AWS = require('aws-sdk')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

export default class AWSCognitoSDK {
  constructor() {
    debug('Init AWSCognitoSDK')

    this.initConfig()
    this.createUserPool()

    return this.userPool
  }

  initConfig() {
    AWS.Config.region = config.region
    AWS.Config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: config.IdentityPoolId
    })
  }

  createUserPool() {
    let poolData = {
      UserPoolId: config.cognito.UserPoolId,
      ClientId: config.cognito.ClientId
    }

    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
  }
}

