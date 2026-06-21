import { useState, useEffect, useMemo } from 'react'
import KartuGuru from '../components/ui/KartuGuru'
import PageHeader from '../components/ui/PageHeader'
import { api } from '../api'

const filterJabatan = ['Semua', 'Kepala Sekolah', 'Guru', 'Admin Sekolah', 'Operator Sekolah']

export default function GuruTendik() {
  const [filter, setFilter] = useState('Semua')
  const [guru, setGuru] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Guru & Tenaga Kependidikan | SD Negeri 15 Lasusua'
    fetch(api('/api/public/guru'))
      .then((res) => res.json())
      .then((json) => {
        setGuru(json ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filteredGuru = useMemo(() => {
    if (filter === 'Semua') return guru
    return guru.filter((g) => g.jabatan === filter)
  }, [filter, guru])

  return (
    <>
      <PageHeader
        title="Guru & Tenaga Kependidikan"
        subtitle="Tenaga pendidik dan kependidikan SD Negeri 15 Lasusua yang profesional dan berdedikasi"
        variant="guru"
        breadcrumbs={[{ label: 'Direktori' }, { label: 'Guru & Tendik' }]}
      />
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterJabatan.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === item
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-soft border border-gray-100'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 text-center">
                    <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4" />
                    <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredGuru.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGuru.map((g) => (
              <KartuGuru key={g.id} guru={g} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg font-medium">Tidak ada data guru dengan filter tersebut</p>
          </div>
        )}
      </div>
    </section>
    </>
  )
}
