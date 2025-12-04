import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { Heart, Users, MessageCircle, Activity, TrendingUp, AlertCircle, CheckCircle, XCircle, Clock, Zap, Calendar } from 'lucide-react'
import './index.css'
import { useUsers, useCouples, useSessions, useAnalytics } from './lib/hooks'

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <Sidebar />
                <main className="ml-64 p-8">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/couples" element={<Couples />} />
                        <Route path="/sessions" element={<Sessions />} />
                        <Route path="/errors" element={<ErrorsPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

function Sidebar() {
    const location = useLocation()

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-slate-900/95 backdrop-blur-sm border-r border-slate-800">
            <div className="p-6">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white fill-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Amora</h1>
                            <p className="text-xs text-slate-500">Admin Panel</p>
                        </div>
                    </div>
                    <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg inline-flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-emerald-400 font-medium">Demo Mode</span>
                    </div>
                </div>

                <nav className="space-y-1">
                    <NavLink to="/" icon={<Activity size={20} />} label="Dashboard" active={location.pathname === '/'} />
                    <NavLink to="/users" icon={<Users size={20} />} label="Users" active={location.pathname === '/users'} />
                    <NavLink to="/couples" icon={<Heart size={20} />} label="Couples" active={location.pathname === '/couples'} />
                    <NavLink to="/sessions" icon={<MessageCircle size={20} />} label="Sessions" active={location.pathname === '/sessions'} />
                    <NavLink to="/errors" icon={<AlertCircle size={20} />} label="Errors" active={location.pathname === '/errors'} />
                </nav>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800">
                <div className="text-xs text-slate-600">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-emerald-400">Demo backend active</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-blue-400">Live data operations</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}

function NavLink({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </Link>
    )
}

function Dashboard() {
    const { analytics, loading } = useAnalytics()

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-white text-xl">Loading...</div>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-slate-400">Overview of your relationship wellness platform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    icon={<Users className="w-6 h-6" />}
                    title="Total Users"
                    value={analytics.totalUsers.toString()}
                    subtitle={`${analytics.totalCouples} couples`}
                    trend={`${analytics.pairedUsers} paired`}
                    color="blue"
                />
                <MetricCard
                    icon={<Zap className="w-6 h-6" />}
                    title="Completed Intakes"
                    value={analytics.completedIntakes.toString()}
                    subtitle={`${Math.round((analytics.completedIntakes / analytics.totalUsers) * 100)}% completion`}
                    trend="Onboarding progress"
                    color="green"
                />
                <MetricCard
                    icon={<MessageCircle className="w-6 h-6" />}
                    title="Total Sessions"
                    value={analytics.totalSessions.toString()}
                    subtitle={`${analytics.completedSessions} completed`}
                    trend={`${analytics.completionRate}% success rate`}
                    color="purple"
                />
                <MetricCard
                    icon={<TrendingUp className="w-6 h-6" />}
                    title="Active Today"
                    value={analytics.activeToday.toString()}
                    subtitle="Sessions today"
                    trend="Real-time activity"
                    color="pink"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Session Trends</h2>
                        <span className="text-sm text-slate-500">Last 7 Days</span>
                    </div>
                    <div className="space-y-4">
                        <TrendBar day="Monday" sessions={42} maxSessions={70} />
                        <TrendBar day="Tuesday" sessions={51} maxSessions={70} />
                        <TrendBar day="Wednesday" sessions={48} maxSessions={70} />
                        <TrendBar day="Thursday" sessions={55} maxSessions={70} />
                        <TrendBar day="Friday" sessions={62} maxSessions={70} />
                        <TrendBar day="Saturday" sessions={38} maxSessions={70} />
                        <TrendBar day="Sunday" sessions={47} maxSessions={70} />
                    </div>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                        <Activity className="w-5 h-5 text-slate-500" />
                    </div>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        <ActivityItem icon={<CheckCircle className="w-5 h-5 text-emerald-400" />} user="Sarah M." action="Completed voice session (14 min)" time="2 min ago" />
                        <ActivityItem icon={<Heart className="w-5 h-5 text-pink-400" />} user="John D." action="Paired with partner" time="15 min ago" />
                        <ActivityItem icon={<XCircle className="w-5 h-5 text-red-400" />} user="Mike R." action="Session failed - reconnect timeout" time="32 min ago" />
                        <ActivityItem icon={<CheckCircle className="w-5 h-5 text-emerald-400" />} user="Emma W." action="Completed weekly reflection" time="1 hour ago" />
                        <ActivityItem icon={<Activity className="w-5 h-5 text-blue-400" />} user="Lisa C." action="Completed intake (10 questions)" time="2 hours ago" />
                        <ActivityItem icon={<MessageCircle className="w-5 h-5 text-purple-400" />} user="Tom H." action="Started voice session" time="2 hours ago" />
                        <ActivityItem icon={<AlertCircle className="w-5 h-5 text-yellow-400" />} user="Anna K." action="Fallback to chat triggered" time="3 hours ago" />
                        <ActivityItem icon={<Calendar className="w-5 h-5 text-indigo-400" />} user="David L." action="Weekly exercise assigned" time="4 hours ago" />
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="w-6 h-6 text-amber-400" />
                    <h2 className="text-xl font-bold text-white">System Status</h2>
                </div>
                <div className="space-y-3">
                    <Alert type="success" message={`${analytics.totalCouples} active couple${analytics.totalCouples !== 1 ? 's' : ''} in the system`} icon={<Heart className="w-4 h-4" />} />
                    <Alert type="info" message={`${analytics.totalSessions} total sessions completed`} icon={<MessageCircle className="w-4 h-4" />} />
                    <Alert type="success" message="Demo mode active - All data is stored locally" icon={<Zap className="w-4 h-4" />} />
                </div>
            </div>
        </div>
    )
}


function UsersPage() {
    const { users, loading } = useUsers()

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-white text-xl">Loading users...</div>
            </div>
        )
    }

    // Format user data for display
    const displayUsers = users.map(user => ({
        id: user.id,
        email: user.email,
        coupleId: user.couple_id,
        intakeComplete: !!user.intake_completed_at,
        partnerEmail: user.partner_email,
        status: user.couple_id ? 'active' : user.intake_completed_at ? 'waiting' : 'incomplete'
    }))

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Users</h1>
                    <p className="text-slate-400">Manage user accounts and pairing status</p>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-blue-400" />
                        <div>
                            <p className="text-3xl font-bold text-white">{users.length}</p>
                            <p className="text-sm text-slate-400">Total Users</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full">
                    <thead className="bg-slate-800/50">
                        <tr>
                            <th className="text-left px-6 py-4 text-slate-300 font-semibold">User</th>
                            <th className="text-left px-6 py-4 text-slate-300 font-semibold">Couple</th>
                            <th className="text-left px-6 py-4 text-slate-300 font-semibold">Intake</th>
                            <th className="text-left px-6 py-4 text-slate-300 font-semibold">Partner</th>
                            <th className="text-left px-6 py-4 text-slate-300 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {displayUsers.map(user => (
                            <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-white font-medium">{user.email.split('@')[0]}</p>
                                        <p className="text-sm text-slate-500">{user.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.coupleId ? (
                                        <div className="flex items-center gap-2">
                                            <Heart className="w-4 h-4 text-pink-400" />
                                            <span className="text-pink-400 font-mono text-sm font-medium">{user.coupleId.substring(0, 8)}</span>
                                        </div>
                                    ) : (
                                        <span className="text-slate-600">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {user.intakeComplete ? (
                                        <div className="flex items-center gap-2 text-emerald-400">
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-sm font-medium">Complete</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-amber-400">
                                            <AlertCircle className="w-4 h-4" />
                                            <span className="text-sm font-medium">Pending</span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {user.partnerEmail ? (
                                        <span className="text-slate-300 text-sm">{user.partnerEmail}</span>
                                    ) : (
                                        <span className="text-slate-600 text-sm">No partner</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={user.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}



function Couples() {
    const { couples, loading, unpairCouple } = useCouples()

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-white text-xl">Loading couples...</div>
            </div>
        )
    }

    const handleUnpair = async (coupleId: string) => {
        if (confirm('Are you sure you want to unpair this couple?')) {
            await unpairCouple(coupleId)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Couples</h1>
                    <p className="text-slate-400">View paired users and weekly exercises</p>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center gap-3">
                        <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
                        <div>
                            <p className="text-3xl font-bold text-white">{couples.length}</p>
                            <p className="text-sm text-slate-400">Active Pairs</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                {couples.map(couple => (
                    <div key={couple.id} className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 shadow-xl hover:border-pink-500/30 transition-all">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-lg text-xs font-mono text-pink-400">{couple.id.substring(0, 8)}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                    {couple.user1_email?.split('@')[0] || 'User 1'} <Heart className="w-5 h-5 text-pink-400 fill-pink-400" /> {couple.user2_email?.split('@')[0] || 'User 2'}
                                </h3>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleUnpair(couple.id)}
                                    className="px-4 py-2 bg-slate-800 hover:bg-red-600/20 text-slate-300 hover:text-red-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <XCircle className="w-4 h-4" />
                                    Unpair
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <StatBox icon={<TrendingUp className="w-5 h-5" />} label="Shared Streak" value={`${couple.shared_streak} weeks`} color="pink" emoji="🔥" />
                            <StatBox icon={<Users className="w-5 h-5" />} label="User 1" value={couple.user1_email?.split('@')[0] || '-'} color="blue" />
                            <StatBox icon={<Users className="w-5 h-5" />} label="User 2" value={couple.user2_email?.split('@')[0] || '-'} color="green" />
                        </div>
                    </div>
                ))}

                {couples.length === 0 && (
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-800 text-center">
                        <Heart className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Couples Yet</h3>
                        <p className="text-slate-400">Waiting for users to pair up</p>
                    </div>
                )}
            </div>
        </div>
    )
}



function Sessions() {
    const { sessions, loading } = useSessions()

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-white text-xl">Loading sessions...</div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Sessions</h1>
                    <p className="text-slate-400">View all completed AI-guided sessions</p>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center gap-3">
                        <MessageCircle className="w-8 h-8 text-purple-400" />
                        <div>
                            <p className="text-3xl font-bold text-white">{sessions.length}</p>
                            <p className="text-sm text-slate-400">Recent Sessions</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {sessions.map(session => (
                    <div key={session.id} className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 shadow-xl hover:border-purple-500/30 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-slate-500" />
                                        <h3 className="text-lg font-bold text-white">{session.user_email?.split('@')[0] || 'Unknown User'}</h3>
                                    </div>
                                    <SessionModeBadge mode={session.mode} />
                                    <SessionStatusBadge status={session.status} />
                                </div>
                                <p className="text-sm text-slate-400 mb-2">{session.user_email}</p>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(session.started_at).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {session.transcript && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <MessageCircle className="w-4 h-4 text-slate-400" />
                                    <p className="text-sm text-slate-400 font-medium">Session Summary</p>
                                </div>
                                <p className="text-white leading-relaxed">{session.transcript}</p>
                            </div>
                        )}
                    </div>
                ))}

                {sessions.length === 0 && (
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-800 text-center">
                        <MessageCircle className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Sessions Yet</h3>
                        <p className="text-slate-400">Waiting for users to complete sessions</p>
                    </div>
                )}
            </div>
        </div>
    )
}


// Enhanced Helper Components
function MetricCard({ icon, title, value, subtitle, trend, color }: any) {
    const colors: Record<string, string> = {
        blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
        pink: 'from-pink-500/20 to-rose-600/20 border-pink-500/30',
        green: 'from-emerald-500/20 to-green-600/20 border-emerald-500/30',
        purple: 'from-purple-500/20 to-violet-600/20 border-purple-500/30'
    }

    const iconColors: Record<string, string> = {
        blue: 'text-blue-400',
        pink: 'text-pink-400',
        green: 'text-emerald-400',
        purple: 'text-purple-400'
    }

    return (
        <div className={`bg-gradient-to-br ${colors[color]} backdrop-blur-sm rounded-2xl p-6 border shadow-xl hover:shadow-2xl transition-all hover:scale-105`}>
            <div className={`mb-4 ${iconColors[color]}`}>
                {icon}
            </div>
            <p className="text-slate-400 text-sm mb-2">{title}</p>
            <p className="text-4xl font-bold text-white mb-1">{value}</p>
            <p className="text-sm text-slate-500 mb-2">{subtitle}</p>
            <p className="text-xs text-emerald-400 font-medium">{trend}</p>
        </div>
    )
}

function TrendBar({ day, sessions, maxSessions }: { day: string; sessions: number; maxSessions: number }) {
    const percentage = (sessions / maxSessions) * 100

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">{day}</span>
                <span className="text-sm font-bold text-white">{sessions}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-pink-500 to-rose-600 h-3 rounded-full transition-all duration-500 shadow-lg shadow-pink-500/20"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    )
}

function ActivityItem({ icon, user, action, time }: any) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user}</p>
                <p className="text-slate-400 text-sm">{action}</p>
            </div>
            <span className="text-slate-500 text-xs whitespace-nowrap">{time}</span>
        </div>
    )
}

function Alert({ type, message, icon }: any) {
    const styles: Record<string, string> = {
        success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        error: 'bg-red-500/10 border-red-500/30 text-red-400',
        info: 'bg-blue-500/10 border-blue-500/30 text-blue-400'
    }

    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${styles[type]}`}>
            {icon}
            <span className="flex-1">{message}</span>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, any> = {
        active: { bg: 'bg-emerald-500/10 border-emerald-500/30', text: 'text-emerald-400', icon: <CheckCircle className="w-3 h-3" /> },
        waiting: { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-400', icon: <Clock className="w-3 h-3" /> },
        incomplete: { bg: 'bg-red-500/10 border-red-500/30', text: 'text-red-400', icon: <AlertCircle className="w-3 h-3" /> }
    }

    const style = styles[status]

    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-medium ${style.bg} ${style.text}`}>
            {style.icon}
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    )
}

function StatBox({ icon, label, value, color, emoji }: any) {
    const colors: Record<string, string> = {
        blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
        green: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
        purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400'
    }

    return (
        <div className={`${colors[color]} rounded-xl p-4 border`}>
            <div className="flex items-center gap-2 mb-2">
                {icon}
                <p className="text-xs font-medium opacity-80">{label}</p>
            </div>
            <p className="text-2xl font-bold flex items-center gap-1">
                {emoji && <span>{emoji}</span>}
                {value}
            </p>
        </div>
    )
}

function ExerciseStatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        'Assigned': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
        'Partner A Reflected': 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        'Both Reflected': 'bg-purple-500/10 border-purple-500/30 text-purple-400',
        'Completed': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
    }

    return (
        <span className={`px-3 py-1 rounded-lg border text-xs font-medium ${styles[status]}`}>
            {status}
        </span>
    )
}

function SessionModeBadge({ mode }: { mode: string }) {
    const styles: Record<string, any> = {
        'Voice': { bg: 'bg-blue-500/10 border-blue-500/30', text: 'text-blue-400', icon: <MessageCircle className="w-3 h-3" /> },
        'Chat': { bg: 'bg-purple-500/10 border-purple-500/30', text: 'text-purple-400', icon: <MessageCircle className="w-3 h-3" /> },
        'Mixed': { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-400', icon: <Activity className="w-3 h-3" /> }
    }

    const style = styles[mode]

    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-medium ${style.bg} ${style.text}`}>
            {style.icon}
            {mode}
        </span>
    )
}

function SessionStatusBadge({ status }: { status: string }) {
    const styles: Record<string, any> = {
        'completed': { bg: 'bg-emerald-500/10 border-emerald-500/30', text: 'text-emerald-400', icon: <CheckCircle className="w-3 h-3" />, label: 'Completed' },
        'fallback': { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-400', icon: <AlertCircle className="w-3 h-3" />, label: 'Fallback Used' },
        'cutoff': { bg: 'bg-orange-500/10 border-orange-500/30', text: 'text-orange-400', icon: <Clock className="w-3 h-3" />, label: '15-Min Cutoff' },
        'error': { bg: 'bg-red-500/10 border-red-500/30', text: 'text-red-400', icon: <XCircle className="w-3 h-3" />, label: 'Error' }
    }

    const style = styles[status]

    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-medium ${style.bg} ${style.text}`}>
            {style.icon}
            {style.label}
        </span>
    )
}

function ErrorsPage() {
    const errors = [
        {
            id: "ERR-2847",
            timestamp: "2 hours ago",
            severity: "error",
            type: "Connection Timeout",
            user: "Mike R. (USR-004)",
            session: "SES-1843",
            message: "OpenAI Realtime API connection timeout after 3 seconds",
            stack: "WebSocket connection failed at 192.168.1.1:443\nat RealtimeService.connect()\nat SessionView.startSession()",
            resolved: false
        },
        {
            id: "ERR-2846",
            timestamp: "5 hours ago",
            severity: "warning",
            type: "Reconnect Attempted",
            user: "David L. (USR-008)",
            session: "SES-1845",
            message: "Voice connection dropped, attempting reconnect",
            stack: "Connection lost at 8:42 into session\nReconnect attempt 1/1 successful\nFallback to chat activated",
            resolved: true
        },
        {
            id: "ERR-2845",
            timestamp: "1 day ago",
            severity: "error",
            type: "Memory Validation Failed",
            user: "System",
            session: "SES-1821",
            message: "Memory entry rejected: contains partner-identifying information",
            stack: "Memory validation failed at validateMemoryEntry()\nRejected entry: {type: 'theme', content: '...'}\nReason: Cross-partner leakage detected\nSecurity policy enforced",
            resolved: true
        },
        {
            id: "ERR-2844",
            timestamp: "1 day ago",
            severity: "warning",
            type: "API Rate Limit",
            user: "System",
            session: null,
            message: "OpenAI API approaching rate limit (85% of quota)",
            stack: "Current usage: 850 requests / 1000 limit\nPeriod: Last hour\nRecommendation: Monitor usage\nAction: None required",
            resolved: false
        },
        {
            id: "ERR-2843",
            timestamp: "2 days ago",
            severity: "info",
            type: "Session Cutoff",
            user: "James B. (USR-010)",
            session: "SES-1802",
            message: "Session reached 15-minute hard cutoff",
            stack: "Session duration: 15:00\nCutoff enforced by backend\nNormal behavior - not an error\nSession summary generated successfully",
            resolved: true
        },
    ]

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Error Logs</h1>
                    <p className="text-slate-400">Monitor system errors and issues from Sentry integration</p>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                        <div>
                            <p className="text-3xl font-bold text-white">{errors.filter(e => !e.resolved).length}</p>
                            <p className="text-sm text-slate-400">Unresolved</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {errors.map(error => (
                    <div
                        key={error.id}
                        className={`bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border shadow-xl transition-all ${error.severity === 'error' ? 'border-red-500/30 hover:border-red-500/50' :
                            error.severity === 'warning' ? 'border-amber-500/30 hover:border-amber-500/50' :
                                'border-blue-500/30 hover:border-blue-500/50'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-slate-400">{error.id}</span>
                                    <ErrorSeverityBadge severity={error.severity} />
                                    {error.resolved && (
                                        <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs font-medium text-emerald-400 flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" />
                                            Resolved
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{error.type}</h3>
                                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {error.timestamp}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {error.user}
                                    </span>
                                    {error.session && (
                                        <span className="flex items-center gap-1">
                                            <MessageCircle className="w-4 h-4" />
                                            {error.session}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700">
                                <p className="text-sm text-slate-400 mb-2 font-medium">Error Message</p>
                                <p className="text-white">{error.message}</p>
                            </div>

                            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700">
                                <p className="text-sm text-slate-400 mb-2 font-medium">Stack Trace</p>
                                <pre className="text-xs text-slate-400 whitespace-pre-wrap font-mono leading-relaxed">
                                    {error.stack}
                                </pre>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ErrorSeverityBadge({ severity }: { severity: string }) {
    const styles: Record<string, any> = {
        'error': { bg: 'bg-red-500/10 border-red-500/30', text: 'text-red-400', icon: <XCircle className="w-3 h-3" /> },
        'warning': { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-400', icon: <AlertCircle className="w-3 h-3" /> },
        'info': { bg: 'bg-blue-500/10 border-blue-500/30', text: 'text-blue-400', icon: <Activity className="w-3 h-3" /> }
    }

    const style = styles[severity]

    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-medium ${style.bg} ${style.text}`}>
            {style.icon}
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </span>
    )
}

export default App
