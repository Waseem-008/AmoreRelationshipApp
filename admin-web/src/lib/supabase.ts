import { createClient } from '@supabase/supabase-js'
import { demoBackend } from './demoBackend'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true' || !supabaseUrl

// Use demo backend if in demo mode or no Supabase credentials
export const supabase = isDemoMode
    ? (demoBackend as any)
    : createClient(supabaseUrl, supabaseAnonKey)

export const DEMO_MODE = isDemoMode
