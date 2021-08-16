import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)
  
  if ('maxAge' in options) {
    if (options.maxAge) {
      options.expires = new Date(Date.now() + options.maxAge)
      options.maxAge /= 1000
    }
  }

  res.setHeader('Access-Control-Allow-Origin', 'https://supapanya.com')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type,set-cookie')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}
