import jwt from 'jwt-simple'
import Cookies from 'js-cookie'
import { secret } from '../../utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

const islogin = (req: NextApiRequest, res: NextApiResponse<any>) => {
  // const Cookies = require('cookies')
  // const cookies = new Cookies(req, res)
  // const accessToken: string = cookies.get('accesstoken')
  const accessToken: string = Cookies.get('accesstoken') || ''
  try {
    const decryptData = jwt.decode(accessToken, secret)
    res.status(200).json({ isLoggedIn: true, ...decryptData })
  } catch (err: any) {
    console.error('isLogin: ' + err.message)
<<<<<<< HEAD
    // cookies.set('accesstoken', '', {
    //   httpOnly: true,
    //   sameSite: 'lax',
    // })
    Cookies.remove('accesstoken')
=======
    cookies.set('accesstoken', '')
>>>>>>> parent of de5377a (Fix cookies bugs)
    res.status(200).json({ isLoggedIn: false })
  }
}

export default islogin
