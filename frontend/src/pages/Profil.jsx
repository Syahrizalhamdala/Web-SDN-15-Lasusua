import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import AOS from 'aos'
import {
  FaSchool,
  FaBookOpen,
  FaAward,
  FaBuilding,
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaLaptop,
  FaChurch,
  FaFutbol,
  FaCheckCircle,
} from 'react-icons/fa'

const tabs = [
  { id: 'identitas', label: 'Identitas', icon: FaSchool },
  { id: 'visi-misi', label: 'Visi & Misi', icon: FaBookOpen },
  { id: 'akreditasi', label: 'Akreditasi', icon: FaAward },
  { id: 'sarpras', label: 'Sarana & Prasarana', icon: FaBuilding },
]

const dataSekolah = [
  { label: 'Nama Sekolah', value: 'SD Negeri 15 Lasusua' },
  { label: 'NPSN', value: '69969509' },
  { label: 'Status', value: 'NEGERI' },
  { label: 'Alamat', value: 'Jln. Totallang' },
  { label: 'Desa/Kelurahan', value: 'TOTALLANG' },
  { label: 'Kecamatan', value: 'KEC. LASUSUA' },
  { label: 'Kabupaten', value: 'KAB. KOLAKA UTARA' },
  { label: 'Provinsi', value: 'PROV. SULAWESI TENGGARA' },
]

const visi = 'Terwujudnya generasi yang beriman dan bertaqwa, berprestasi, berbudaya dan berwawasan lingkungan.'
const misi = [
  'Beriman dan bertakwa: warga sekolah memiliki landasan spiritual yang kuat, taat beribadah, dan berakhlak mulia.',
  'Berprestasi: unggul dalam bidang akademik maupun non-akademik melalui proses pembelajaran yang berkualitas.',
  'Berbudaya: menjunjung tinggi kearifan lokal, tata krama, kedisiplinan, dan rasa nasionalisme.',
  'Mewujudkan lingkungan sekolah yang asri dan lestari.',
]

const akreditasi = {
  nilai: 'B',
  predikat: 'Baik',
  noSk: '123/BAN-SM/SK/2025',
  tahun: '2025',
}

const sarpras = [
  { icon: FaSchool, label: 'Ruang Kelas', jumlah: '6 Ruang', desc: 'Ruang belajar yang nyaman dan representatif' },
  { icon: FaChalkboardTeacher, label: 'Ruang Guru', jumlah: '1 Ruang', desc: 'Ruang kerja tenaga pendidik' },
  { icon: FaBook, label: 'Perpustakaan', jumlah: '1 Ruang', desc: 'Koleksi buku pelajaran dan bacaan' },
  { icon: FaLaptop, label: 'Lab. Komputer', jumlah: '1 Ruang', desc: 'Laboratorium komputer dengan 15 unit PC' },
  { icon: FaChurch, label: 'Musholla', jumlah: '1 Unit', desc: 'Tempat ibadah untuk siswa dan guru' },
  { icon: FaFutbol, label: 'Lapangan', jumlah: '1 Unit', desc: 'Lapangan serbaguna untuk olahraga dan upacara' },
  { icon: FaUsers, label: 'UKS', jumlah: '1 Ruang', desc: 'Ruang kesehatan dan pertolongan pertama' },
  { icon: FaBuilding, label: 'Kantin', jumlah: '1 Unit', desc: 'Kantin bersih dan sehat untuk siswa' },
]

export default function Profil() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('identitas')

  useEffect(() => {
    document.title = 'Profil | SD Negeri 15 Lasusua'
    const hash = location.hash.replace('#', '')
    if (hash && tabs.some((t) => t.id === hash)) setActiveTab(hash)
  }, [location.hash])

  useEffect(() => {
    AOS.refresh()
  }, [activeTab])

  return (
    <>
      <PageHeader
        title="Profil Sekolah"
        subtitle="Informasi lengkap tentang SD Negeri 15 Lasusua"
        variant="profil"
        breadcrumbs={[{ label: 'Profil' }]}
      />
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-soft border border-gray-100'
              }`}
            >
              <tab.icon className={activeTab === tab.id ? '' : 'text-primary'} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="min-h-[300px]">
          {activeTab === 'identitas' && (
            <div data-aos="fade-up" className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100">
                <div className="px-6 py-4 bg-gradient-to-r from-primary to-primary-dark">
                  <h3 className="font-bold text-white font-display">Identitas Sekolah</h3>
                </div>
                <table className="w-full">
                  <tbody>
                    {dataSekolah.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                        <td className="px-6 py-4 font-semibold text-gray-700 w-1/3">{item.label}</td>
                        <td className="px-6 py-4 text-gray-600">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'visi-misi' && (
            <div data-aos="fade-up" className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-10 text-white mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-12 -mb-12" />
                <div className="relative">
                  <span className="inline-block px-3 py-1 bg-white/15 rounded-full text-xs font-medium mb-4">Visi</span>
                  <p className="text-white/90 leading-relaxed text-lg italic font-light">
                    &ldquo;{visi}&rdquo;
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-soft p-8 md:p-10 border border-gray-100">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-6">Misi</span>
                <ol className="space-y-4">
                  {misi.map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">
                        {index + 1}
                      </span>
                      <span className="text-gray-600 pt-1 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'akreditasi' && (
            <div data-aos="fade-up" data-aos-duration="600" className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FaAward className="text-4xl text-white" />
                </div>
                <div className="text-7xl font-bold font-display text-primary mb-2">{akreditasi.nilai}</div>
                <p className="text-2xl font-semibold text-gray-700 mb-2">{akreditasi.predikat}</p>
                <p className="text-gray-400 mb-8">Berdasarkan SK BAN-SM No. {akreditasi.noSk}</p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-full font-semibold text-sm border border-green-200">
                  <FaCheckCircle />
                  Berlaku hingga {akreditasi.tahun}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sarpras' && (
            <div data-aos="fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sarpras.map((item, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl shadow-soft p-6 hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 border border-gray-100/50"
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:scale-110 transition-all duration-500">
                      <item.icon className="text-xl text-primary group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1 font-display">{item.label}</h3>
                    <p className="text-primary font-semibold text-sm mb-2">{item.jumlah}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  )
}
