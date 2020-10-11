import * as functions from 'firebase-functions';
import { expressReceiver } from './slack/app'
import { sendConnpassInfoByWebhook } from './slack/webhook'

export const helloWorld = functions.https.onRequest(async (request, response) => {
  await sendConnpassInfoByWebhook('Makoto', ['hoge', 'huga'])
  response.send('hello')
})

export const slack = functions.https.onRequest(expressReceiver.app)