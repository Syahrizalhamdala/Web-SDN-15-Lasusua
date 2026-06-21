import { Link } from 'react-router-dom'
import BadgeKategori from './BadgeKategori'

export default function KartuBerita({ berita }) {
  return (
    <Link
      to={`/berita/${berita.slug}`}
      className="group bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 border border-gray-100/50"
      data-aos="fade-up"
    >
      <div className="relative overflow-hidden">
        <img
          src={berita.thumbnail}
          alt={berita.judul}
          loading="lazy"
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 left-3">
          <BadgeKategori kategori={berita.kategori} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <span>{berita.tanggal}</span>
        </div>
        <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors line-clamp-2 mb-2 font-display">
          {berita.judul}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{berita.ringkasan}</p>
        <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
          Baca selengkapnya
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
