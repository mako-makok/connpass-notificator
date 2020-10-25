import { OriginalParam } from "./connpass";

export type User = {
  slackId: string
  hasConnpass: boolean
  connpassParams: OriginalParam[]
}