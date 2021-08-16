import bcrypt from 'bcryptjs'
import { supabase, saltRounds } from '../../utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Register, Response } from '../../types/Auth'
import { PostgrestSingleResponse } from '@supabase/supabase-js'

const register = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const userRegisterFunction = async (
    register: Register
  ): Promise<Response> => {
    let user: Response = {}
    const hash: string = await bcrypt.hash(register.userPassword, saltRounds)
    const request: Register = {
      userLogin: register.userLogin,
      userPassword: hash,
      displayName: register.displayName,
      meta: {
        isAdmin: register.meta.isAdmin,
        role: register.meta.role,
        live: register.meta.live,
      },
    }
    const { data }: PostgrestSingleResponse<any> = await supabase
      .from('userTable')
      .insert(request)
      .single()
    if (data) {
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
    }
    return user
  }
  const register: Register = req.body
  const user: Response = await userRegisterFunction(register)
  if (user !== {}) {
    res.status(200).json({ isRegistered: true, ...user })
  } else {
    res.status(200).json({ isRegistered: false })
  }
}

export default register
