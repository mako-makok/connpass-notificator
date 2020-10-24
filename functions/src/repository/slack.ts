import { KnownBlock } from '@slack/bolt'
import { post } from './http'
import { config } from '../functions.setting'

type SendDM = (slackId: string, text: string, blocks?: KnownBlock[]) => void
export const sendDM: SendDM = (slackId, text, blocks?) => {
  const body = {
    channel: `@${slackId}`,
    text,
    blocks,
    link_names: true
  }

  post(config.slack.webhook_url, body)
}