const debug = require('debug')('utils:awsSDK')
const config = require('@/../config/config.js')
const AWS = require('aws-sdk')

export default class AWSSDK {
  constructor() {
    debug('Init AWSSDK')
    this.initConfig()
    debug('Initialized AWSSDK')
  }

  initConfig() {
    AWS.Config.region = config.region
    AWS.Config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: config.IdentityPoolId
    })
  }
}

