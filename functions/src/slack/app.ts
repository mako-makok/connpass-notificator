import * as functions from 'firebase-functions'
import { App, ExpressReceiver } from '@slack/bolt'

const config = functions.config()

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
app.command('/echo-from-firebase', async ({ command, ack, say }) => {
  ack();
  say(`You said '${command.text}'`);
});