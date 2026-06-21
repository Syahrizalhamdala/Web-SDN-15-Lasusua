import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import BadgeKategori from '../components/ui/BadgeKategori'
import PageHeader from '../components/ui/PageHeader'
import { api } from '../api'

export default function DetailBerita() {
  const { slug } = useParams()
  const [artikel, setArtikel] = useState(null)
  const [beritaTerkait, setBeritaTerkait] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [detailRes, allRes] = await Promise.all([
          fetch(api(`/api/public/posts/${slug}`)),
          fetch(api('/api/public/posts')),
        ])
        const detail = await detailRes.json()
        const all = await allRes.json()
        const list = all.data ?? all ?? []

        setArtikel(detail)
        setBeritaTerkait(
          list
            .filter((item) => item.slug !== slug && item.kategori === detail.kategori)
            .slice(0, 3)
        )
      } catch (_) {
        /* ignore */
      }
      setLoading(false)
    }
    fetchData()
  }, [slug])

  useEffect(() => {
    document.title = artikel
      ? `${artikel.judul} | SD Negeri 15 Lasusua`
      : 'Berita Tidak Ditemukan | SD Negeri 15 Lasusua'
  }, [artikel])

  if (loading) {
    return (
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-2xl mb-6" />
          <div className="h-8 w-2/3 bg-gray-200 rounded mb-4" />
          <div className="h-4 w-1/4 bg-gray-200 rounded mb-6" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-4/6 bg-gray-200 rounded" />
          </div>
        </div>
      </section>
    )
  }

  if (!artikel) {
    return (
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Berita Tidak Ditemukan</h1>
          <Link
            to="/berita"
            className="text-primary hover:underline font-semibold"
          >
            Kembali ke daftar berita
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <PageHeader
        title={artikel.judul}
        subtitle={artikel.tanggal}
        variant="berita"
        breadcrumbs={[
          { label: 'Berita', to: '/berita' },
          { label: artikel.judul },
        ]}
      />
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
              <img
                  src={artikel.thumbnail}
                  alt={artikel.judul}
                  loading="lazy"
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-md mb-6"
                  data-aos="fade-up"
                />
            <div data-aos="fade-up" data-aos-delay="100">
              <BadgeKategori kategori={artikel.kategori} />
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mt-3 mb-4">
                {artikel.judul}
              </h1>
              <p className="text-gray-500 mb-6">{artikel.tanggal}</p>
              <div className="prose prose-gray max-w-none">
                {artikel.konten.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <aside data-aos="fade-left">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Berita Terkait</h3>
              {beritaTerkait.length > 0 ? (
                <div className="space-y-4">
                  {beritaTerkait.map((item) => (
                    <Link
                      key={item.id}
                      to={`/berita/${item.slug}`}
                      className="flex gap-3 group"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.judul}
                        loading="lazy"
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-medium text-sm text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                          {item.judul}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{item.tanggal}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Tidak ada berita terkait</p>
              )}
              <Link
                to="/berita"
                className="block mt-6 text-center px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                Kembali ke Berita
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
    </>
  )
}
