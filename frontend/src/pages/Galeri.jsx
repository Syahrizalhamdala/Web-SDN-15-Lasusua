import { useState, useEffect } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import AOS from 'aos'
import PageHeader from '../components/ui/PageHeader'
import { api } from '../api'

const videoList = [
  { id: 1, judul: 'Video Profil SD Negeri 15 Lasusua', embed: 'https://www.youtube.com/embed/DrjBA7CSyck' },
  { id: 2, judul: 'Video Kegiatan Sekolah', embed: 'https://www.youtube.com/embed/Foa0luRxfb8' },
  { id: 3, judul: 'Video Kegiatan Sekolah', embed: 'https://www.youtube.com/embed/vJU5z1s2rcM' },
  { id: 4, judul: 'Video Kegiatan Sekolah', embed: 'https://www.youtube.com/embed/SwVI7l2SrFc' },
  { id: 5, judul: 'Video Kegiatan Sekolah', embed: 'https://www.youtube.com/embed/vJU5z1s2rcM' },
  { id: 6, judul: 'Video Kegiatan Sekolah', embed: 'https://www.youtube.com/embed/pzue1rIi_tk' },
]

function Lightbox({ foto, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
      >
        <FaTimes size={24} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
      >
        <FaChevronLeft size={32} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
      >
        <FaChevronRight size={32} />
      </button>
      <img
        src={foto.src}
        alt={foto.judul}
        loading="lazy"
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="absolute bottom-4 text-white text-sm font-medium">{foto.judul}</p>
    </div>
  )
}

export default function Galeri() {
  const [activeTab, setActiveTab] = useState('foto')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [fotoList, setFotoList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Galeri | SD Negeri 15 Lasusua'
    fetch(api('/api/public/photos'))
      .then((res) => res.json())
      .then((json) => {
        setFotoList(json ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [activeTab])

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev === 0 ? fotoList.length - 1 : prev - 1))
  }

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev === fotoList.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevLightbox()
      if (e.key === 'ArrowRight') nextLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex])

  return (
    <>
      <PageHeader
        title="Galeri"
        subtitle="Dokumentasi kegiatan dan momen-momen berharga di SD Negeri 15 Lasusua"
        variant="galeri"
        breadcrumbs={[{ label: 'Galeri' }]}
      />
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab('foto')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'foto'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-soft border border-gray-100'
            }`}
          >
            Foto
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'video'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-soft border border-gray-100'
            }`}
          >
            Video
          </button>
        </div>

        {activeTab === 'foto' && (
          loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="w-full h-48 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : fotoList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {fotoList.map((foto, index) => (
                <div
                  key={foto.id}
                  className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md"
                  onClick={() => openLightbox(index)}
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 50}
                >
                  <img
                    src={foto.src}
                    alt={foto.judul}
                    loading="lazy"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {foto.judul}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg font-medium">Belum ada foto</p>
            </div>
          )
        )}

        {activeTab === 'video' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoList.map((video) => (
              <div key={video.id} className="rounded-xl overflow-hidden shadow-md" data-aos="fade-up">
                <div className="relative aspect-video bg-gray-200">
                  <iframe
                    width="100%"
                    height="100%"
                    src={video.embed}
                    title={video.judul}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-3 bg-white">
                  <p className="font-medium text-gray-800 text-sm">{video.judul}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && fotoList[lightboxIndex] && (
        <Lightbox
          foto={fotoList[lightboxIndex]}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </section>
    </>
  )
}
