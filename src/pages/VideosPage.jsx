import Layout from '../components/Layout'
import Videos from '../components/Videos'

export default function VideosPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Moje videá</h1>
        <p className="text-blue-200/80">Tu môžete pridávať nové videá a zdieľať ich na sociálnych sieťach.</p>
        <Videos />
      </div>
    </Layout>
  )
}
