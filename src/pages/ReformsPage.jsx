import Layout from '../components/Layout'
import Reforms from '../components/Reforms'

export default function ReformsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Program a reformy</h1>
        <Reforms />
      </div>
    </Layout>
  )
}
