import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../utils/cookies'

const logout = (req: NextApiRequest, res: NextApiResponse<any>) => {
  setCookie(res, 'accesstoken', 'invalid', {
    path: '/',
  })

  res.status(200).json({ isLoggedIn: false })
}

export default logout
