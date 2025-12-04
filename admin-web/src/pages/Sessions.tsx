import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface Session {
    id: string
    user_id: string
    started_at: string
    ended_at: string | null
    duration_seconds: number | null
    mode: string
    summary: string | null
    transcript: string | null
    fallback_triggered: boolean
    error_occurred: boolean
}

export default function Sessions() {
    const [sessions, setSessions] = useState<Session[]>([])
    const [loading, setLoading] = useState(true)
    const [expandedSession, setExpandedSession] = useState<string | null>(null)

    useEffect(() => {
        fetchSessions()
    }, [])

    const fetchSessions = async () => {
        try {
            const { data, error } = await supabase
                .from('sessions')
                .select('*')
                .order('started_at', { ascending: false })
                .limit(50)

            if (error) throw error
            setSessions(data || [])
        } catch (error) {
            console.error('Error fetching sessions:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="text-white">Loading...</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Recent Sessions</h1>

            <div className="space-y-3">
                {sessions.map((session) => (
                    <div key={session.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                        <div
                            className="px-6 py-4 cursor-pointer hover:bg-slate-700/30 flex items-center justify-between"
                            onClick={() => setExpandedSession(expandedSession === session.id ? null : session.id)}
                        >
                            <div className="flex items-center gap-4">
                                {expandedSession === session.id ? (
                                    <ChevronDown size={20} className="text-slate-400" />
                                ) : (
                                    <ChevronRight size={20} className="text-slate-400" />
                                )}
                                <div>
                                    <p className="text-white font-medium">{session.id.slice(0, 8)}...</p>
                                    <p className="text-sm text-slate-400">
                                        {new Date(session.started_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${session.mode === 'voice'
                                            ? 'bg-blue-500/10 text-blue-400'
                                            : session.mode === 'chat'
                                                ? 'bg-green-500/10 text-green-400'
                                                : 'bg-yellow-500/10 text-yellow-400'
                                        }`}
                                >
                                    {session.mode}
                                </span>
                                {session.fallback_triggered && (
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400">
                                        Fallback
                                    </span>
                                )}
                                {session.error_occurred && (
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                                        Error
                                    </span>
                                )}
                                {session.duration_seconds && (
                                    <span className="text-slate-400 text-sm">
                                        {Math.floor(session.duration_seconds / 60)}m {session.duration_seconds % 60}s
                                    </span>
                                )}
                            </div>
                        </div>

                        {expandedSession === session.id && (
                            <div className="border-t border-slate-700 px-6 py-4 space-y-4">
                                {session.summary && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-300 mb-2">Summary</h3>
                                        <p className="text-slate-400 text-sm">{session.summary}</p>
                                    </div>
                                )}

                                {session.transcript && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-300 mb-2">Transcript</h3>
                                        <div className="bg-slate-900 rounded p-4 max-h-96 overflow-y-auto">
                                            <p className="text-slate-400 text-sm whitespace-pre-wrap">
                                                {session.transcript}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
