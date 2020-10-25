import { get } from './http'
import { Connpass, Event, OriginalParam, Param } from '../types/connpass'

type GetConnpassData = (param: OriginalParam) => Promise<Event[]> 
export const getConnpassData: GetConnpassData = async (param) => {
  const url = 'https://connpass.com/api/v1/event/'
  const res = await get(url, buildParam(param))
  if (!res) return []

  const data: Connpass = JSON.parse(await res.text())
  return data.events
}

type BuildParam = (originalParam: OriginalParam) => Param
const buildParam: BuildParam = (originalParam) => {
  const param: Param = {
    keyword: originalParam.keyword,
    count: originalParam.count,
    order: originalParam.order
  }
  if (originalParam.isOnline) param.keyword += ',オンライン'

  return param
}