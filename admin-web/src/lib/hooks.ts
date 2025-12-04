import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { getDemoAnalytics } from './demoBackend'

export interface User {
    id: string
    email: string
    created_at: string
    intake_completed_at: string | null
    couple_id: string | null
    partner_email?: string
}

export interface Couple {
    id: string
    user1_id: string
    user2_id: string
    shared_streak: number
    last_session_at: string | null
    created_at: string
    user1_email?: string
    user2_email?: string
}

export interface Session {
    id: string
    user_id: string
    couple_id: string | null
    mode: 'voice' | 'chat'
    status: 'in_progress' | 'completed' | 'failed'
    started_at: string
    completed_at: string | null
    transcript: string | null
    user_email?: string
}

// Hook to fetch all users
export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const { data, error: err } = await supabase.from('users').select('*')
            if (err) throw err
            setUsers(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return { users, loading, error, refetch: fetchUsers }
}

// Hook to fetch all couples
export const useCouples = () => {
    const [couples, setCouples] = useState<Couple[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCouples = async () => {
        try {
            setLoading(true)
            const { data, error: err } = await supabase.from('couples').select('*')
            if (err) throw err
            setCouples(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const unpairCouple = async (coupleId: string) => {
        try {
            await supabase.rpc('unpair_couple', { couple_id: coupleId })
            await fetchCouples()
        } catch (err: any) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchCouples()
    }, [])

    return { couples, loading, error, refetch: fetchCouples, unpairCouple }
}

// Hook to fetch all sessions
export const useSessions = () => {
    const [sessions, setSessions] = useState<Session[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchSessions = async () => {
        try {
            setLoading(true)
            const { data, error: err } = await supabase
                .from('sessions')
                .select('*')
                .order('started_at', { ascending: false })
                .limit(50)
            if (err) throw err
            setSessions(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSessions()
    }, [])

    return { sessions, loading, error, refetch: fetchSessions }
}

// Hook for analytics/dashboard
export const useAnalytics = () => {
    const [analytics, setAnalytics] = useState({
        totalUsers: 0,
        completedIntakes: 0,
        totalCouples: 0,
        pairedUsers: 0,
        totalSessions: 0,
        completedSessions: 0,
        completionRate: 0,
        activeToday: 0,
    })
    const [loading, setLoading] = useState(true)

    const fetchAnalytics = async () => {
        try {
            setLoading(true)
            // Use demo analytics for now
            const data = getDemoAnalytics()
            setAnalytics(data)
        } catch (err) {
            console.error('Error fetching analytics:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAnalytics()
    }, [])

    return { analytics, loading, refetch: fetchAnalytics }
}
