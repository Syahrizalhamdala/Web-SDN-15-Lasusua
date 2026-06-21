export default function BadgeKategori({ kategori }) {
  const colors = {
    Berita: 'bg-blue-100 text-blue-800',
    Informasi: 'bg-green-100 text-green-800',
    Pengumuman: 'bg-yellow-100 text-yellow-800'
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colors[kategori] || 'bg-gray-100 text-gray-800'}`}>
      {kategori}
    </span>
  )
}
