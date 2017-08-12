const debug = require('debug')('utils:LambdaSDK')
const AWS = require('aws-sdk')

export default class AWSLambdaSDK {
  constructor() {
    debug('Init AWSLambdaSDK')
  }

  invoke() {
    let lambda = new AWS.Lambda()
    var pullParams = {
      FunctionName: 'LambdaTest',
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify({
        'key3': 'value3',
        'key2': 'value2',
        'key1': 'value1'
      })
    }

    lambda.invoke(pullParams, function (error, data) {
      debugger
      if (error) {
        console.log(error)
      } else {
        console.log(JSON.parse(data.Payload))
      }
    })
  }

}

