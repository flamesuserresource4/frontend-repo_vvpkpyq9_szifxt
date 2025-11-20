import ContactChat from '../components/ContactChat'

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white">Kontakt a verejný chat</h1>
      <ContactChat />
    </div>
  )
}
