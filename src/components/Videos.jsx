import { useEffect, useMemo, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircle, Twitter, Facebook, Linkedin, Reddit, ExternalLink, X as Close } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function buildShareLinks(item) {
  const pageUrl = encodeURIComponent(item.url?.startsWith('/') ? `${API}${item.url}` : item.url || '')
  const text = encodeURIComponent(`${item.title || 'Video'} – pozrite si video`)
  return {
    twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${text}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    reddit: `https://www.reddit.com/submit?url=${pageUrl}&title=${text}`
  }
}

function getYouTubeId(url = '') {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1)
    if (u.hostname.includes('youtube.com')) {
      if (u.searchParams.get('v')) return u.searchParams.get('v') || ''
      const parts = u.pathname.split('/')
      const idx = parts.findIndex(p => p === 'embed' || p === 'shorts' || p === 'watch')
      if (idx >= 0 && parts[idx + 1]) return parts[idx + 1]
    }
  } catch {}
  return ''
}

function timeAgo(iso) {
  if (!iso) return null
  try {
    const date = new Date(iso)
    const diff = Math.floor((Date.now() - date.getTime()) / 1000)
    const map = [
      ['rok', 31536000, 'roky', 'rokov'],
      ['mesiac', 2592000, 'mesiace', 'mesiacov'],
      ['týždeň', 604800, 'týždne', 'týždňov'],
      ['deň', 86400, 'dni', 'dní'],
      ['hodinu', 3600, 'hodiny', 'hodín'],
      ['minútu', 60, 'minúty', 'minút'],
      ['sekundu', 1, 'sekundy', 'sekúnd']
    ]
    for (const [label, sec, plural2, plural5] of map) {
      const val = Math.floor(diff / sec)
      if (val >= 1) {
        const form = val === 1 ? label : (val < 5 ? plural2 : plural5)
        return `${val} ${form} dozadu`
      }
    }
    return 'práve teraz'
  } catch {
    return null
  }
}

function VideoCard({ item, idx, onOpen }) {
  const share = buildShareLinks(item)
  const isYouTube = /youtu\.be|youtube\.com/.test(item.url || '')
  const ytId = isYouTube ? getYouTubeId(item.url || '') : ''
  const thumb = item.thumbnail || (isYouTube && ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : undefined)
  const playUrl = item.url?.startsWith('/') ? `${API}${item.url}` : item.url
  const added = timeAgo(item.created_at)

  const videoRef = useRef(null)
  const onEnter = () => {
    if (!isYouTube && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.muted = true
      videoRef.current.play().catch(()=>{})
    }
  }
  const onLeave = () => {
    if (!isYouTube && videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5, delay: idx*0.03}} className="rounded-2xl border border-blue-500/20 bg-slate-900/40 overflow-hidden">
      {/* Media preview */}
      <div className="relative group" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {isYouTube ? (
          thumb ? (
            <img src={thumb} alt={item.title} className="w-full aspect-video object-cover" />
          ) : (
            <div className="w-full aspect-video bg-slate-800/60" />
          )
        ) : (
          playUrl ? (
            <video
              ref={videoRef}
              src={playUrl}
              className="w-full aspect-video object-cover bg-black"
              preload="metadata"
              muted
              playsInline
              controls={false}
            />
          ) : (
            <div className="w-full aspect-video bg-slate-800/60" />
          )
        )}
        {playUrl && (
          <button onClick={() => onOpen({ ...item, isYouTube, ytId, playUrl })} className="absolute inset-0 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayCircle className="w-16 h-16 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
            </div>
          </button>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-white font-semibold leading-tight">{item.title}</div>
            {item.description ? <div className="text-blue-200/80 text-sm mt-1">{item.description}</div> : null}
            {added ? <div className="text-blue-300/60 text-xs mt-1">Pridané: {added}</div> : null}
          </div>
          {playUrl && (
            <a href={playUrl} target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white transition-colors" title="Otvoriť v novom okne">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Share icons */}
        <div className="flex items-center gap-2 pt-1">
          <a href={share.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sky-500/90 hover:bg-sky-500 text-white" title="Zdieľať na X/Twitter">
            <Twitter className="w-4 h-4" />
          </a>
          <a href={share.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-700/90 hover:bg-blue-700 text-white" title="Zdieľať na Facebook">
            <Facebook className="w-4 h-4" />
          </a>
          <a href={share.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sky-700/80 hover:bg-sky-700 text-white" title="Zdieľať na LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={share.reddit} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-orange-600/80 hover:bg-orange-600 text-white" title="Zdieľať na Reddit">
            <Reddit className="w-4 h-4" />
          </a>
        </div>

        <div className="text-xs text-blue-300/70 pt-1">
          Poznámka: Priame automatické publikovanie na TikTok/Instagram vyžaduje prepojenie s oficiálnymi účtami a schválené API. Vieme doplniť po prepojení účtov.
        </div>
      </div>
    </motion.div>
  )
}

export default function Videos({ limit, hideForm = false }) {
  const [items, setItems] = useState([])
  const [mode, setMode] = useState('url') // 'url' | 'upload'
  const [form, setForm] = useState({ title: '', url: '', thumbnail: '', description: '' })
  const [uploadForm, setUploadForm] = useState({ title: '', description: '', file: null })
  const [adding, setAdding] = useState(false)

  const [active, setActive] = useState(null) // {title,url,ytId,isYouTube}

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

  const list = useMemo(() => (limit ? items.slice(0, limit) : items), [items, limit])

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

      {list.length === 0 ? (
        <div className="rounded-2xl border border-blue-500/20 bg-slate-900/40 p-8 text-center">
          <div className="text-white font-semibold text-lg mb-2">Zatiaľ tu nie sú žiadne videá</div>
          <div className="text-blue-200/80 mb-4">Pridajte prvé video cez URL alebo upload súboru.</div>
          {hideForm ? (
            <Link to="/videa" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">Pridať prvé video</Link>
          ) : null}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((it, idx) => (
            <VideoCard key={idx} item={it} idx={idx} onOpen={setActive} />
          ))}
        </div>
      )}

      {/* Modal player */}
      <AnimatePresence>
        {active && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{scale:0.97, y: 20}} animate={{scale:1, y:0}} exit={{scale:0.98, opacity:0}} className="w-full max-w-5xl">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
                <button onClick={() => setActive(null)} className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white">
                  <Close className="w-4 h-4" />
                </button>
                <div className="w-full aspect-video bg-black">
                  {active.isYouTube ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${active.ytId}?autoplay=1&rel=0`}
                      title={active.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <video src={active.playUrl} className="w-full h-full" controls autoPlay playsInline />
                  )}
                </div>
                <div className="p-4 border-t border-white/10">
                  <div className="text-white font-semibold">{active.title}</div>
                  {active.description ? <div className="text-blue-200/80 text-sm mt-1">{active.description}</div> : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
