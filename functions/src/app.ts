import { App, ExpressReceiver } from '@slack/bolt'
import { registerWord } from './service/slack/connpass/comands'
import { config } from './functions.setting'

export const expressReceiver = new ExpressReceiver({
  signingSecret: config.slack.secret,
  endpoints: '/events',
  processBeforeResponse: true
})

export const app = new App({
  receiver: expressReceiver,
  token: config.slack.token,
  processBeforeResponse: true
})

registerWord(app)