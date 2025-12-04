import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Heart, Users, MessageCircle, Activity, TrendingUp, AlertCircle, CheckCircle, XCircle, Clock, Zap, Calendar, RotateCcw } from 'lucide-react'
import './index.css'

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
                        <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                        <span>No backend connected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                        <span>Showing mock data</span>
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
                    value="248"
                    subtitle="124 couples"
                    trend="+12% this week"
                    color="blue"
                />
                <MetricCard
                    icon={<Zap className="w-6 h-6" />}
                    title="Active This Week"
                    value="196"
                    subtitle="79% engagement"
                    trend="+5% from last week"
                    color="green"
                />
                <MetricCard
                    icon={<MessageCircle className="w-6 h-6" />}
                    title="Today's Sessions"
                    value="47"
                    subtitle="38 voice, 9 chat"
                    trend="Normal activity"
                    color="purple"
                />
                <MetricCard
                    icon={<TrendingUp className="w-6 h-6" />}
                    title="Avg Streak"
                    value="8.4 wks"
                    subtitle="Longest: 22 weeks"
                    trend="+0.3 weeks"
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
                    <h2 className="text-xl font-bold text-white">System Alerts</h2>
                </div>
                <div className="space-y-3">
                    <Alert type="warning" message="3 couples have not completed sessions in 7+ days" icon={<Clock className="w-4 h-4" />} />
                    <Alert type="info" message="15 weekly exercises pending reflection (due Monday)" icon={<Calendar className="w-4 h-4" />} />
                    <Alert type="success" message="OpenAI API response time: 180ms avg" icon={<Zap className="w-4 h-4" />} />
                </div>
            </div>
        </div>
    )
}

function UsersPage() {
    const users = [
        { id: 1, name: "Sarah Martinez", email: "sarah@example.com", coupleId: "C-001", intakeComplete: true, lastSession: "2 hours ago", sessions: 24, status: "active" },
        { id: 2, name: "John Davis", email: "john@example.com", coupleId: "C-001", intakeComplete: true, lastSession: "2 hours ago", sessions: 24, status: "active" },
        { id: 3, name: "Emma Wilson", email: "emma@example.com", coupleId: null, intakeComplete: true, lastSession: "Never", sessions: 0, status: "waiting" },
        { id: 4, name: "Mike Rodriguez", email: "mike@example.com", coupleId: "C-002", intakeComplete: true, lastSession: "5 hours ago", sessions: 31, status: "active" },
        { id: 5, name: "Lisa Chen", email: "lisa@example.com", coupleId: "C-002", intakeComplete: true, lastSession: "5 hours ago", sessions: 22, status: "active" },
        { id: 6, name: "Tom Harris", email: "tom@example.com", coupleId: "C-003", intakeComplete: true, lastSession: "1 day ago", sessions: 15, status: "active" },
        { id: 7, name: "Anna Kim", email: "anna@example.com", coupleId: "C-004", intakeComplete: true, lastSession: "3 hours ago", sessions: 28, status: "active" },
        { id: 8, name: "David Lee", email: "david@example.com", coupleId: "C-004", intakeComplete: true, lastSession: "3 hours ago", sessions: 19, status: "active" },
        { id: 9, name: "Maria Santos", email: "maria@example.com", coupleId: null, intakeComplete: false, lastSession: "Never", sessions: 0, status: "incomplete" },
        { id: 10, name: "James Brown", email: "james@example.com", coupleId: "C-005", intakeComplete: true, lastSession: "1 hour ago", sessions: 33, status: "active" },
        { id: 11, name: "Sophie Taylor", email: "sophie@example.com", coupleId: "C-005", intakeComplete: true, lastSession: "1 hour ago", sessions: 27, status: "active" },
        { id: 12, name: "Alex Parker", email: "alex@example.com", coupleId: null, intakeComplete: true, lastSession: "Never", sessions: 8, status: "waiting" },
    ]

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
                            <th className="text-left px-6 py-4 text-slate-300 font-semibold">Sessions</th>
                            <th className="text-left px-6 py-4 text-slate-300 font-semibold">Last Active</th>
                            <th className="text-left px-6 py-4 text-slate-300 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-white font-medium">{user.name}</p>
                                        <p className="text-sm text-slate-500">{user.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.coupleId ? (
                                        <div className="flex items-center gap-2">
                                            <Heart className="w-4 h-4 text-pink-400" />
                                            <span className="text-pink-400 font-mono text-sm font-medium">{user.coupleId}</span>
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
                                    <div className="flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4 text-slate-500" />
                                        <span className="text-white font-medium">{user.sessions}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-300 text-sm">{user.lastSession}</span>
                                    </div>
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
    const couples = [
        { id: "C-001", user1: "Sarah Martinez", user2: "John Davis", sessions: 42, streak: 12, exercise: "Love Languages Discussion", exerciseStatus: "Both Reflected", pairedAt: "3 months ago", completion: 89 },
        { id: "C-002", user1: "Mike Rodriguez", user2: "Lisa Chen", sessions: 53, streak: 18, exercise: "Appreciation Letter Exchange", exerciseStatus: "Assigned", pairedAt: "4 months ago", completion: 92 },
        { id: "C-003", user1: "Emma Wilson", user2: "Tom Harris", sessions: 15, streak: 5, exercise: "Daily Gratitude Practice", exerciseStatus: "Partner A Reflected", pairedAt: "6 weeks ago", completion: 71 },
        { id: "C-004", user1: "Anna Kim", user2: "David Lee", sessions: 38, streak: 14, exercise: "Active Listening Exercise", exerciseStatus: "Both Reflected", pairedAt: "3 months ago", completion: 86 },
        { id: "C-005", user1: "James Brown", user2: "Sophie Taylor", sessions: 60, streak: 22, exercise: "Future Visioning Together", exerciseStatus: "Completed", pairedAt: "5 months ago", completion: 95 },
    ]

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
                                    <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-lg text-xs font-mono text-pink-400">{couple.id}</span>
                                    <span className="text-xs text-slate-500">• Paired {couple.pairedAt}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                    {couple.user1} <Heart className="w-5 h-5 text-pink-400 fill-pink-400" /> {couple.user2}
                                </h3>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                    <RotateCcw className="w-4 h-4" />
                                    Reset Exercise
                                </button>
                                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                    <XCircle className="w-4 h-4" />
                                    Unpair
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <StatBox icon={<MessageCircle className="w-5 h-5" />} label="Total Sessions" value={couple.sessions.toString()} color="blue" />
                            <StatBox icon={<TrendingUp className="w-5 h-5" />} label="Shared Streak" value={`${couple.streak} weeks`} color="pink" emoji="🔥" />
                            <StatBox icon={<Calendar className="w-5 h-5" />} label="This Week" value="5/7 days" color="green" />
                            <StatBox icon={<Activity className="w-5 h-5" />} label="Completion" value={`${couple.completion}%`} color="purple" />
                        </div>

                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-indigo-400" />
                                    <h4 className="text-sm font-semibold text-slate-300">Current Weekly Exercise</h4>
                                </div>
                                <ExerciseStatusBadge status={couple.exerciseStatus} />
                            </div>
                            <p className="text-white font-medium mb-2">{couple.exercise}</p>
                            <p className="text-sm text-slate-400 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Assigned: Last Friday • Reflection due: Monday
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Sessions() {
    const sessions = [
        { id: 1, couple: "Sarah M. & John D.", user: "Sarah M.", mode: "Voice", duration: "14:32", date: "2 hours ago", summary: "Discussed communication patterns during conflict. Identified need for more active listening.", status: "completed" },
        { id: 2, couple: "Mike R. & Lisa C.", user: "Lisa C.", mode: "Chat", duration: "8:45", date: "5 hours ago", summary: "Explored recent stress about work-life balance. Set intention for quality time.", status: "completed" },
        { id: 3, couple: "Anna K. & David L.", user: "David L.", mode: "Mixed", duration: "12:18", date: "3 hours ago", summary: "Started with voice, switched to chat after connection issue. Reflected on appreciation.", status: "fallback" },
        { id: 4, couple: "James B. & Sophie T.", user: "James B.", mode: "Voice", duration: "15:00", date: "1 hour ago", summary: "Session reached 15-minute cutoff during discussion about future planning.", status: "cutoff" },
        { id: 5, couple: "Sarah M. & John D.", user: "John D.", mode: "Voice", duration: "13:22", date: "2 hours ago", summary: "Continued themes from partner's session. Committed to weekly date nights.", status: "completed" },
        { id: 6, couple: "Emma W. & Tom H.", user: "Tom H.", mode: "Voice", duration: "11:54", date: "1 day ago", summary: "Weekly reflection on gratitude exercise. Shared positive experiences from weekend.", status: "completed" },
        { id: 7, couple: "Mike R. & Lisa C.", user: "Mike R.", mode: "Voice", duration: "2:34", date: "6 hours ago", summary: "Session ended early due to technical issues. Retry allowed.", status: "error" },
    ]

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
                                        <h3 className="text-lg font-bold text-white">{session.user}</h3>
                                    </div>
                                    <SessionModeBadge mode={session.mode} />
                                    <SessionStatusBadge status={session.status} />
                                </div>
                                <p className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-pink-400" />
                                    Couple: {session.couple}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {session.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {session.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                                <MessageCircle className="w-4 h-4 text-slate-400" />
                                <p className="text-sm text-slate-400 font-medium">AI Summary</p>
                            </div>
                            <p className="text-white leading-relaxed">{session.summary}</p>
                        </div>
                    </div>
                ))}
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
