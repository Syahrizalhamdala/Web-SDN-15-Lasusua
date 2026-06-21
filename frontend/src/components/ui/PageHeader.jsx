import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const gradients = {
  default: 'from-primary via-primary-dark to-primary-dark',
  berita: 'from-blue-600 via-blue-700 to-indigo-800',
  galeri: 'from-purple-600 via-purple-700 to-pink-800',
  unduhan: 'from-emerald-600 via-emerald-700 to-teal-800',
  guru: 'from-cyan-600 via-cyan-700 to-blue-800',
  siswa: 'from-orange-500 via-orange-600 to-red-700',
  kontak: 'from-primary-dark via-primary to-primary-light',
  profil: 'from-primary via-primary-dark to-blue-900',
}

export default function PageHeader({ title, subtitle, variant = 'default', breadcrumbs }) {
  const gradient = gradients[variant] || gradients.default

  return (
    <section className={`relative bg-gradient-to-br ${gradient} overflow-hidden`}>
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {breadcrumbs && (
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-4" data-aos="fade-up">
            <Link to="/" className="hover:text-white transition-colors">
              <FaHome />
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-white/30">/</span>
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div data-aos="fade-up" data-aos-delay={breadcrumbs ? 100 : 0}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white mb-3 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/70 max-w-2xl text-lg font-light">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
