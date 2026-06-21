import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import KartuBerita from '../ui/KartuBerita'

export default function BeritaTerbaru() {
  const [beritaTerbaru, setBeritaTerbaru] = useState([])

  useEffect(() => {
    fetch('/api/public/posts')
      .then((res) => res.json())
      .then((json) => {
        const list = json.data ?? json ?? []
        setBeritaTerbaru(list.slice(0, 3))
      })
      .catch(() => {})
  }, [])

  if (beritaTerbaru.length === 0) return null

  return (
    <section className="relative py-16 md:py-20 bg-gray-50/80">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12" data-aos="fade-up">
          <div>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
              Berita Terbaru
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 font-display">
              Berita & Informasi
            </h2>
            <p className="text-gray-500 max-w-2xl">
              Informasi terkini seputar kegiatan dan prestasi SD Negeri 15 Lasusua
            </p>
          </div>
          <Link
            to="/berita"
            className="btn-outline mt-4 md:mt-0"
          >
            Lihat Semua Berita
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beritaTerbaru.map((item) => (
            <KartuBerita key={item.id} berita={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
