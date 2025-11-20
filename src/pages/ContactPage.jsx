import Layout from '../components/Layout'
import ContactChat from '../components/ContactChat'

export default function ContactPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Kontakt a verejný chat</h1>
        <ContactChat />
      </div>
    </Layout>
  )
}
