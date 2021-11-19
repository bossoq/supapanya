import { NextApiRequest, NextApiResponse } from 'next'

const logout = (req: NextApiRequest, res: NextApiResponse<any>) => {
  res.status(200).json({ isLoggedIn: false })
}

export default logout
