import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Trash2 } from 'lucide-react'

interface Couple {
    id: string
    partner_a_id: string
    partner_b_id: string
    paired_at: string
    shared_streak_weeks: number
    weekly_exercise: any
    partner_a_reflected: boolean
    partner_b_reflected: boolean
}

export default function Couples() {
    const [couples, setCouples] = useState<Couple[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCouples()
    }, [])

    const fetchCouples = async () => {
        try {
            const { data, error } = await supabase
                .from('couples')
                .select('*')
                .order('paired_at', { ascending: false })

            if (error) throw error
            setCouples(data || [])
        } catch (error) {
            console.error('Error fetching couples:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleUnpair = async (coupleId: string) => {
        if (!confirm('Are you sure you want to unpair this couple?')) return

        try {
            // Update users to remove couple_id
            await supabase.from('users').update({ couple_id: null }).eq('couple_id', coupleId)

            // Delete the couple record
            await supabase.from('couples').delete().eq('id', coupleId)

            // Log admin action
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (user) {
                await supabase.from('admin_audit_log').insert({
                    admin_id: user.id,
                    action: 'unpair_couple',
                    target_id: coupleId,
                    details: {},
                })
            }

            fetchCouples()
        } catch (error) {
            console.error('Error unpairing couple:', error)
            alert('Error unpairing couple')
        }
    }

    const handleResetExercise = async (coupleId: string) => {
        if (!confirm('Reset weekly exercise for this couple?')) return

        try {
            await supabase
                .from('couples')
                .update({
                    weekly_exercise: {},
                    exercise_assigned_at: null,
                    partner_a_reflected: false,
                    partner_b_reflected: false,
                })
                .eq('id', coupleId)

            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (user) {
                await supabase.from('admin_audit_log').insert({
                    admin_id: user.id,
                    action: 'reset_exercise',
                    target_id: coupleId,
                    details: {},
                })
            }

            fetchCouples()
        } catch (error) {
            console.error('Error resetting exercise:', error)
        }
    }

    if (loading) {
        return <div className="text-white">Loading...</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Couples</h1>

            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-700/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Couple ID</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Paired Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Streak (weeks)</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Exercise Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {couples.map((couple) => (
                            <tr key={couple.id} className="hover:bg-slate-700/30">
                                <td className="px-6 py-4 text-white font-mono text-sm">{couple.id.slice(0, 8)}...</td>
                                <td className="px-6 py-4 text-slate-300">
                                    {new Date(couple.paired_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-white">{couple.shared_streak_weeks}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded text-xs ${couple.partner_a_reflected
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'bg-slate-700 text-slate-400'
                                                }`}
                                        >
                                            A: {couple.partner_a_reflected ? '✓' : '×'}
                                        </span>
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded text-xs ${couple.partner_b_reflected
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'bg-slate-700 text-slate-400'
                                                }`}
                                        >
                                            B: {couple.partner_b_reflected ? '✓' : '×'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleResetExercise(couple.id)}
                                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                                        >
                                            Reset Exercise
                                        </button>
                                        <button
                                            onClick={() => handleUnpair(couple.id)}
                                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors flex items-center gap-1"
                                        >
                                            <Trash2 size={14} />
                                            Unpair
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
