import { createClient } from '@supabase/supabase-js'

export const saltRounds = parseInt(process.env.SALT_ROUND || '10')
export const secret = process.env.JWT_SECRET || ''
export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
)
