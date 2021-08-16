import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.SUPABASE_URL || ''
const supabaseKey: string = process.env.SUPABASE_KEY || ''

export const saltRounds = parseInt(process.env.SALT_ROUND || '10')
export const secret = process.env.JWT_SECRET || ''
export const supabase = createClient(
  supabaseUrl,
  supabaseKey
  )
