import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()
  const linkBase = 'hover:text-white'
  const active = (path) => pathname === path ? 'text-white' : 'text-blue-200/90'

  return (
    <header className="sticky top-0 z-20 backdrop-blur border-b border-blue-500/10 bg-slate-950/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-white tracking-tight">Ivan Noskovič</Link>
        <nav className="flex gap-6 text-sm">
          <Link to="/o-mne" className={`${linkBase} ${active('/o-mne')}`}>Môj životopis</Link>
          <Link to="/videa" className={`${linkBase} ${active('/videa')}`}>Moje videá</Link>
          <Link to="/reformy" className={`${linkBase} ${active('/reformy')}`}>Reformy</Link>
          <Link to="/kontakt" className={`${linkBase} ${active('/kontakt')}`}>Kontakt & Chat</Link>
        </nav>
      </div>
    </header>
  )
}
