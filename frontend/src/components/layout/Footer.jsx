import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="absolute inset-0 bg-dots opacity-[0.03]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg">
                <img src="/logo.png" alt="SD Negeri 15 Lasusua" loading="lazy" className="w-8 h-8 object-cover rounded-lg" />
              </div>
              <h3 className="font-bold text-lg font-display">SD Negeri 15 Lasusua</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Beriman, Berprestasi, Berkarakter, dan Berbudaya. Mencetak generasi penerus bangsa yang unggul dan berakhlak mulia.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 font-display text-white">Navigasi</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Beranda', to: '/' },
                { label: 'Profil Sekolah', to: '/profil' },
                { label: 'Berita', to: '/berita' },
                { label: 'Galeri', to: '/galeri' },
                { label: 'Unduhan', to: '/unduhan' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 font-display text-white">Direktori</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Guru & Tenaga Kependidikan', to: '/guru-tendik' },
                { label: 'Hubungi Kami', to: '/hubungi-kami' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 font-display text-white">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-primary-light" />
                <span>Lasusua, Kabupaten Kolaka Utara, Sulawesi Tenggara</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FaPhone className="flex-shrink-0 text-primary-light" />
                <span>(0404) 1234567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FaEnvelope className="flex-shrink-0 text-primary-light" />
                <span>sd15lasusua@sch.id</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FaClock className="flex-shrink-0 text-primary-light" />
                <span>Senin - Jumat: 07.00 - 14.00 WITA</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SD Negeri 15 Lasusua. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
