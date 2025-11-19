import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Reforms() {
  const [wages, setWages] = useState([])
  const [pensions, setPensions] = useState([])

  useEffect(() => {
    fetch(`${API}/api/sport-wages`).then(r => r.json()).then(setWages).catch(() => {})
    fetch(`${API}/api/pension-reform`).then(r => r.json()).then(setPensions).catch(() => {})
  }, [])

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:.6}} viewport={{once:true}} className="rounded-2xl border border-blue-500/20 bg-slate-800/50 p-6">
        <h3 className="text-white font-bold text-xl mb-3">Športová reforma – tabuľka miezd (1.–5. liga)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-blue-200/80">
                <th className="py-2 pr-4">Liga</th>
                <th className="py-2 pr-4">Min. mzda (€)</th>
                <th className="py-2 pr-4">Max. mzda (€)</th>
              </tr>
            </thead>
            <tbody>
              {wages.map((row, i) => (
                <tr key={i} className="text-blue-50/90">
                  <td className="py-2 pr-4">{row.liga}</td>
                  <td className="py-2 pr-4">{row.min_mzda.toLocaleString('sk-SK')}</td>
                  <td className="py-2 pr-4">{row.max_mzda.toLocaleString('sk-SK')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:.6, delay:.1}} viewport={{once:true}} className="rounded-2xl border border-blue-500/20 bg-slate-800/50 p-6">
        <h3 className="text-white font-bold text-xl mb-3">Dôchodková reforma – 13 bodov</h3>
        <ol className="list-decimal list-inside space-y-1 text-blue-50/90">
          {pensions.map((p, i) => (
            <li key={i}>{p.opis}</li>
          ))}
        </ol>
      </motion.div>
    </div>
  )
}
