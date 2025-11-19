import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function ContactChat() {
  const [contact, setContact] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [chatName, setChatName] = useState('Hosť')
  const [chatMsg, setChatMsg] = useState('')
  const [chat, setChat] = useState([])

  const submitContact = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch(`${API}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contact) })
      setContact({ name: '', email: '', message: '' })
      alert('Ďakujeme za správu. Ozveme sa čoskoro.')
    } catch (e) {
      alert('Nepodarilo sa odoslať.')
    } finally {
      setSending(false)
    }
  }

  const sendChat = async (e) => {
    e.preventDefault()
    if (!chatMsg.trim()) return
    try {
      await fetch(`${API}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: chatName || 'Hosť', content: chatMsg }) })
      setChatMsg('')
      loadChat()
    } catch {}
  }

  const loadChat = async () => {
    try {
      const r = await fetch(`${API}/api/chat?limit=30`)
      const d = await r.json()
      setChat(d)
    } catch {}
  }

  useEffect(() => {
    loadChat()
    const id = setInterval(loadChat, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <motion.form onSubmit={submitContact} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="rounded-2xl border border-blue-500/20 bg-slate-800/50 p-6">
        <h3 className="text-white font-bold text-xl mb-4">Kontakt</h3>
        <div className="space-y-3">
          <input className="w-full rounded-lg bg-slate-900/60 border border-blue-500/20 px-3 py-2 text-blue-100 placeholder-blue-300/40" placeholder="Meno" value={contact.name} onChange={e=>setContact({...contact, name:e.target.value})} required />
          <input type="email" className="w-full rounded-lg bg-slate-900/60 border border-blue-500/20 px-3 py-2 text-blue-100 placeholder-blue-300/40" placeholder="Email" value={contact.email} onChange={e=>setContact({...contact, email:e.target.value})} required />
          <textarea className="w-full rounded-lg bg-slate-900/60 border border-blue-500/20 px-3 py-2 text-blue-100 placeholder-blue-300/40" placeholder="Správa" rows={5} value={contact.message} onChange={e=>setContact({...contact, message:e.target.value})} required />
        </div>
        <button disabled={sending} className="mt-4 inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4 py-2 text-white font-semibold transition-colors">{sending ? 'Odosielam…' : 'Odoslať'}</button>
      </motion.form>

      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6, delay:.1}} className="rounded-2xl border border-blue-500/20 bg-slate-800/50 p-6">
        <h3 className="text-white font-bold text-xl mb-4">Verejný chat</h3>
        <div className="space-y-3">
          <input className="w-full rounded-lg bg-slate-900/60 border border-blue-500/20 px-3 py-2 text-blue-100 placeholder-blue-300/40" placeholder="Vaše meno" value={chatName} onChange={e=>setChatName(e.target.value)} />
          <div className="h-48 overflow-y-auto rounded-lg bg-slate-900/40 border border-blue-500/10 p-3 space-y-2">
            {chat.map((m, i) => (
              <div key={i} className="text-sm text-blue-100/90">
                <span className="font-semibold text-white">{m.name}:</span> {m.content}
              </div>
            ))}
          </div>
          <form onSubmit={sendChat} className="flex gap-2">
            <input className="flex-1 rounded-lg bg-slate-900/60 border border-blue-500/20 px-3 py-2 text-blue-100 placeholder-blue-300/40" placeholder="Napíšte správu" value={chatMsg} onChange={e=>setChatMsg(e.target.value)} />
            <button className="rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white font-semibold transition-colors">Poslať</button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
