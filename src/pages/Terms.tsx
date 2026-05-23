import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Scroll, Shield, FileText, CheckCircle2, RefreshCw } from "lucide-react";

export function Terms() {
  const sections = [
    {
      title: "1. Penerimaan Ketentuan Layanan",
      content: "Dengan mendaftar, mengakses, atau menggunakan platform Antriin (termasuk dashboard admin, halaman masuk pelanggan, dan sistem tiket online), Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui seluruh isi Syarat & Ketentuan ini secara mutlak serta tunduk pada hukum yang berlaku di Republik Indonesia."
    },
    {
      title: "2. Akun Pengguna & Keamanan Data Sesi",
      content: "Pemilik usaha (merchant) bertanggung jawab penuh atas kerahasiaan informasi akun pendaftaran (alamat email & kata sandi) mereka. Untuk para pelanggan yang menggunakan sistem tanpa akun email, identitas nama yang dimasukkan saat mengambil nomor antrean hanya disimpan dalam bentuk memori sesi sementara demi kelancaran operasional harian loket."
    },
    {
      title: "3. Ketentuan Pengambilan Tiket & Antrean",
      content: "Setiap nomor antrean yang dihasilkan bersifat unik dan berlaku sesuai dengan antrean harian toko mitra terkait. Pihak operator merchant berhak sepenuhnya untuk memodifikasi status antrean, menolak panggilan, melakukan reset harian, atau melewatkan nomor pelanggan apabila pelanggan terbukti tidak hadir di lokasi saat dipanggil."
    },
    {
      title: "4. Penggunaan yang Diperbolehkan & Batasan",
      content: "Anda dilarang keras mencoba mengeksploitasi celah keamanan web Antriin, melakukan injeksi skrip berbahaya pada formulir input, membanjiri server dengan permintaan palsu (DDOS), atau menduplikasi sistem manajemen antrean secara ilegal tanpa persetujuan tertulis dari pihak pengembang."
    },
    {
      title: "5. Kebijakan Harga & Masa Layanan",
      content: "Paket gratis tetap bebas diakses selamanya dengan fitur dasar sesuai kapasitas harian. Untuk paket berlangganan berbayar bulanan, dana diproses sesuai metode pembayaran yang dipilih secara berkala. Seluruh bentuk pembatalan paket dapat diajukan secara instan di menu manajemen akun merchant."
    }
  ];

  return (
    <div className="py-24 bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] bg-brand-600/10 border border-brand-600/15 text-brand-600 font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full inline-block">
            Legalitas & Aturan Beroperasi
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Syarat & <span className="text-brand-600">Ketentuan</span>
          </h1>
          <p className="text-slate-505 text-sm md:text-base leading-relaxed text-slate-500 max-w-lg mx-auto font-medium">
            Aturan main pengaksesan sistem, privasi pelanggan, keselamatan data, dan komitmen layanan kami bagi UMKM mitra.
          </p>
        </div>

        {/* Content Editorial Grid */}
        <div className="space-y-8 mb-16">
          <div className="p-6 md:p-8 bg-blue-50/50 border border-blue-100 rounded-[2.5rem] flex gap-5 items-start">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 shadow-inner">
              <Shield className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">Pembaharuan Terakhir: 1 Maret 2026</h4>
              <p className="text-xs text-blue-700 font-semibold leading-relaxed">
                Persyaratan di bawah ini dapat mengalami pembaruan berkala guna menyesuaikan kebutuhan infrastruktur komputasi awan kami. Pelanggan disarankan meninjau ulang halaman ini secara mandiri.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[3.5rem] p-8 md:p-14 shadow-3xl shadow-slate-100 space-y-10">
            <div className="flex gap-3 items-center border-b border-slate-100 pb-6">
              <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Perjanjian Lisensi Hak Akses Pengguna</h3>
            </div>

            <div className="space-y-8">
              {sections.map((sect, index) => (
                <div key={index} className="space-y-3 group">
                  <h4 className="font-display text-sm md:text-md font-bold text-slate-900 uppercase group-hover:text-brand-600 transition-colors">
                    {sect.title}
                  </h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-semibold">
                    {sect.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-8 flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">Antriin Berlisensi Resmi di Bawah Pengawasan Tim Pengembang</span>
            </div>
          </div>
        </div>

        {/* Footer info link */}
        <div className="text-center">
          <p className="text-xs text-slate-400 font-semibold">
            Apabila Anda memiliki pertanyaan kritis mengenai Syarat-Ketentuan atau Kebijakan Privasi di atas, mohon buka <Link to="/contact" className="text-brand-600 hover:underline font-bold">Laman Hubungi Kami</Link>.
          </p>
        </div>

      </div>
    </div>
  );
}
