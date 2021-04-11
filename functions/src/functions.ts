import * as functions from 'firebase-functions'
import { REGION } from './functions.setting'
import { expressReceiver } from './app'
import { sendConnpassInfoByWebhook } from './service/slack/connpass/notification'
import { createOrAddWord } from './service/slack/connpass/slackConnpassService'
import { RegistWord } from './types/params'
import { sendDM } from './client/slack'
import { KnownBlock } from '@slack/bolt'
import { orderValueToLabel } from './service/slack/connpass/conpass.helper'
import { divider } from './service/slack/common/views'

export const sendConnpassDataToSlack = functions.region(REGION).pubsub
  .schedule('55 8 * * *').timeZone('Asia/Tokyo').onRun(async context => {
    await sendConnpassInfoByWebhook()
  })

export const slack = functions.region(REGION).https.onRequest(expressReceiver.app)

export const registWord = functions.region(REGION).https.onRequest(async (req, resp) => {
  const param = req.body as RegistWord
  try {
    createOrAddWord(param.id, param.slackId, param.connpassParam)
  } catch (e) {
    console.error(e)
  }

  const blocks: KnownBlock[] = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `検索ワード: *${param.connpassParam.keyword}*`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `並び順: *${orderValueToLabel(param.connpassParam.order)}*`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `取得件数: *${param.connpassParam.count}*`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `オンラインを優先する: *${param.connpassParam.isOnline}*`
      }
    },
    divider,
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `上記の内容で登録しました。`
      }
    },
  ]
  sendDM(param.slackId, '', blocks)

  await resp.send('OK')
})