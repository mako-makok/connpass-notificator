import * as functions from 'firebase-functions'
import { expressReceiver } from './slack/app'
import { sendConnpassInfoByWebhook } from './service/slack/slackService'

export const sendConnpassDataToSlack = functions.https.onRequest(async (request, response) => {
  await sendConnpassInfoByWebhook()
  response.send('OK')
})

export const slack = functions.https.onRequest(expressReceiver.app)