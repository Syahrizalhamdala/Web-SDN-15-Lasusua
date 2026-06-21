import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaSearch } from 'react-icons/fa'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Halaman Tidak Ditemukan | SD Negeri 15 Lasusua'
  }, [])

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up">
          <div className="text-9xl font-bold text-primary/20 mb-4">404</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
            >
              <FaHome />
              Kembali ke Beranda
            </Link>
            <Link
              to="/berita"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-primary hover:text-primary transition-colors"
            >
              <FaSearch />
              Cari Informasi
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
