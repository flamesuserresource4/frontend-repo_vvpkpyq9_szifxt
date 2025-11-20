import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(29,78,216,0.18),transparent_55%)] pointer-events-none" />
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-12 flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )}
