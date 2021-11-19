import jwt from 'jwt-simple'
import { secret } from '../../utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

const islogin = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const accessToken: string = req.headers.authorization?.split(' ')[1]
    ? req.headers.authorization.split(' ')[1]
    : ''
  try {
    const decryptData = jwt.decode(accessToken, secret)
    res.status(200).json({ isLoggedIn: true, ...decryptData, accessToken })
  } catch (err: any) {
    console.error('isLogin: ' + err.message)
    res.status(200).json({ isLoggedIn: false, accessToken: '' })
  }
}

export default islogin
