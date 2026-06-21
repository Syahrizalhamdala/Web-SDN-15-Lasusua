import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa'

const menuItems = [
  { label: 'Beranda', path: '/' },
  {
    label: 'Profil',
    path: '/profil',
    children: [
      { label: 'Identitas Sekolah', path: '/profil#identitas' },
      { label: 'Visi & Misi', path: '/profil#visi-misi' },
      { label: 'Akreditasi', path: '/profil#akreditasi' },
      { label: 'Sarana & Prasarana', path: '/profil#sarpras' },
    ],
  },
  { label: 'Berita', path: '/berita' },
  {
    label: 'Direktori',
    path: '#',
    children: [
      { label: 'Guru & Tendik', path: '/guru-tendik' },
    ],
  },
  {
    label: 'Galeri',
    path: '/galeri',
    children: [
      { label: 'Foto', path: '/galeri#foto' },
      { label: 'Video', path: '/galeri#video' },
    ],
  },
  { label: 'Unduhan', path: '/unduhan' },
  { label: 'Hubungi Kami', path: '/hubungi-kami' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  const isActive = useCallback(
    (path) => {
      if (path === '/') return location.pathname === '/'
      return location.pathname.startsWith(path) && path !== '#'
    },
    [location.pathname]
  )

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHome
          ? 'bg-white shadow-sm border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="SD Negeri 15 Lasusua"
              className={`w-10 h-10 rounded-lg object-cover transition-all duration-500 ${
                isScrolled || !isHome ? '' : 'shadow-lg shadow-white/20'
              }`}
            />
            <div>
              <h1 className={`font-bold font-display text-sm md:text-base leading-tight transition-colors duration-500 ${
                isScrolled || !isHome ? 'text-primary' : 'text-white'
              }`}>
                SD Negeri 15 Lasusua
              </h1>
              <p className={`text-[10px] md:text-xs hidden sm:block transition-colors duration-500 ${
                isScrolled || !isHome ? 'text-gray-500' : 'text-white/70'
              }`}>
                Beriman, Berprestasi, Berkarakter, dan Berbudaya
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button
                      onClick={() => handleDropdown(index)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive(item.path)
                          ? isScrolled || !isHome
                            ? 'text-primary bg-primary/5'
                            : 'text-white bg-white/15'
                          : isScrolled || !isHome
                            ? 'text-gray-700 hover:text-primary hover:bg-gray-50'
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                      <FaChevronDown
                        className={`text-xs transition-transform duration-200 ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === index && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100/80 py-2 overflow-hidden">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            to={child.path}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? isScrolled || !isHome
                          ? 'text-primary bg-primary/5'
                          : 'text-white bg-white/15'
                        : isScrolled || !isHome
                          ? 'text-gray-700 hover:text-primary hover:bg-gray-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
              isScrolled || !isHome
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 py-3 space-y-1 shadow-xl">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.children ? (
                <>
                  <button
                    onClick={() => handleDropdown(index)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-primary bg-primary/5'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                    <FaChevronDown
                      className={`text-xs transition-transform duration-200 ${
                        activeDropdown === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {activeDropdown === index && (
                    <div className="pl-4 pb-2 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          to={child.path}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
