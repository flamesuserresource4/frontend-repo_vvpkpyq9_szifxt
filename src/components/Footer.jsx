export default function Footer() {
  const links = [
    {
      href: 'https://www.facebook.com/ivan.noskovic',
      label: 'Facebook',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
          <path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.48 2 2 6.48 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.81 8.44-4.95 8.44-9.94Z"/>
        </svg>
      ),
    },
    {
      href: 'https://www.instagram.com/ivan.noskovic/',
      label: 'Instagram',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.75-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z"/>
        </svg>
      ),
    },
    {
      href: 'https://www.tiktok.com/@ivannoskovic?lang=en',
      label: 'TikTok',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
          <path d="M14.5 2h2.2c.2 1 .7 1.9 1.4 2.7.9.9 2.1 1.4 3.3 1.5v2.3c-1.8-.05-3.6-.7-5-1.9v7.7c0 3.4-2.7 6.1-6.1 6.1S4.2 17.7 4.2 14.3c0-3.2 2.4-5.8 5.5-6.1.3 0 .6 0 .9.02v2.43c-.3-.05-.6-.07-.9-.05-1.8.12-3.2 1.65-3.2 3.45 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5V2Z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer className="border-t border-blue-500/10 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-blue-200/80">© {new Date().getFullYear()} Ivan Noskovič</p>
        <div className="flex items-center gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              className="text-blue-200/90 hover:text-white transition-colors"
            >
              {l.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
