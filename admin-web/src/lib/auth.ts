import { supabase, DEMO_MODE } from './supabase'

export interface AuthUser {
    id: string
    email: string
    role?: string
}

export const auth = {
    signIn: async (email: string, password: string) => {
        if (DEMO_MODE) {
            return supabase.auth.signIn(email, password)
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { data, error }
    },

    signOut: async () => {
        return supabase.auth.signOut()
    },

    getUser: async () => {
        if (DEMO_MODE) {
            return supabase.auth.getUser()
        }
        const { data: { user }, error } = await supabase.auth.getUser()
        return { data: { user }, error }
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
        return supabase.auth.onAuthStateChange(callback)
    },
}

// Demo credentials for easy access
export const DEMO_CREDENTIALS = {
    email: 'admin@amora.app',
    password: 'demo123',
}
