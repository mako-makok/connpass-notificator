import * as functions from 'firebase-functions';
import { expressReceiver } from './slack/app'
import { sendConnpassInfo } from './slack/webhook'

export const helloWorld = functions.https.onRequest(async (request, response) => {
  await sendConnpassInfo('Makoto', ['hoge', 'huga'])
  response.send('hello')
})

export const slack = functions.https.onRequest(expressReceiver.app)