import { get } from './http'
import { Connpass, Event, Param } from '../types/connpass'

type GetConnpassData = (param: Param) => Promise<Event[]> 
export const getConnpassData: GetConnpassData = async (param) => {
  const url = 'https://connpass.com/api/v1/event/'
  const res = await get(url, param)
  if (!res) return []

  const data: Connpass = JSON.parse(await res.text())
  return data.events
}
