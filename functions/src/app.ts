import { App, ExpressReceiver } from '@slack/bolt'
import { register } from './service/slack/registerConnpassQueryCommandService'
import { config } from './functions.setting'

export const expressReceiver = new ExpressReceiver({
  signingSecret: config.slack.secret,
  endpoints: '/events',
  processBeforeResponse: true,
})

export const app = new App({
  receiver: expressReceiver,
  token: config.slack.token,
  processBeforeResponse: true,
})

register(app)
