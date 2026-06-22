import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaMedal } from 'react-icons/fa'
import useCounterAnimation from '../../hooks/useCounterAnimation'

function StatItem({ icon: Icon, target, label, suffix }) {
  const { count, ref } = useCounterAnimation(target)

  return (
    <div
      ref={ref}
      className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-soft p-6 md:p-8 text-center hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 border border-white/50"
      data-aos="fade-up"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
        <Icon className="text-2xl text-white" />
      </div>
      <div className="text-3xl md:text-4xl font-bold font-display text-primary mb-2">
        {count}
        {suffix}
      </div>
      <p className="text-gray-500 font-medium">{label}</p>
    </div>
  )
}

export default function StatistikCounter() {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-display">
            Statistik Sekolah
          </h2>
          <span className="inline-block w-16 h-1 bg-white/40 rounded-full mb-4" />
          <p className="text-white/80 max-w-2xl mx-auto font-light">
            Capaian dan data terkini SD Negeri 15 Lasusua
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatItem icon={FaUserGraduate} target={125} label="Siswa Aktif" suffix="+" />
          <StatItem icon={FaChalkboardTeacher} target={11} label="Guru & Tendik" suffix="" />
          <StatItem icon={FaUsers} target={139} label="Alumni" suffix="+" />
          <StatItem icon={FaMedal} target={1} label="Akreditasi" suffix="+ (B)" />
        </div>
      </div>
    </section>
  )
}
