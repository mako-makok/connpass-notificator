import { PlainTextElement, DividerBlock } from '@slack/bolt'

export const close: PlainTextElement = {
  type: 'plain_text',
  text: 'キャンセル'
}

export const submit: PlainTextElement = {
  type: 'plain_text',
  text: '登録'
}

export const divider: DividerBlock = {
  type: 'divider'
}