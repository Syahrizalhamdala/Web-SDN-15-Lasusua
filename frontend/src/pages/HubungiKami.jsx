import { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaSpinner } from 'react-icons/fa'
import PageHeader from '../components/ui/PageHeader'

export default function HubungiKami() {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    telepon: '',
    subjek: '',
    pesan: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    document.title = 'Hubungi Kami | SD Negeri 15 Lasusua'
  }, [])

  const validate = () => {
    const errs = {}
    if (!form.nama.trim()) errs.nama = 'Nama harus diisi'
    if (!form.email.trim()) {
      errs.email = 'Email harus diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Format email tidak valid'
    }
    if (!form.telepon.trim()) errs.telepon = 'Telepon harus diisi'
    if (!form.subjek.trim()) errs.subjek = 'Subjek harus diisi'
    if (!form.pesan.trim()) errs.pesan = 'Pesan harus diisi'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/xeoeqvvg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ nama: '', email: '', telepon: '', subjek: '', pesan: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHeader
        title="Hubungi Kami"
        subtitle="Silakan hubungi kami melalui formulir di bawah atau informasi kontak yang tersedia"
        variant="kontak"
        breadcrumbs={[{ label: 'Hubungi Kami' }]}
      />
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div data-aos="fade-right">
            {status === 'success' && (
              <div className="mb-6 px-6 py-4 bg-green-100 border border-green-300 text-green-800 rounded-xl font-medium">
                Pesan Anda telah terkirim. Terima kasih telah menghubungi kami.
              </div>
            )}
            {status === 'error' && (
              <div className="mb-6 px-6 py-4 bg-red-100 border border-red-300 text-red-800 rounded-xl font-medium">
                Gagal mengirim pesan. Silakan coba lagi atau hubungi kami melalui telepon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: 'Nama Lengkap', name: 'nama', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Nomor Telepon', name: 'telepon', type: 'tel' },
                { label: 'Subjek', name: 'subjek', type: 'text' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
                      errors[field.name]
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-gray-200 focus:border-primary'
                    }`}
                  />
                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
                  )}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                <textarea
                  name="pesan"
                  rows={5}
                  maxLength={1000}
                  value={form.pesan}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none ${
                    errors.pesan
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-gray-200 focus:border-primary'
                  }`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.pesan && (
                    <p className="text-sm text-red-500">{errors.pesan}</p>
                  )}
                  <p className="text-xs text-gray-400 ml-auto">{form.pesan.length}/1000</p>
                </div>
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {status === 'sending' ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>

          <div data-aos="fade-left">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-6">
              <h3 className="font-bold text-xl text-gray-800 mb-2">Informasi Kontak</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Alamat</h4>
                    <p className="text-gray-600 text-sm">
                      Lasusua, Kabupaten Kolaka Utara
                      <br />
                      Sulawesi Tenggara
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Telepon</h4>
                    <p className="text-gray-600 text-sm">(0404) 1234567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600 text-sm">sd15lasusua@sch.id</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Jam Kerja</h4>
                    <p className="text-gray-600 text-sm">
                      Senin - Jumat: 07.00 - 14.00 WITA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl overflow-hidden h-64 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15953.882748175939!2d120.684569!3d-3.534565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d0a1c5f5b5b5b5b%3A0x0!2sLasusua%2C%20Kolaka%20Utara%2C%20Sulawesi%20Tenggara!5e0!3m2!1sid!2sid!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi SD Negeri 15 Lasusua"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
