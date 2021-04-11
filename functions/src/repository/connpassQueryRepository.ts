import { config } from '../functions.setting'
import { post } from '../common/http'
import { ConnpassEventSearchQuery } from '~/types/connpass'

export const connpassQueryRepository = {
  add: (id: string, slackId: string, query: ConnpassEventSearchQuery): void => {
    post(config.functions.url, '/registWord', {
      id,
      slackId,
      connpassParam: query,
    })
  },
}
