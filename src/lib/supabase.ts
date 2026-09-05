import { createClient } from '@supabase/supabase-js'

// process.env is undefined on the frontend, so we must check it to prevent crashes
const supabaseUrl = typeof process !== 'undefined' ? process.env.SUPABASE_URL : ''
const supabaseKey = typeof process !== 'undefined' ? process.env.SUPABASE_SERVICE_ROLE_KEY : ''

// Supabase client initialization (only actually used on the server)
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey) 
  : null as any
