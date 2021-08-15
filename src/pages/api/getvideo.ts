import { supabase } from '../../utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PostgrestResponse } from '@supabase/supabase-js'
import type { PostResponse } from '../../types/Blog'

export default async (req: NextApiRequest, res: NextApiResponse<PostResponse>) => {
  if (req.body.videoType) {
    const { data, error }: PostgrestResponse<any> = await supabase.from('videoTable').select('*').eq('type', req.body.videoType)
    if (!error) {
      res.status(200).json({ complete: true, ...data})
    } else {
      res.status(200).json({ complete: false })
    }
  } else {
    const { data, error }: PostgrestResponse<any> = await supabase.from('videoTable').select('*')
    if (!error) {
      res.status(200).json({ complete: true, ...data })
    } else {
      res.status(200).json({ complete: false })
    }
  }
}
