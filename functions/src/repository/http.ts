import fetch, { Response } from 'node-fetch'

type Get = (url: string, params: any) => Promise<Response | null>
type Post = (url: string, body: any) => Promise<Response | null>

export const get: Get = async (url, params) => {
  const query = new URLSearchParams(params)
  try {
    const res: Response = await fetch(`${url}?${query}`)
    return res
  } catch(err) {
    console.error(err)
    return null
  }
}

export const post: Post = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
    return res
  } catch(err) {
    console.error(err)
    return null
  }
}
