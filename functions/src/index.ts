import * as functions from 'firebase-functions'
import { REGION } from './functions.setting'
import { expressReceiver } from './slack/app'
import { sendConnpassInfoByWebhook } from './service/slack/slackService'

export const sendConnpassDataToSlack = functions.region(REGION).pubsub
.schedule('55 8 * * *').timeZone('Asia/Tokyo').onRun(async context => {
  await sendConnpassInfoByWebhook()
})

export const slack = functions.https.onRequest(expressReceiver.app)