import { KnownBlock, SectionBlock, ImageBlock } from '@slack/bolt'
import { divider } from './views'
import { Event, ConnpassEventSearchQuery, Order } from '../../types/connpass'
import { User } from '../../types/user'
import { getUserByHasConnpass } from '../user/userService'
import { connpassEventRepository } from '../../repository/connpassEventRepository'
import { slackRepository } from '../../repository/slackRepository'

/**
 * connpassからイベントを取得してslackにwebhookを用いて投稿する.
 */
export const sendConnpassInfoByWebhook = async () => {
  const users: User[] | null = await getUserByHasConnpass()
  if (!users) return

  users.forEach(async (user) => {
    const datas: Event[][] = await Promise.all(
      user.connpassParams.map((param: ConnpassEventSearchQuery) =>
        connpassEventRepository.get(param)
      )
    )
    const events: Event[] = ([] as Event[]).concat(...datas)
    const messages: string[] = [
      ...new Set(events.map((event) => createMessageItem(event))),
    ]
    const blocks: KnownBlock[] = buildBlocks(messages)
    slackRepository.sendDirectMessage(
      user.slackId,
      '本日の勉強会情報です :fox_face:',
      blocks
    )
  })
}

export const notificateRegisterdQueryByWebhook = async (
  slackId: string,
  connpassParam: ConnpassEventSearchQuery
) => {
  const blocks: KnownBlock[] = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `検索ワード: *${connpassParam.keyword}*`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `並び順: *${orderValueToLabel(connpassParam.order)}*`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `取得件数: *${connpassParam.count}*`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `オンラインを優先する: *${connpassParam.isOnline}*`,
      },
    },
    divider,
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `上記の内容で登録しました。`,
      },
    },
  ]
  slackRepository.sendDirectMessage(slackId, '', blocks)
}

function orderValueToLabel(val: Order) {
  switch (val) {
    case Order.DATE_OF_EVENT:
      return '開催日'
    case Order.LAST_UPDATE:
      return '更新日'
    case Order.NEW_ARRIVALS:
      return '新着'
    default:
      throw new Error('An unexpected value was entered')
  }
}

/**
 * ランダムに画像がアップロードされているcdnのリンクを取得する.
 * refs: https://pixabay.com/ja/images/search/%E5%8B%95%E7%89%A9/
 */
function pickImageRandomly(): string {
  const images = [
    'https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg',
    'https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/12/05/11/39/fox-1883658_960_720.jpg',
    'https://cdn.pixabay.com/photo/2014/10/01/10/44/hedgehog-468228_960_720.jpg',
    'https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314_960_720.jpg',
    'https://cdn.pixabay.com/photo/2014/12/12/19/45/lion-565820_960_720.jpg',
  ]
  return images[Math.round(Math.random() * images.length)]
}

/**
 * connpassのイベント一覧をメッセージのアイテムに変換する.
 */
function createMessageItem(event: Event): string {
  return `・ <${event.event_url}|${event.title}>`
}

/**
 * ブロックを生成する.
 */
function buildBlocks(messages: string[]): KnownBlock[] {
  const startOfSectionBlock: SectionBlock = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '本日の勉強会情報です :fox_face:',
    },
  }
  const messageBloks: SectionBlock[] = messages.map((message) => {
    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: message,
      },
    }
  })
  const imageBlock: ImageBlock = {
    type: 'image',
    image_url: pickImageRandomly(),
    alt_text: 'random picture',
  }
  const endOfSectionBlock: SectionBlock = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '今日も一日頑張りましょう！',
    },
    accessory: imageBlock,
  }
  return [startOfSectionBlock, ...messageBloks, divider, endOfSectionBlock]
}
