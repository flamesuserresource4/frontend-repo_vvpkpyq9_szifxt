import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || ''

function buildShareLinks(item) {
  const pageUrl = encodeURIComponent(item.url.startsWith('/') ? `${API}${item.url}` : item.url)
  const text = encodeURIComponent(`${item.title} – pozrite si video`)
  return {
    twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${text}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    reddit: `https://www.reddit.com/submit?url=${pageUrl}&title=${text}`
  }
}

export default function Videos({ limit, hideForm = false }) {
  const [items, setItems] = useState([])
  const [mode, setMode] = useState('url') // 'url' | 'upload'
  const [form, setForm] = useState({ title: '', url: '', thumbnail: '', description: '' })
  const [uploadForm, setUploadForm] = useState({ title: '', description: '', file: null })
  const [adding, setAdding] = useState(false)

  const load = async () => {
    try {
      const r = await fetch(`${API}/api/videos`)
      const d = await r.json()
      setItems(d)
    } catch {}
  }

  useEffect(() => { load() }, [])

  const addVideo = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.url.trim()) return
    setAdding(true)
    try {
      await fetch(`${API}/api/videos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setForm({ title: '', url: '', thumbnail: '', description: '' })
      await load()
    } catch {
      alert('Nepodarilo sa pridať video.')
    } finally {
      setAdding(false)
    }
  }

  const uploadVideo = async (e) => {
    e.preventDefault()
    if (!uploadForm.title.trim() || !uploadForm.file) return
    setAdding(true)
    try {
      const fd = new FormData()
      fd.append('title', uploadForm.title)
      if (uploadForm.description) fd.append('description', uploadForm.description)
      fd.append('file', uploadForm.file)
      const r = await fetch(`${API}/api/videos/upload`, { method: 'POST', body: fd })
      if (!r.ok) throw new Error('Upload zlyhal')
      setUploadForm({ title: '', description: '', file: null })
      await load()
      setMode('url')
    } catch (err) {
      alert('Nepodarilo sa nahrať video. Skúste iný formát (mp4, mov, webm, mkv, avi).')
    } finally {
      setAdding(false)
    }
  }

  const list = limit ? items.slice(0, limit) : items

  return (
    <div className="space-y-6">
      {!hideForm && (
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="rounded-2xl border border-blue-500/20 bg-slate-800/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-white font-bold text-xl">Pridať video</h3>
            <div className="ml-auto flex gap-2 text-sm">
              <button onClick={()=>setMode('url')} className={`px-3 py-1.5 rounded-lg border ${mode==='url'?'bg-blue-600 text-white border-blue-500':'bg-slate-900/60 text-blue-200 border-blue-500/20'}`}>Odkaz</button>
              <button onClick={()=>setMode('upload')} className={`px-3 py-1.5 rounded-lg border ${mode==='upload'?'bg-blue-600 text-white border-blue-500':'bg-slate-900/60 text-blue-200 border-blue-500/20'}`}>Upload</button>
            </div>
          </div>

          {mode === 'url' ? (
            <form onSubmit={addVideo} className="grid md:grid-cols-4 gap-3">
              <input className="rounded-lg bg-slate-900/60 border border-blue-500/20 px-3 py-2 text-blue-100 placeholder-blue-300/40" placeholder="Názov" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required />
              <input className="rounded-lg bg-slate-900/60 border border-blue-500/20 px-3 py-2 text-blue-100 placeholder-blue-300/40" placeholder="URL videa (YouTube alebo MP4)" value={form.url} onChange={e=>setForm({...form, url: e.target.value})} required />
              <input className="rounded-lg bg-slate-900/60 border border-blue-500/20 px-3 py-2 text-blue-100 placeholder-blue-300/40" placeholder="Thumbnail (nepovinné)" value={form.thumbnail} onChange={e=>setForm({...form, thumbnail: e.target.value})} />
              <input className="rounded-lg bg-slate-900/60 border border-blue-500/20 px-3 py-2 text-blue-100 placeholder-blue-300/40 md:col-span-2" placeholder="Popis (nepovinné)" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
              <div className="md:col-span-2 flex justify-end">
                <button disabled={adding} className="rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4 py-2 text-white font-semibold transition-colors w-full md:w-auto">{adding ? 'Pridávam…' : 'Pridať video'}</button>
              </div>
            </form>
          ) : (
            <form onSubmit={uploadVideo} className="grid md:grid-cols-4 gap-3">
              <input className="rounded-lg bg-slate-900/60 border border-blue-500/20 px-3 py-2 text-blue-100 placeholder-blue-300/40" placeholder="Názov" value={uploadForm.title} onChange={e=>setUploadForm({...uploadForm, title: e.target.value})} required />
              <input type="file" accept="video/mp4,video/webm,video/ogg,video/x-matroska,video/quicktime,video/x-msvideo" className="rounded-lg bg-slate-900/60 border border-blue-500/20 px-3 py-2 text-blue-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-600 file:text-white" onChange={e=>setUploadForm({...uploadForm, file: e.target.files?.[0] || null})} required />
              <input className="rounded-lg bg-slate-900/60 border border-blue-500/20 px-3 py-2 text-blue-100 placeholder-blue-300/40 md:col-span-2" placeholder="Popis (nepovinné)" value={uploadForm.description} onChange={e=>setUploadForm({...uploadForm, description: e.target.value})} />
              <div className="md:col-span-4 flex justify-end">
                <button disabled={adding} className="rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4 py-2 text-white font-semibold transition-colors w-full md:w-auto">{adding ? 'Nahrávam…' : 'Nahrať video'}</button>
              </div>
              <div className="md:col-span-4 text-xs text-blue-300/70">Podporované formáty: mp4, mov, webm, mkv, avi. Súbory sa ukladajú na server a sprístupnia sa cez URL.</div>
            </form>
          )}
        </motion.div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((it, idx) => {
          const share = buildShareLinks(it)
          const isYouTube = /youtu\.be|youtube\.com/.test(it.url)
          const thumb = it.thumbnail || (isYouTube ? `https://img.youtube.com/vi/${(it.url.match(/[?&]v=([^&]+)/)?.[1]) || (it.url.split('/').pop())}/hqdefault.jpg` : undefined)
          const playUrl = it.url?.startsWith('/') ? `${API}${it.url}` : it.url
          return (
            <motion.div key={idx} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5, delay: idx*0.03}} className="rounded-2xl border border-blue-500/20 bg-slate-900/40 overflow-hidden">
              {thumb ? (
                <img src={thumb} alt={it.title} className="w-full h-44 object-cover" />
              ) : (
                <div className="w-full h-44 bg-slate-800/60 flex items-center justify-center text-blue-300">Žiadny náhľad</div>
              )}
              <div className="p-4 space-y-2">
                <div className="text-white font-semibold">{it.title}</div>
                {it.description ? <div className="text-blue-200/80 text-sm">{it.description}</div> : null}
                <div className="flex gap-2 pt-2">
                  <a href={playUrl} target="_blank" className="text-sm rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-white">Prehrať</a>
                  <a href={share.twitter} target="_blank" className="text-sm rounded-lg bg-sky-500/90 hover:bg-sky-500 px-3 py-1.5 text-white">Zdieľať na Twitter</a>
                  <a href={share.facebook} target="_blank" className="text-sm rounded-lg bg-blue-700/90 hover:bg-blue-700 px-3 py-1.5 text-white">Zdieľať na Facebook</a>
                </div>
                <div className="flex gap-2">
                  <a href={share.linkedin} target="_blank" className="text-sm rounded-lg bg-sky-700/80 hover:bg-sky-700 px-3 py-1.5 text-white">LinkedIn</a>
                  <a href={share.reddit} target="_blank" className="text-sm rounded-lg bg-orange-600/80 hover:bg-orange-600 px-3 py-1.5 text-white">Reddit</a>
                </div>
                <div className="text-xs text-blue-300/70 pt-2">
                  Poznámka: Priame automatické publikovanie na TikTok/Instagram vyžaduje prepojenie s oficiálnymi účtami a schválené API. Vieme doplniť po prepojení účtov.
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
