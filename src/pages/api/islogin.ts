import jwt from 'jwt-simple'
import { secret } from '../../utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

const islogin = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const Cookies = require('cookies')
  const cookies = new Cookies(req, res)
  const accessToken: string = cookies.get('accesstoken')
  try {
    const decryptData = jwt.decode(accessToken, secret)
    res.status(200).json({ isLoggedIn: true, ...decryptData })
  } catch (err: any) {
    console.error('isLogin: ' + err.message)
    cookies.set('accesstoken', '', {
      httpOnly: true,
      sameSite: 'lax',
    })
    res.status(200).json({ isLoggedIn: false })
  }
}

export default islogin
