import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Profil from './pages/Profil'
import Berita from './pages/Berita'
import DetailBerita from './pages/DetailBerita'
import Galeri from './pages/Galeri'
import GuruTendik from './pages/GuruTendik'
import Unduhan from './pages/Unduhan'
import HubungiKami from './pages/HubungiKami'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100, disable: window.innerWidth < 640 })
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [location.pathname])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:slug" element={<DetailBerita />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/guru-tendik" element={<GuruTendik />} />
        <Route path="/unduhan" element={<Unduhan />} />
        <Route path="/hubungi-kami" element={<HubungiKami />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
