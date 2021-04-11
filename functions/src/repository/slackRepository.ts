import { KnownBlock } from '@slack/bolt'
import { post } from '../common/http'
import { config } from '../functions.setting'

export const slackRepository = {
  sendDirectMessage: (
    slackId: string,
    text: string,
    blocks?: KnownBlock[]
  ): void => {
    const body = {
      channel: `@${slackId}`,
      text,
      blocks,
      link_names: true,
    }

    post(config.slack.webhook_url, '', body)
  },
}
