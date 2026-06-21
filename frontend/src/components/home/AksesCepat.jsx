import { Link } from 'react-router-dom'
import { FaUserTie, FaDownload, FaMapMarkerAlt } from 'react-icons/fa'

const items = [
  {
    icon: FaUserTie,
    label: 'Guru & Tendik',
    desc: 'Data tenaga pendidik dan kependidikan',
    link: '/guru-tendik',
    gradient: 'from-blue-500 to-cyan-500',
    iconBg: 'from-blue-400 to-cyan-400',
  },
  {
    icon: FaDownload,
    label: 'Unduhan',
    desc: 'Dokumen dan formulir sekolah',
    link: '/unduhan',
    gradient: 'from-orange-500 to-amber-500',
    iconBg: 'from-orange-400 to-amber-400',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Hubungi Kami',
    desc: 'Alamat dan kontak sekolah',
    link: '/hubungi-kami',
    gradient: 'from-emerald-500 to-teal-500',
    iconBg: 'from-emerald-400 to-teal-400',
  },
]

export default function AksesCepat() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 font-display section-title pb-4">
            Akses Cepat
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4">
            Menu akses cepat untuk memudahkan Anda menemukan informasi yang dibutuhkan
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group relative bg-white rounded-2xl shadow-soft p-6 overflow-hidden hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-bl-full -m-8 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${item.iconBg} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`}
                >
                  <item.icon className="text-xl text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1 font-display">{item.label}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
                <div className={`mt-4 h-1 w-0 bg-gradient-to-r ${item.gradient} rounded-full group-hover:w-full transition-all duration-500`} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
