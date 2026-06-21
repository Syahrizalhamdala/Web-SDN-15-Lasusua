import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { Link } from 'react-router-dom'

const slides = [
  {
    title: 'SD Negeri 15 Lasusua',
    subtitle: 'Beriman, Berprestasi, Berkarakter, dan Berbudaya',
    cta1: { text: 'Profil Sekolah', link: '/profil' },
    cta2: { text: 'Hubungi Kami', link: '/hubungi-kami' },
    bgImage: '/slide1.jpg',
  },
  {
    title: 'Pendidikan Berkualitas',
    subtitle: 'Mencetak generasi penerus bangsa yang unggul dan berakhlak mulia',
    cta1: { text: 'Lihat Berita', link: '/berita' },
    cta2: { text: 'Galeri Foto', link: '/galeri' },
    bgImage: '/slide2.jpg',
  },
  {
    title: 'Belajar, Berkarya, Berprestasi',
    subtitle: 'Dengan semangat gotong royong mewujudkan siswa yang cerdas dan berkarakter',
    cta1: { text: 'Guru & Tendik', link: '/guru-tendik' },
    cta2: { text: 'Kontak Kami', link: '/hubungi-kami' },
    bgImage: '/slide3.jpg',
  },
  {
    title: 'Selamat Datang di Website Resmi',
    subtitle: 'SD Negeri 15 Lasusua - Informasi terbaru seputar kegiatan sekolah',
    cta1: { text: 'Unduhan', link: '/unduhan' },
    cta2: { text: 'Kontak Kami', link: '/hubungi-kami' },
    bgImage: '/slide4.jpg',
  },
]

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className="w-full h-[400px] md:h-[600px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-full flex items-center justify-center relative">
            {slide.bgImage && (
              <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />
            <div className="absolute inset-0 bg-dots" />
            <div className="relative text-center text-white px-4 max-w-4xl mx-auto z-10" data-aos="fade-up">
              <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
                SD Negeri 15 Lasusua
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display mb-4 leading-tight text-balance">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto font-light">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={slide.cta1.link}
                  className="px-8 py-3 bg-white text-primary font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {slide.cta1.text}
                </Link>
                <Link
                  to={slide.cta2.link}
                  className="px-8 py-3 border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white hover:text-primary hover:border-white transition-all duration-300"
                >
                  {slide.cta2.text}
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
