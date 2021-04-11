import * as functions from 'firebase-functions'
import { REGION } from './functions.setting'
import { expressReceiver } from './app'
import {
  notificateRegisterdQueryByWebhook,
  sendConnpassInfoByWebhook,
} from './service/slack/notificateConnpassEventService'
import { createOrAddWord } from './service/slack/registerConnpassQueryService'
import { RegistWord } from './types/params'

export const sendConnpassDataToSlack = functions
  .region(REGION)
  .pubsub.schedule('55 8 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendConnpassInfoByWebhook()
  })

export const slack = functions
  .region(REGION)
  .https.onRequest(expressReceiver.app)

export const registWord = functions
  .region(REGION)
  .https.onRequest(async (req, resp) => {
    const param = req.body as RegistWord
    try {
      createOrAddWord(param.id, param.slackId, param.connpassParam)
    } catch (e) {
      console.error(e)
    }

    notificateRegisterdQueryByWebhook(param.slackId, param.connpassParam)

    await resp.send('OK')
  })
