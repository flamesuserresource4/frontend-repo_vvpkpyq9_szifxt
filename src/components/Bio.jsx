import { motion } from 'framer-motion'

export default function Bio() {
  const photo = 'https://62f4fbe774.cbaul-cdnwnd.com/d22309406884e376f6fd97f0f55cf2bd/system_preview_detail_200000272-d847fd9431/zam_Ivan_Noskovic_01_TypB_vs300.jpg'
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="relative mx-auto w-56 h-56 md:w-72 md:h-72">
          <motion.img
            src={photo}
            alt="Portrét – Ivan Noskovič"
            className="rounded-2xl object-cover w-full h-full border border-blue-500/20 shadow-[0_20px_60px_-20px_rgba(37,99,235,0.35)]"
            initial={{ scale: 0.96, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
          <div className="absolute -inset-2 -z-10 bg-gradient-to-tr from-blue-600/20 via-sky-500/10 to-cyan-400/10 blur-2xl rounded-3xl" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="space-y-4"
      >
        <h3 className="text-white font-bold text-2xl">Môj životopis</h3>
        <p className="text-blue-200/90">
          Som občiansky kandidát so zameraním na transparentnosť, spravodlivé odmeňovanie v športe a dôstojnú starobu.
          Verím v poctivú verejnú službu, otvorenú komunikáciu a dáta, ktoré pomáhajú lepšie rozhodovať.
        </p>
        <p className="text-blue-200/80 text-sm">
          Nižšie nájdete hlavné piliere môjho programu aj možnosť napísať mi priamo alebo pridať sa do verejného chatu.
        </p>
      </motion.div>
    </div>
  )
}
