const statusWarna = {
  PNS: 'bg-blue-100 text-blue-800',
  PPPK: 'bg-green-100 text-green-800',
  Honorer: 'bg-yellow-100 text-yellow-800',
}

export default function KartuGuru({ guru }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
      data-aos="fade-up"
    >
      <div className="p-6">
        <img
          src={guru.foto}
          alt={guru.nama}
          loading="lazy"
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-primary/10"
        />
        <h3 className="font-bold text-lg text-gray-800">{guru.nama}</h3>
        <p className="text-primary font-semibold text-sm mt-1">{guru.jabatan}</p>
        {guru.mapel !== '-' && (
          <p className="text-gray-500 text-sm mt-1">{guru.mapel}</p>
        )}
        {guru.status && (
          <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${statusWarna[guru.status] || 'bg-gray-100 text-gray-800'}`}>
            {guru.status}
          </span>
        )}
        {guru.nip && (
          <p className="text-gray-400 text-xs mt-2">NIP. {guru.nip}</p>
        )}
      </div>
    </div>
  )
}
