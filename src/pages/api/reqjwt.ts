import jwt from 'jwt-simple'
import { secret } from '../../utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

const reqjwt = (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const token = jwt.encode(req.body.payload, secret)
    res.status(200).json({ getToken: true, token })
  } catch (err: any) {
    console.error('reqJWT: ' + err.message)
    res.status(200).json({ getToken: false, token: '' })
  }
}

export default reqjwt
