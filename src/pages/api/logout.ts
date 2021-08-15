import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse<any>) => {
  const Cookies = require('cookies')
  const cookies = new Cookies(req, res)

  cookies.set('accesstoken')

  res.status(200).json({ success: true })
}
