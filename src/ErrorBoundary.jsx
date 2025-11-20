import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('App crashed:', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: 24, color: '#fff', background: '#0b1220', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif'}}>
          <h1 style={{fontSize: 22, fontWeight: 800, marginBottom: 8}}>Nastala chyba pri načítaní stránky</h1>
          <p style={{opacity: .8, marginBottom: 12}}>Prosím obnovte stránku. Ak problém pretrváva, pošlite nám screenshot z konzoly prehliadača.</p>
          <pre style={{whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,0.06)', padding: 12, borderRadius: 12, border: '1px solid rgba(147,197,253,0.2)'}}>{String(this.state.error)}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
