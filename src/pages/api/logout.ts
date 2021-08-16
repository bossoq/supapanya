import { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'js-cookie'

const logout = (req: NextApiRequest, res: NextApiResponse<any>) => {
  // const Cookies = require('cookies')
  // const cookies = new Cookies(req, res)

<<<<<<< HEAD
  // cookies.set('accesstoken', '', {
  //   httpOnly: true,
  //   sameSite: 'lax',
  // })
  Cookies.remove('accesstoken')
=======
  cookies.set('accesstoken')
>>>>>>> parent of de5377a (Fix cookies bugs)

  res.status(200).json({ success: true })
}

export default logout
