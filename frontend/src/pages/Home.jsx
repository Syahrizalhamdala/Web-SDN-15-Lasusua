import { useEffect } from 'react'
import HeroSlider from '../components/home/HeroSlider'
import StatistikCounter from '../components/home/StatistikCounter'
import SambutanKepsek from '../components/home/SambutanKepsek'
import BeritaTerbaru from '../components/home/BeritaTerbaru'
import VideoProfil from '../components/home/VideoProfil'
import AksesCepat from '../components/home/AksesCepat'
import InfoKontak from '../components/home/InfoKontak'

export default function Home() {
  useEffect(() => {
    document.title = 'Beranda | SD Negeri 15 Lasusua'
  }, [])

  return (
    <>
      <HeroSlider />
      <StatistikCounter />
      <SambutanKepsek />
      <BeritaTerbaru />
      <VideoProfil />
      <AksesCepat />
      <InfoKontak />
    </>
  )
}
