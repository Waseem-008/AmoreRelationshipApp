import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Search } from 'lucide-react'

interface User {
    id: string
    email: string
    couple_id: string | null
    intake_completed: boolean
    daily_completed_at: string | null
    last_session_at: string | null
    created_at: string
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setUsers(data || [])
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredUsers = users.filter((user) =>
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return <div className="text-white">Loading...</div>
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Users</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-700/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Paired</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Intake</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Last Session</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-700/30">
                                <td className="px-6 py-4 text-white">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.couple_id
                                                ? 'bg-green-500/10 text-green-400'
                                                : 'bg-yellow-500/10 text-yellow-400'
                                            }`}
                                    >
                                        {user.couple_id ? 'Yes' : 'No'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.intake_completed
                                                ? 'bg-green-500/10 text-green-400'
                                                : 'bg-red-500/10 text-red-400'
                                            }`}
                                    >
                                        {user.intake_completed ? 'Complete' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-300">
                                    {user.last_session_at
                                        ? new Date(user.last_session_at).toLocaleDateString()
                                        : 'Never'}
                                </td>
                                <td className="px-6 py-4 text-slate-300">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
