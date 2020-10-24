export interface Connpass {
  results_start: number
  results_returned: number
  results_available: number
  events: Event[]
}

export interface Series {
  id: number
  title: string
  url: string
}

export interface Event {
  event_id: number
  title: string
  catch: string
  description: string
  event_url: string
  started_at: Date
  ended_at: Date
  limit?: number
  hash_tag: string
  event_type: string
  accepted: number
  waiting: number
  updated_at: Date
  owner_id: number
  owner_nickname: string
  owner_display_name: string
  place: string
  address: string
  lat: string
  lon: string
  series: Series
}

export interface Param {
  keyword: string
  count: number
  order: Order
  isOnline: boolean
}
export const Order = {
  DATE_OF_EVENT: 1,
  LAST_UPDATE: 2,
  NEW_ARRIVALS: 3
} as const
export type Order = typeof Order[keyof typeof Order]