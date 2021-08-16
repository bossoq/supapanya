import { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'js-cookie'

const logout = (req: NextApiRequest, res: NextApiResponse<any>) => {
  // const Cookies = require('cookies')
  // const cookies = new Cookies(req, res)

  // cookies.set('accesstoken', '', {
  //   httpOnly: true,
  //   sameSite: 'lax',
  // })
  Cookies.remove('accesstoken')

  res.status(200).json({ success: true })
}

export default logout
