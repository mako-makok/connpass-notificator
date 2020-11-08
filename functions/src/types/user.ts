import { OriginalParam } from "./connpass";

export type User = {
  id: string
  slackId: string
  hasConnpass: boolean
  connpassParams: OriginalParam[]
}