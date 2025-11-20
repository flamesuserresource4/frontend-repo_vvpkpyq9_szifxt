import { Link, useLocation } from 'react-router-dom'
import { Home, User, Video, Landmark, MessageSquare } from 'lucide-react'

export default function Header() {
  const { pathname } = useLocation()
  const isActive = (path) => pathname === path
  const base = 'transition-colors text-blue-200/90 hover:text-white'
  const activeClasses = 'text-white underline decoration-2 underline-offset-8'

  const items = [
    { to: '/', label: 'Domov', Icon: Home },
    { to: '/o-mne', label: 'O mne', Icon: User },
    { to: '/videa', label: 'Moje videá', Icon: Video },
    { to: '/reformy', label: 'Reformy', Icon: Landmark },
    { to: '/kontakt', label: 'Kontakt & Chat', Icon: MessageSquare },
  ]

  return (
    <header className="sticky top-0 z-20 backdrop-blur border-b border-blue-500/10 bg-slate-950/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-white tracking-tight">Ivan Noskovič</Link>
        <nav className="flex gap-6 text-sm">
          {items.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className={`${base} ${isActive(to) ? activeClasses : ''} flex items-center gap-2`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
