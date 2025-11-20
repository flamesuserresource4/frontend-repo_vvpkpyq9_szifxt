import { Link } from 'react-router-dom'
import Hero from './components/Hero'
import Bio from './components/Bio'
import Videos from './components/Videos'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(29,78,216,0.18),transparent_55%)]" />
      <div className="relative">
        <header className="sticky top-0 z-20 backdrop-blur border-b border-blue-500/10 bg-slate-950/50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="font-extrabold text-white tracking-tight">Ivan Noskovič</div>
            <nav className="flex gap-6 text-sm">
              <Link to="/o-mne" className="hover:text-white">Môj životopis</Link>
              <Link to="/videa" className="hover:text-white">Moje videá</Link>
              <Link to="/reformy" className="hover:text-white">Reformy</Link>
              <Link to="/kontakt" className="hover:text-white">Kontakt & Chat</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 space-y-14 py-12">
          <Hero />

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">O mne</h2>
            <Bio />
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Najnovšie videá</h2>
            <Videos limit={6} hideForm />
            <div>
              <Link to="/videa" className="text-blue-300 hover:text-white underline">Zobraziť všetky videá →</Link>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Reformy</h2>
            <div className="text-blue-200/80">Pozrite si jednotlivé oblasti programu:</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/reformy#sport" className="rounded-xl border border-blue-500/20 bg-slate-800/50 p-5 hover:bg-slate-800/70 transition-colors">
                <div className="text-white font-semibold mb-1">Reforma športových miezd</div>
                <div className="text-blue-200/80 text-sm">Tabuľka miezd a princípy férovosti.</div>
              </Link>
              <Link to="/reformy#dochodky" className="rounded-xl border border-blue-500/20 bg-slate-800/50 p-5 hover:bg-slate-800/70 transition-colors">
                <div className="text-white font-semibold mb-1">Dôchodková reforma</div>
                <div className="text-blue-200/80 text-sm">13 jasných bodov pre stabilitu.</div>
              </Link>
            </div>
          </section>

          <footer className="pt-10 mt-8 border-t border-blue-500/10 text-center text-blue-300/70 text-sm">
            <div className="mb-2">Toto je oficiálna stránka kandidáta. Informácie majú informatívny charakter.</div>
            <div>© {new Date().getFullYear()} Ivan Noskovič — všetky práva vyhradené.</div>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
