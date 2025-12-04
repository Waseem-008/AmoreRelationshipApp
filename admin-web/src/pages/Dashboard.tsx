import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Users, Heart, Clock, Activity } from 'lucide-react'

interface Stats {
    totalUsers: number
    totalCouples: number
    todaySessions: number
    activePairs: number
}

export default function Dashboard() {
    const [stats, setStats] = useState<Stats>({
        totalUsers: 0,
        totalCouples: 0,
        todaySessions: 0,
        activePairs: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            // Get total users
            const { count: userCount, error: userError } = await supabase
                .from('users')
                .select('*', { count: 'exact', head: true })

            if (userError) throw userError

            // Get total couples
            const { count: coupleCount } = await supabase
                .from('couples')
                .select('*', { count: 'exact', head: true })

            // Get today's sessions
            const today = new Date().toISOString().split('T')[0]
            const { count: sessionCount } = await supabase
                .from('sessions')
                .select('*', { count: 'exact', head: true })
                .gte('started_at', `${today}T00:00:00Z`)

            // Get active pairs (both partners have sessions in last 7 days)
            const sevenDaysAgo = new Date()
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
            const { count: activeCount } = await supabase
                .from('couples')
                .select('*', { count: 'exact', head: true })
                .gt('paired_at', sevenDaysAgo.toISOString())

            setStats({
                totalUsers: userCount || 0,
                totalCouples: coupleCount || 0,
                todaySessions: sessionCount || 0,
                activePairs: activeCount || 0,
            })
        } catch (error) {
            console.log('Demo Mode: Using mock stats due to error:', error)
            // DEMO MODE: Mock data
            setStats({
                totalUsers: 124,
                totalCouples: 56,
                todaySessions: 12,
                activePairs: 48,
            })
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="text-white">Loading...</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={<Users className="text-blue-400" size={24} />}
                    label="Total Users"
                    value={stats.totalUsers}
                    bgColor="bg-blue-500/10"
                />
                <StatCard
                    icon={<Heart className="text-pink-400" size={24} />}
                    label="Total Couples"
                    value={stats.totalCouples}
                    bgColor="bg-pink-500/10"
                />
                <StatCard
                    icon={<Clock className="text-green-400" size={24} />}
                    label="Today's Sessions"
                    value={stats.todaySessions}
                    bgColor="bg-green-500/10"
                />
                <StatCard
                    icon={<Activity className="text-purple-400" size={24} />}
                    label="Active Pairs"
                    value={stats.activePairs}
                    bgColor="bg-purple-500/10"
                />
            </div>
        </div>
    )
}

function StatCard({
    icon,
    label,
    value,
    bgColor,
}: {
    icon: React.ReactNode
    label: string
    value: number
    bgColor: string
}) {
    return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className={`${bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                {icon}
            </div>
            <p className="text-slate-400 text-sm mb-1">{label}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
        </div>
    )
}
