import * as functions from 'firebase-functions'
import { firestore } from './functions.setting'
import { expressReceiver } from './slack/app'
import { sendConnpassInfoByWebhook } from './service/slack/slackService'

export const sendConnpassDataToSlack = functions.https.onRequest(async (request, response) => {
  await sendConnpassInfoByWebhook()
  response.send('OK')
})

export const slack = functions.https.onRequest(expressReceiver.app)

export const testData = functions.https.onRequest(async (request, response) => {
  await firestore.collection('users').doc().set({
    slackId: 'Makoto',
    hasConnpass: true,
    connpassParams: [
      {
        keyword: 'vue',
        count: 5,
        order: 1,
        isOnline: true
      }
    ]
  })
  response.send('successed')
})