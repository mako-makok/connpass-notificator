import {
  App,
  InputBlock,
  KnownBlock,
  Option,
  SectionBlock,
  StaticSelect,
} from '@slack/bolt'
import { close, submit, divider } from './views'
import { Order } from '../../types/connpass'
import { connpassQueryRepository } from '../../repository/connpassQueryRepository'

const VIEW_ID = 'dialog_1'

type SlackUser = {
  id: string
  name: string
}

export const register = (app: App) => {
  app.command('/register-word', async ({ ack, body, context, command }) => {
    await ack()

    try {
      await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: VIEW_ID,
          title: {
            type: 'plain_text',
            text: '検索ワードの登録',
          },
          blocks: buildBlocks(),
          private_metadata: command.channel_id,
          close,
          submit,
        },
      })
    } catch (err) {
      console.error(err)
    }
  })

  app.view(VIEW_ID, async ({ ack, view, context, body }) => {
    await ack()

    const data = await app.client.users.info({
      token: context.botToken,
      user: body.user.id, // 所謂uuidではなくメンションなどで使用されるもの
    })
    const slackUser = data.user as SlackUser
    const values = view.state.values
    const keyword = values.keyword.keyword_input.value
    const order: Order = Number(
      values.order.order_input.selected_option.value
    ) as Order
    const count = values.count.count_input.selected_option.value
    const isOnline = values.isOnline.is_online_input.selected_option.value

    connpassQueryRepository.add(slackUser.id, slackUser.name, {
      keyword: keyword,
      count: count,
      order: order,
      isOnline: isOnline,
    })
  })
}

function buildBlocks(): KnownBlock[] {
  const keywordInput: InputBlock = {
    type: 'input',
    block_id: 'keyword',
    label: {
      type: 'plain_text',
      text: '検索ワード',
    },
    element: {
      type: 'plain_text_input',
      action_id: 'keyword_input',
    },
  }

  const orderStaticSelect: StaticSelect = {
    type: 'static_select',
    action_id: 'order_input',
    options: [
      {
        text: {
          type: 'plain_text',
          text: '開催日',
        },
        value: `${Order.DATE_OF_EVENT}`,
      },
      {
        text: {
          type: 'plain_text',
          text: '更新順',
        },
        value: `${Order.LAST_UPDATE}`,
      },
      {
        text: {
          type: 'plain_text',
          text: '新着順',
        },
        value: `${Order.NEW_ARRIVALS}`,
      },
    ],
  }
  const orderSection: SectionBlock = {
    type: 'section',
    block_id: 'order',
    text: {
      type: 'mrkdwn',
      text: '検索結果の並べ替え順序',
    },
    accessory: orderStaticSelect,
  }

  const countStaticSelect: StaticSelect = {
    type: 'static_select',
    action_id: 'count_input',
    options: [
      ...[...Array(100)].map((_, i) => {
        const option: Option = {
          text: {
            type: 'plain_text',
            text: `${i + 1}`,
          },
          value: `${i + 1}`,
        }
        return option
      }),
    ],
  }
  const countSection: SectionBlock = {
    type: 'section',
    block_id: 'count',
    text: {
      type: 'mrkdwn',
      text: '取得件数',
    },
    accessory: countStaticSelect,
  }

  const isOnlineStaticSelect: StaticSelect = {
    type: 'static_select',
    action_id: 'is_online_input',
    options: [
      {
        text: {
          type: 'plain_text',
          text: 'YES',
        },
        value: 'YES',
      },
      {
        text: {
          type: 'plain_text',
          text: 'NO',
        },
        value: 'NO',
      },
    ],
  }
  const isOnlineSection: SectionBlock = {
    type: 'section',
    block_id: 'isOnline',
    text: {
      type: 'mrkdwn',
      text: 'オンライン開催を優先する',
    },
    accessory: isOnlineStaticSelect,
  }

  return [keywordInput, divider, orderSection, countSection, isOnlineSection]
}
