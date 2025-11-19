import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || ''

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } })
}

export default function Reforms() {
  const [wages, setWages] = useState([])
  const [pensions, setPensions] = useState([])

  useEffect(() => {
    fetch(`${API}/api/sport-wages`).then(r => r.json()).then(setWages).catch(() => {})
    fetch(`${API}/api/pension-reform`).then(r => r.json()).then(setPensions).catch(() => {})
  }, [])

  return (
    <div className="space-y-10">
      {/* 3D obrázky s jemným pohybom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop',
            title: 'Šport je férová hra',
            caption: 'Transparentné pravidlá odmeňovania v každej lige.'
          },
          {
            src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop',
            title: 'Podpora talentu',
            caption: 'Spravodlivé podmienky pre mladých aj skúsených.'
          },
          {
            src: 'https://images.unsplash.com/photo-1510535043828-7f88e0404d95?q=80&w=1200&auto=format&fit=crop',
            title: 'Dôstojná staroba',
            caption: 'Stabilita a istota v 13 jasných krokoch.'
          }
        ].map((card, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-900/40"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 * i }}
            whileHover={{ rotateX: -6, rotateY: 6, scale: 1.01 }}
          >
            <motion.img
              src={card.src}
              alt={card.title}
              className="h-44 w-full object-cover opacity-90"
              style={{ transform: 'translateZ(0px)' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="p-5">
              <div className="text-white font-semibold">{card.title}</div>
              <div className="text-blue-200/80 text-sm">{card.caption}</div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Dve karty s dátami + animácie riadkov/bodov */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-blue-500/20 bg-slate-800/50 p-6 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.25)]"
        >
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
                  <motion.tr
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    className="text-blue-50/90"
                    whileHover={{ scale: 1.01 }}
                  >
                    <td className="py-2 pr-4">{row.liga}</td>
                    <td className="py-2 pr-4">{row.min_mzda?.toLocaleString('sk-SK')}</td>
                    <td className="py-2 pr-4">{row.max_mzda?.toLocaleString('sk-SK')}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-blue-500/20 bg-slate-800/50 p-6 shadow-[0_10px_40px_-10px_rgba(147,197,253,0.2)]"
        >
          <h3 className="text-white font-bold text-xl mb-3">Dôchodková reforma – 13 bodov</h3>
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="list-decimal list-inside space-y-1 text-blue-50/90"
          >
            {pensions.map((p, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                whileHover={{ x: 4, color: '#fff' }}
                className="rounded px-1"
              >
                {p.opis}
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </div>
  )
}
