export default function VideoProfil() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 font-display section-title pb-4">
            Video Profil Sekolah
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4">
            Tonton video profil SD Negeri 15 Lasusua untuk mengenal lebih dekat lingkungan dan
            kegiatan sekolah kami
          </p>
        </div>
        <div className="max-w-4xl mx-auto" data-aos="zoom-in">
          <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-16 h-16 bg-primary/10 rounded-full" />
            </div>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/nwzqJXl2HYk"
              title="Video Profil SD Negeri 15 Lasusua"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full z-10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
