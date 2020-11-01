import * as functions from 'firebase-functions'
import { REGION } from './functions.setting'
import { expressReceiver } from './app'
import { sendConnpassInfoByWebhook } from './service/slack/connpass/notification'

export const sendConnpassDataToSlack = functions.region(REGION).pubsub
.schedule('55 8 * * *').timeZone('Asia/Tokyo').onRun(async context => {
  await sendConnpassInfoByWebhook()
})

export const slack = functions.region(REGION).https.onRequest(expressReceiver.app)