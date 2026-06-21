import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'

const kontakData = [
  { icon: FaMapMarkerAlt, label: 'Alamat', value: 'Lasusua, Kab. Kolaka Utara, Sulawesi Tenggara', delay: 0 },
  { icon: FaPhone, label: 'Telepon', value: '(0404) 1234567', delay: 100 },
  { icon: FaEnvelope, label: 'Email', value: 'sd15lasusua@sch.id', delay: 200 },
  { icon: FaClock, label: 'Jam Kerja', value: 'Senin - Jumat, 07.00 - 14.00 WITA', delay: 300 },
]

export default function InfoKontak() {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-display">
            Informasi Kontak
          </h2>
          <span className="inline-block w-16 h-1 bg-white/30 rounded-full mb-4" />
          <p className="text-white/70 max-w-2xl mx-auto font-light">
            Hubungi kami untuk informasi lebih lanjut
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kontakData.map((item, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-6 text-center text-white hover:bg-white/20 transition-all duration-500 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={item.delay}
            >
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <item.icon className="text-2xl text-accent" />
              </div>
              <h3 className="font-bold mb-2 font-display">{item.label}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
