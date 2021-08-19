import { supabase } from '../../utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PostgrestResponse } from '@supabase/supabase-js'
import type { PostResponse } from '../../types/Blog'

const getvideo = async (req: NextApiRequest, res: NextApiResponse<PostResponse>) => {
  if (req.body.userId) {
    console.log('1')
    const { data, error }: PostgrestResponse<any> = await supabase.from('videoTable').select('*').eq('type', req.body.videoType).contains('allowList::text', req.body.userId)
    if (!error) {
      res.status(200).json({ complete: true, ...data})
    } else {
      console.error(error)
      res.status(200).json({ complete: false })
    }
  } else if (req.body.videoType) {
    const { data, error }: PostgrestResponse<any> = await supabase.from('videoTable').select('*').eq('type', req.body.videoType)
    if (!error) {
      res.status(200).json({ complete: true, ...data})
    } else {
      console.error(error)
      res.status(200).json({ complete: false })
    }
  } else {
    const { data, error }: PostgrestResponse<any> = await supabase.from('videoTable').select('*').eq('allowAll', true)
    if (!error) {
      res.status(200).json({ complete: true, ...data })
    } else {
      console.error(error)
      res.status(200).json({ complete: false })
    }
  }
}

export default getvideo
