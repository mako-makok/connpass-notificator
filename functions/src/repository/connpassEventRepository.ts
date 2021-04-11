import { get } from '../common/http'
import { Connpass, Event, ConnpassEventSearchQuery } from '../types/connpass'

type GetQuery = {
  keyword: string
  count: number
  order: 1 | 2 | 3
}

const endPoint = 'https://connpass.com/api/v1/event/'
export const connpassEventRepository = {
  get: async (param: ConnpassEventSearchQuery): Promise<Event[]> => {
    const res = await get(endPoint, buildParam(param))
    if (!res) return []

    const data: Connpass = JSON.parse(await res.text())
    return data.events
  },
}

const buildParam = (query: ConnpassEventSearchQuery): GetQuery => {
  const param = {
    keyword: query.keyword,
    count: query.count,
    order: query.order,
  }
  if (query.isOnline) param.keyword += ',オンライン'

  return param
}
