import { supabase } from '../../utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PostgrestResponse } from '@supabase/supabase-js'
import type { PostResponse } from '../../types/Blog'

const getvideo = async (
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>
) => {
  if (req.body.getAll) {
    const { data, error }: PostgrestResponse<any> = await supabase
      .from('userTable')
      .select('id, userLogin')
    if (!error) {
      res.status(200).json({ complete: true, ...data })
    } else {
      console.error(error)
      res.status(200).json({ complete: false })
    }
  } else {
    res.status(200).json({ complete: false })
  }
}

export default getvideo
