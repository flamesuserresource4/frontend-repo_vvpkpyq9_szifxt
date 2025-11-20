import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import About from './pages/About'
import VideosPage from './pages/VideosPage'
import ReformsPage from './pages/ReformsPage'
import ContactPage from './pages/ContactPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/o-mne" element={<About />} />
        <Route path="/videa" element={<VideosPage />} />
        <Route path="/reformy" element={<ReformsPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
