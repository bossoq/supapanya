import bcrypt from 'bcryptjs'
import jwt from 'jwt-simple'
import { supabase, secret } from '../../utils/auth'
import { setCookie } from '../../utils/cookies'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Response, Credential } from '../../types/Auth'
import type { PostgrestSingleResponse } from '@supabase/supabase-js';

const login = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const userLoginFunction = async (credential: Credential): Promise<any> => {
    const { data }: PostgrestSingleResponse<any> = await supabase.from('userTable').select('*').eq('userLogin', credential.userLogin.toLowerCase()).single()
    let user: Response = {}
    let accessToken: string = ""
    if (data) {
      if (data.authorised) {
        const match: boolean = await bcrypt.compare(credential.userPassword, data.userPassword)
        if (match) {
          user = {
            id: data.id,
            userLogin: data.userLogin,
            displayName: data.displayName,
            meta: {
              isAdmin: data.meta.isAdmin,
              role: data.meta.role,
              live: data.meta.live,
            },
          }
          accessToken = jwt.encode(user, secret)
        }
      }
    }
    return { accessToken, user }
  }
  const credential: Credential = req.body
  const { accessToken, user }: { accessToken: string, user:Response } = await userLoginFunction(credential)
  if (accessToken !== "") {
    setCookie(res, 'accesstoken', accessToken, {
      path: '/',
      maxAge: 86400000,
    })
    res.status(200).json({ isLoggedIn: true, ...user })
  } else {
    res.status(200).json({ isLoggedIn: false })
  }
}

export default login
