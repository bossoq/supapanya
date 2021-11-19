import jwt from 'jwt-simple'
import { secret } from '../../utils/auth'
import { setCookie } from '../../utils/cookies'
import type { NextApiRequest, NextApiResponse } from 'next'

const islogin = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const accessToken: string = req.cookies.accesstoken
  try {
    const decryptData = jwt.decode(accessToken, secret)
    setCookie(res, 'accesstoken', accessToken, {
      path: '/',
      maxAge: 86400000,
    })
    res.status(200).json({ isLoggedIn: true, ...decryptData })
  } catch (err: any) {
    console.error('isLogin: ' + err.message)

    setCookie(res, 'accesstoken', '', {
      path: '/',
    })
    res.status(200).json({ isLoggedIn: false })
  }
}

export default islogin
