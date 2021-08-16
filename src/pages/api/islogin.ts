import jwt from 'jwt-simple'
import { secret } from '../../utils/auth'
import { setCookie } from '../../utils/cookies'
import type { NextApiRequest, NextApiResponse } from 'next'

const islogin = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const accessToken: string = req.cookies.accesstoken
  try {
    const decryptData = jwt.decode(accessToken, secret)
    setCookie(res, 'accesstoken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 86400,
    })
    res.status(200).json({ isLoggedIn: true, ...decryptData })
  } catch (err: any) {
    console.error('isLogin: ' + err.message)

    setCookie(res, 'accesstoken', '', {
      httpOnly: true,
      sameSite: 'lax',
    })
    res.status(200).json({ isLoggedIn: false })
  }
}

export default islogin
