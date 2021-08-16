import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../utils/cookies'

const logout = (req: NextApiRequest, res: NextApiResponse<any>) => {
  setCookie(res, 'accesstoken', 'invalid', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  res.status(200).json({ isLoggedIn: false })
}

export default logout
