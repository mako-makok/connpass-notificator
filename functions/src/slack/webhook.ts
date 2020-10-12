import { KnownBlock, SectionBlock, DividerBlock, ImageBlock } from '@slack/bolt'
import fetch from 'node-fetch'
import { config } from '../functions.setting'

export const sendConnpassInfoByWebhook = async (slackId: string, messages: string[]) => {
  const startOfSectionBlock: SectionBlock = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '本日の勉強会情報です :fox_face:'
    }
  }
  const messageBloks: SectionBlock[] = messages.map(message => {
    return {
      type: 'section', 
      text: {
        type: 'mrkdwn',
        text: message
      }
    }
  })
  const dividerBlock: DividerBlock = {
    type: 'divider'
  }
  const imageBlock: ImageBlock = {
    type: 'image',
    image_url: pickImageRandomly(),
    alt_text: 'random picture'
  }
  const endOfSectionBlock: SectionBlock = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '今日も一日頑張りましょう！'
    },
    accessory: imageBlock
  }
  const blocks: KnownBlock[] = [startOfSectionBlock, ...messageBloks, dividerBlock, endOfSectionBlock]
  
  const body = {
    channel: `@${slackId}`,
    text: '本日の勉強会情報です :fox_face:',
    blocks,
    link_names: true
  }
  try {
    const url: string = config.slack.webhook_url
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
  } catch(err) {
    console.error(err)
  }
}

// refs: https://pixabay.com/ja/images/search/%E5%8B%95%E7%89%A9/ 
function pickImageRandomly(): string {
  const images = [
    'https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg',
    'https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/12/05/11/39/fox-1883658_960_720.jpg',
    'https://cdn.pixabay.com/photo/2014/10/01/10/44/hedgehog-468228_960_720.jpg', 
    'https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314_960_720.jpg', 
    'https://cdn.pixabay.com/photo/2014/12/12/19/45/lion-565820_960_720.jpg'

  ]
  return images[Math.round( Math.random () * images.length )]
}