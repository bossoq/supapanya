import { supabase } from '../../utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

const savevideo = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.headers['upsert-type'] === 'editvideo') {
    const { data, error } = await supabase
      .from('videoTable')
      .upsert(req.body)
      .single()
    if (!error) {
      res.status(200).json({ isUpdated: true, ...data })
    } else {
      console.error(error)
      res.status(200).json({ isUpdated: false })
    }
  } else if (req.headers['upsert-type'] === 'newvideo') {
    const { data, error } = await supabase
      .from('videoTable')
      .upsert(req.body)
      .single()
    if (!error) {
      res.status(200).json({ isSaved: true, ...data })
    } else {
      console.error(error)
      res.status(200).json({ isSaved: false })
    }
  }
}

export default savevideo
