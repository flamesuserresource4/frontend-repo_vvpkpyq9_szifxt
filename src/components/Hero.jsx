import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          Ivan Noskovič
        </h1>
        <p className="text-blue-200/90 max-w-2xl mx-auto text-lg md:text-xl">
          Verejný profil politika. Vízia pre šport, dôstojnú starobu a otvorenú komunikáciu.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          {label: 'Transparentnosť', desc: 'Otvorené údaje, otvorené rozhodnutia.'},
          {label: 'Šport', desc: 'Spravodlivé odmeňovanie od 1. po 5. ligu.'},
          {label: 'Dôstojná staroba', desc: 'Reforma postavená na stabilite a férovosti.'},
        ].map((f, i) => (
          <motion.div key={i} whileHover={{ y: -4 }} className="rounded-xl border border-blue-500/20 bg-slate-800/50 p-5">
            <div className="text-white font-semibold mb-1">{f.label}</div>
            <div className="text-blue-200/80 text-sm">{f.desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
