import { useState, useEffect, useMemo } from 'react'
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import KartuBerita from '../components/ui/KartuBerita'
import PageHeader from '../components/ui/PageHeader'

const kategoriFilter = ['Semua', 'Berita', 'Informasi', 'Pengumuman']
const ITEMS_PER_PAGE = 6

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100/50 animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 bg-gray-200 rounded" />
        <div className="h-5 w-full bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

export default function Berita() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState('Semua')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    document.title = 'Berita | SD Negeri 15 Lasusua'
    fetch('/api/public/posts')
      .then((res) => res.json())
      .then((json) => {
        setData(json.data ?? json ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.judul.toLowerCase().includes(search.toLowerCase()) ||
        item.ringkasan.toLowerCase().includes(search.toLowerCase())
      const matchKategori = kategori === 'Semua' || item.kategori === kategori
      return matchSearch && matchKategori
    })
  }, [search, kategori, data])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [search, kategori])

  return (
    <>
      <PageHeader
        title="Berita & Informasi"
        subtitle="Informasi terkini seputar kegiatan dan pengumuman SD Negeri 15 Lasusua"
        variant="berita"
        breadcrumbs={[{ label: 'Berita' }]}
      />
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-10" data-aos="fade-up">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all bg-white shadow-soft"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {kategoriFilter.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setKategori(item)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  kategori === item
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-soft border border-gray-100'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : paginated.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {paginated.map((item) => (
                <KartuBerita key={item.id} berita={item} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-soft border border-gray-100"
                >
                  <FaChevronLeft className="text-xs" />
                  Sebelumnya
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'bg-white text-gray-600 hover:bg-gray-50 shadow-soft border border-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-soft border border-gray-100"
                >
                  Selanjutnya
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-gray-400 text-xl" />
            </div>
            <p className="text-gray-500 text-lg font-medium">Berita tidak ditemukan</p>
            <p className="text-gray-400 text-sm mt-1">Coba gunakan kata kunci atau filter yang berbeda</p>
          </div>
        )}
      </div>
    </section>
    </>
  )
}
