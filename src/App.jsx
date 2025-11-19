import Hero from './components/Hero'
import Reforms from './components/Reforms'
import ContactChat from './components/ContactChat'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(29,78,216,0.18),transparent_55%)]" />
      <div className="relative">
        <header className="sticky top-0 z-20 backdrop-blur border-b border-blue-500/10 bg-slate-950/50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="font-extrabold text-white tracking-tight">Ivan Noskovič</div>
            <nav className="flex gap-6 text-sm">
              <a href="#reformy" className="hover:text-white">Reformy</a>
              <a href="#kontakt" className="hover:text-white">Kontakt & Chat</a>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 space-y-20 py-12">
          <Hero />
          <section id="reformy" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Program a reformy</h2>
            <Reforms />
          </section>
          <section id="kontakt" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Kontakt a chat</h2>
            <ContactChat />
          </section>
          <footer className="py-10 text-center text-blue-300/60 text-sm">© {new Date().getFullYear()} Ivan Noskovič</footer>
        </main>
      </div>
    </div>
  )
}

export default App
