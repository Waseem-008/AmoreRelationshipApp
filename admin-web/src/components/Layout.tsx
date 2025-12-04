import { Outlet, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Users, Heart, Clock, LogOut, Home } from 'lucide-react'

export default function Layout() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 h-screen w-64 bg-slate-800 border-r border-slate-700">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                        <Heart className="text-pink-500" />
                        Amora Admin
                    </h1>

                    <nav className="space-y-2">
                        <NavLink to="/" icon={<Home size={20} />} label="Dashboard" />
                        <NavLink to="/users" icon={<Users size={20} />} label="Users" />
                        <NavLink to="/couples" icon={<Heart size={20} />} label="Couples" />
                        <NavLink to="/sessions" icon={<Clock size={20} />} label="Sessions" />
                    </nav>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                <Outlet />
            </main>
        </div>
    )
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
        >
            {icon}
            <span>{label}</span>
        </Link>
    )
}
