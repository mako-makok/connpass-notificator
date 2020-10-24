import { Param } from "./connpass";

export type User = {
  slackId: string
  hasConnpass: boolean
  connpassParams: Param[]
}