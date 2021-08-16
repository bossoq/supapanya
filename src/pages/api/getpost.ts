import { supabase } from '../../utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js'
import type { PostResponse } from '../../types/Blog'

const getpost = async (req: NextApiRequest, res: NextApiResponse<PostResponse>) => {
  if (req.body.postName) {
    const { data, error }: PostgrestSingleResponse<any> = await supabase.from('postTable').select('*').eq('postLink', req.body.postName).single()
    if (!error) {
      res.status(200).json({ complete: true, ...data})
    } else {
      res.status(200).json({ complete: false })
    }
  } else {
    const { data, error }: PostgrestResponse<any> = await supabase.from('postTable').select('*').order('id', { ascending: false })
    if (!error) {
      res.status(200).json({ complete: true, ...data })
    } else {
      res.status(200).json({ complete: false })
    }
  }
}

export default getpost
