import { Link } from 'react-router-dom'
import { FaQuoteLeft } from 'react-icons/fa'

export default function SambutanKepsek() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative" data-aos="fade-right">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
            <img
              src="/kepsek.jpeg"
              alt="Kepala SD Negeri 15 Lasusua"
              loading="lazy"
              className="w-full max-w-md mx-auto rounded-3xl shadow-xl border-4 border-white"
            />
          </div>
          <div data-aos="fade-left">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4">
              Sambutan
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-display">
              Kepala Sekolah
            </h2>
            <p className="text-primary font-semibold mb-6">Ainul, S.Pd.</p>
            <FaQuoteLeft className="text-2xl text-primary/20 mb-4" />
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Assalamu&apos;alaikum Warahmatullahi Wabarakatuh,
              </p>
              <p>
                Puji syukur kehadirat Allah SWT, Tuhan Yang Maha Esa, atas berkat dan rahmat-Nya
                kita dapat terus berkarya dalam dunia pendidikan. Selamat datang di website resmi
                SD Negeri 15 Lasusua.
              </p>
              <p>
                Website ini hadir sebagai sarana informasi dan komunikasi antara sekolah dengan
                siswa, orang tua, alumni, dan masyarakat luas. Melalui website ini, kami berharap
                seluruh informasi tentang kegiatan, prestasi, dan perkembangan sekolah dapat
                diakses dengan mudah dan transparan.
              </p>
              <p>
                SD Negeri 15 Lasusua berkomitmen untuk memberikan pendidikan terbaik bagi
                generasi penerus bangsa. Dengan motto &ldquo;Beriman, Berprestasi, Berkarakter,
                dan Berbudaya&rdquo;, kami berupaya mencetak siswa yang tidak hanya cerdas
                secara akademik, tetapi juga memiliki akhlak mulia dan karakter yang kuat.
              </p>
            </div>
            <Link
              to="/profil"
              className="btn-primary mt-6"
            >
              Profil Lengkap
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
