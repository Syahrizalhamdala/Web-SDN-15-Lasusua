import { useState, useEffect, useMemo } from 'react'
import { FaDownload, FaSearch } from 'react-icons/fa'
import PageHeader from '../components/ui/PageHeader'
import { api } from '../api'
import downloadsData from '../data/downloads.json'

export default function Unduhan() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [networkError, setNetworkError] = useState(false)
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState('Semua')

  useEffect(() => {
    document.title = 'Unduhan | SD Negeri 15 Lasusua'
    fetch(api('/api/public/downloads'))
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat data')
        return res.json()
      })
      .then((json) => {
        setData(json ?? [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Unduhan fetch error:', err)
        setData(downloadsData ?? [])
        setLoading(false)
      })
  }, [])

  const kategoriList = useMemo(() => {
    const cats = [...new Set(data.map((item) => item.kategori))]
    return ['Semua', ...cats]
  }, [data])

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase())
      const matchKategori = kategori === 'Semua' || item.kategori === kategori
      return matchSearch && matchKategori
    })
  }, [search, kategori, data])

  return (
    <>
      <PageHeader
        title="Unduhan"
        subtitle="Dokumen dan formulir yang dapat diunduh oleh siswa, orang tua, dan masyarakat"
        variant="unduhan"
        breadcrumbs={[{ label: 'Unduhan' }]}
      />
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari dokumen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all bg-white shadow-soft"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {kategoriList.map((item) => (
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
          <div className="animate-pulse space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-xl" />
            ))}
          </div>
        ) : networkError ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg font-medium">Gagal memuat data</p>
            <p className="text-gray-400 text-sm mt-1">Pastikan server backend berjalan di port 8000</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">No</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Nama Dokumen</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Kategori</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Ukuran</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tanggal</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.nama}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.ukuran}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.tanggal}</td>
                      <td className="px-6 py-4 text-center">
                        {item.url ? (
                          <a
                            href={item.url}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                          >
                            <FaDownload />
                            Unduh
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed">
                            <FaDownload />
                            Segera
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg font-medium">Dokumen tidak ditemukan</p>
          </div>
        )}
      </div>
    </section>
    </>
  )
}
