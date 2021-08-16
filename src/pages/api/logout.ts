import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../utils/cookies'

const logout = (req: NextApiRequest, res: NextApiResponse<any>) => {
  setCookie(res, 'accesstoken', '', {
    httpOnly: true,
    sameSite: 'lax',
  })

  res.status(200).json({ success: true })
}

export default logout
