import { NextApiRequest, NextApiResponse } from 'next'

const logout = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const Cookies = require('cookies')
  const cookies = new Cookies(req, res)

  cookies.set('accesstoken')

  res.status(200).json({ success: true })
}

export default logout
