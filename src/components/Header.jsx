import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, User, Video, Landmark, MessageSquare, Menu, X } from 'lucide-react'

export default function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

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

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-20 backdrop-blur border-b border-blue-500/10 bg-slate-950/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-white tracking-tight" onClick={closeMenu}>
          Ivan Noskovič
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-6 text-sm">
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-blue-200/90 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}
      >
        <nav className="px-6 pb-4 flex flex-col gap-3 bg-slate-950/80 border-t border-blue-500/10">
          {items.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={closeMenu}
              className={`${base} ${isActive(to) ? activeClasses : ''} flex items-center gap-3 py-2`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-base">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
