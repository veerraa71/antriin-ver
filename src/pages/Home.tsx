import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Zap, Target, BarChart3, Clock, CheckCircle2, ShieldCheck, Camera, User, Building, Sparkles, Smartphone, ArrowRight, BookOpen, Quote, Sparkle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const features = [
  {
    icon: <Clock className="w-6 h-6 text-brand-600" />,
    title: "Estimasi Real-time",
    description: "Berikan kepastian kepada pelanggan Anda dengan sistem perhitungan waktu tunggu cerdas kami."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-brand-600" />,
    title: "Notifikasi Pintar",
    description: "Beritahu pelanggan secara otomatis saat giliran mereka mendekat melalui SMS atau notifikasi aplikasi."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-brand-600" />,
    title: "Analitik Bisnis",
    description: "Pantau performa harian, jam sibuk, dan kepuasan pelanggan dalam satu dashboard yang kuat."
  }
];

export function Home() {
  const [showcaseTab, setShowcaseTab] = useState<"fitur" | "aktivitas" | "cerita" | "pengalaman" | "layanan">("fitur");

  const showcaseData = {
    fitur: {
      title: "Mesin Antrian Utama & Pemantauan Estimasi Pintar",
      tagline: "Fitur Antrian",
      desc: "Kemudahan penanganan antrian berlebih menggunakan kalkulasi otomatis berbasis waktu tunggu rata-rata. Pelanggan dapat memantau barisan nomor secara presisi langsung dari layar handphone mereka tanpa perlu mengunduh aplikasi tambahan atau daftar akun.",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200",
      stats: "99.2% Akurasi Prediksi",
      highlights: ["Sistem Tiket Otomatis", "Sinkronisasi Live Terpadu", "Antarmuka Responsif & Cepat"]
    },
    aktivitas: {
      title: "Pemantauan Alur Antrian Pelanggan Secara Transparan",
      tagline: "Aktivitas Antrian",
      desc: "Menghadirkan keterbukaan informasi bagi pengantre secara real-time. Seluruh aktivitas loket, nomor yang sedang dipanggil terakhir, perkiraan waktu panggil, dan sisa antrean yang sedang menunggu terpajang jelas dan disinkronkan langsung dari server.",
      image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=1200",
      stats: "Menunggu Rata-rata <10 Menit",
      highlights: ["Visualisasi Tiket Akurat", "Multi-Loket Terkoordinasi", "Dukungan Audio Suara Panggilan"]
    },
    cerita: {
      title: "Melipatgandakan Omset Toko UMKM Melalui Alur yang Nyaman",
      tagline: "Cerita UMKM",
      desc: "Simak kisah inspiratif kedai kopi lokal, butik mode, dan klinik gigi keluarga yang sukses meningkatkan konversi berbelanja karena pelanggan tidak jenuh berdiri mengantre di teras toko yang sempit, melainkan bisa duduk santai.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&q=80&w=1200",
      stats: "Omset Penjualan Tambahan +35%",
      highlights: ["Penjualan Impulsif Meningkat", "Tata Letak Toko Lebih Kafah", "Mereduksi Friksi Layanan"]
    },
    pengalaman: {
      title: "Kembalikan Martabat & Kebahagiaan Menunggu",
      tagline: "Pengalaman Pelanggan",
      desc: "Menunggu di sofa nyaman, minum kopi di kedai sebelah, atau menanti di dalam kendaraan ber-AC menjadi mungkin. Kami menghapus tekanan mental barisan manual dengan pemantauan dinamis berbasis web yang ramah dan menenangkan.",
      image: "https://images.unsplash.com/photo-1556740734-7f9a2b7a0f4d?auto=format&fit=crop&q=80&w=1200",
      stats: "98.4% Skor Kenyamanan",
      highlights: ["Transparansi Posisi Antrean", "Menunggu Bebas Stres & Fleksibel", "Panduan Otomatis Langkah demi Langkah"]
    },
    layanan: {
      title: "Efisiensi Panel Operasional Bisnis bagi Pemilik Usaha",
      tagline: "Layanan Bisnis",
      desc: "Dirancang secara inklusif dan ramah untuk pengguna awam teknologi sekalipun. Dilengkapi tombol panggil nomor baru, lewati giliran, reset status antrian harian, serta monitor data performa layanan bisnis demi evaluasi yang objektif.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      stats: "Reduksi Kerja Agen 94%",
      highlights: ["Tombol Satu Klik Panggil", "Sistem Sesi Mandiri", "Statistik Monitoring Loket"]
    }
  };
  return (
    <div className="overflow-hidden bg-transparent">
      {/* Cinematic Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        {/* Editorial Background Image */}
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=2000" 
            alt="Cinematic Photography" 
            className="w-full h-full object-cover grayscale-[0.4] brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-10 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 fill-brand-400" /> Baru: Asisten AI Terintegrasi
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-[1] mb-10 tracking-tight">
              Manajemen Antrian <br />
              <span className="text-brand-500">Digital</span> <br />
              Jadi Lebih Mudah.
            </h1>
            <p className="text-xl text-slate-300 max-w-xl mb-12 leading-relaxed font-medium">
              Transformasi bisnis Anda dengan platform antrian modern. Pelacakan real-time, bantuan AI, dan pengalaman pelanggan yang mulus untuk UMKM.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link to="/register" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-600 text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-700 transition-all shadow-2xl shadow-brand-600/40 w-full"
                >
                  Mulai Coba Gratis
                </motion.button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto text-white group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-brand-400 transition-colors">
                Uji Coba Demo Langsung <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Element */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-10 right-10 hidden lg:block"
        >
          <div className="glass-dark p-6 rounded-[2rem] border border-white/10 shadow-2xl max-w-[280px]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center">
                <Camera className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bisnis Aktif</p>
                <p className="text-lg font-display font-bold text-white">Studio Capture</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ delay: 1, duration: 2 }}
                  className="h-full bg-brand-500" 
                />
              </div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Tingkat Efisiensi: 94%</p>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-transparent overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-100 rounded-full blur-[120px] opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
            {[
              { label: "Partner Praktis", val: "2.5k+", desc: "Bisnis yang terus berkembang" },
              { label: "Tiket Terbit", val: "1.2M+", desc: "Alur digital terkelola" },
              { label: "Kota Terjangkau", val: "45+", desc: "Kehadiran secara nasional" },
              { label: "Jam Hemat", val: "150rb", desc: "Waktu pelanggan terhemat" }
            ].map((st, i) => (
              <div key={i} className="border-l-2 border-slate-100 pl-8 group hover:border-brand-600 transition-all duration-500">
                <div className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-2 tracking-tighter group-hover:text-brand-600 transition-colors">{st.val}</div>
                <div className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{st.label}</div>
                <div className="text-slate-300 text-[9px] font-medium uppercase tracking-[0.1em]">{st.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Guide: Easy to Understand & Use */}
      <section className="py-28 bg-slate-900 text-white rounded-[4rem] mx-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] bg-brand-500/10 border border-brand-500/20 text-brand-400 font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full inline-block">
              100% Praktis & Modern
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
              Panduan Cepat & <span className="text-brand-400">Mudah Dipahami</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Kami mendesain alur antrian se-sederhana mungkin. Tidak ada pendaftaran berbelit yang membuang waktu Anda atau pelanggan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Col 1: Pelanggan Flow */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-8 flex flex-col justify-between hover:border-brand-500/30 transition-all duration-500 group">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/10">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-brand-400 uppercase tracking-widest block font-sans">PERAN KLIEN</span>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white group-hover:text-brand-400 transition-colors">Bagi Pelanggan</h3>
                  </div>
                </div>

                <div className="p-4 bg-emerald-500/10 border border-emerald-500/15 text-emerald-300 rounded-2xl text-[11px] font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
                  <span>Tanpa Perlu Email atau Pendaftaran Akun!</span>
                </div>

                <div className="space-y-6 pt-2">
                  {[
                    { step: "01", title: "Masuk Instan dengan Nama", desc: "Pelanggan cukup memasukkan Nama Lengkapnya saat membuka halaman masuk utama. Tanpa email, tanpa sandi." },
                    { step: "02", title: "Ambil Pin Antrian Online", desc: "Pilih layanan toko yang diinginkan (Kasir, Pelanggan, atau Konsultasi) lalu dapatkan nomor antrian digital pintar." },
                    { step: "03", title: "Pantau Estimasi Live dari HP", desc: "Halaman tiket menampilkan jumlah orang di depan Anda dan sisa waktu tunggu yang diperbarui secara otomatis." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="font-mono text-xs font-black text-brand-500 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-lg shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">{item.title}</h4>
                        <p className="text-slate-400 text-[11px] leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link to="/login">
                  <button className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-white text-slate-900 hover:bg-brand-50 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-md group">
                    Ambil Tiket Sebagai Pelanggan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Col 2: Pemilik Usaha Flow */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-8 flex flex-col justify-between hover:border-brand-500/30 transition-all duration-500 group">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                    <Building className="w-6 h-6 text-brand-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block font-sans">PERAN OPERATOR</span>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white group-hover:text-brand-400 transition-colors">Bagi Pemilik Usaha</h3>
                  </div>
                </div>

                <div className="p-4 bg-brand-500/10 border border-brand-500/15 text-brand-300 rounded-2xl text-[11px] font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Aman, Terstruktur, Terintegrasi dengan Email</span>
                </div>

                <div className="space-y-6 pt-2">
                  {[
                    { step: "01", title: "Daftar Akun Toko Gratis", desc: "Daftarkan akun admin Anda secara gratis menggunakan alamat email Anda untuk mengaktifkan sesi manajemen pribadi." },
                    { step: "02", title: "Panggil Antrian Otomatis", desc: "Gunakan tombol panggil di Panel Kontrol untuk mendengarkan pengeras suara komputer (TTS) memanggil pelanggan baru." },
                    { step: "03", title: "Monitoring Laporan & Tren", desc: "Dashboard menampilkan grafik analitik harian, durasi tunggu rata-rata, dan histori antrean untuk evaluasi bisnis." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="font-mono text-xs font-black text-brand-400 bg-white/10 border border-white/5 px-2.5 py-1 rounded-lg shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">{item.title}</h4>
                        <p className="text-slate-400 text-[11px] leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link to="/register">
                  <button className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border border-white/10 group">
                    Daftar Sebagai Pemilik Usaha <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Editorial Features */}
      <section className="py-40 bg-slate-50/50 backdrop-blur-sm" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
            <div>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight tracking-tighter">
                Lebih dari sekadar <br />
                <span className="text-brand-600">tiket bernomor.</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-12 max-w-xl">
                Kami menggabungkan AI canggih dan data real-time untuk menciptakan pengalaman antrian yang terasa personal, profesional, dan efisien.
              </p>
              <div className="space-y-8">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:bg-brand-600 group-hover:text-white transition-all">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-lg mb-2 uppercase tracking-wide">{f.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-md">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Office" 
                  className="w-full h-full object-cover grayscale-[0.2]"
                />
              </div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-600 rounded-[2.5rem] -z-10 blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Showcase Section (Fitur, Aktivitas, Cerita, Pengalaman, Layanan) */}
      <section className="py-32 bg-slate-50/50 backdrop-blur-md relative overflow-hidden" id="showcase">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-20 text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] bg-brand-600/10 border border-brand-600/15 text-brand-600 font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full inline-block">
              Mitra Solusi Digital UMKM
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none uppercase">
              Eksplorasi <span className="text-brand-600 italic">Praktis & Interaktif</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Klik setiap tombol di bawah untuk melihat detail alur kerja, dokumentasi, dan dampak positif nyata yang dihadirkan platform Antriin.
            </p>
          </div>

          {/* Interactive Tab Controller */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16 max-w-5xl mx-auto">
            {[
              { id: "fitur", label: "Fitur Pintar" },
              { id: "aktivitas", label: "Aktivitas Antrian" },
              { id: "cerita", label: "Cerita UMKM" },
              { id: "pengalaman", label: "Pengalaman Pelanggan" },
              { id: "layanan", label: "Layanan Bisnis" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setShowcaseTab(tab.id as any)}
                className={`py-3.5 px-6 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 border ${
                  showcaseTab === tab.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10 scale-105"
                    : "bg-white text-slate-400 border-slate-100 hover:border-slate-300 hover:text-slate-800 shadow-sm"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full transition-all ${showcaseTab === tab.id ? "bg-brand-500 scale-125 animate-ping" : "bg-slate-300"}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Display Card Panel with Animation */}
          <div className="bg-white rounded-[3.5rem] border border-slate-100 p-8 md:p-14 shadow-3xl shadow-slate-200/50 min-h-[520px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={showcaseTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full"
              >
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-brand-600 uppercase tracking-[0.25em] bg-brand-50 px-3 py-1.5 rounded-lg inline-block border border-brand-100">
                      {showcaseData[showcaseTab].tagline}
                    </span>
                    <h3 className="font-display text-3xl md:text-5.5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {showcaseData[showcaseTab].title}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
                      {showcaseData[showcaseTab].desc}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {showcaseData[showcaseTab].highlights.map((h, index) => (
                      <div key={index} className="flex items-center gap-3 bg-slate-50/60 border border-slate-100 p-4 rounded-2xl group hover:bg-slate-50 hover:border-slate-200 transition-all duration-300">
                        <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-brand-600 font-bold" />
                        </div>
                        <span className="text-xs text-slate-700 font-bold uppercase tracking-wider">{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-slate-100 pt-2" />

                  {/* Metrics Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 rounded-full blur-[80px] opacity-20 pointer-events-none" />
                    <div className="space-y-1">
                      <span className="text-[9px] text-brand-400 font-extrabold uppercase tracking-widest block font-sans">EVALUASI METRIK VALID</span>
                      <p className="text-sm font-display font-medium text-slate-300">Statistik Keandalan:</p>
                      <h4 className="text-lg font-bold text-white uppercase tracking-tight">{showcaseData[showcaseTab].stats}</h4>
                    </div>
                    <Link to="/login">
                      <button className="py-3 px-6 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-lg shrink-0">
                        Coba Fitur Sekarang
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Conceptual Mockup/Photo Area */}
                <div className="lg:col-span-5 relative self-stretch flex items-stretch">
                  <div className="w-full min-h-[300px] lg:min-h-full rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-slate-100/10 flex-grow">
                    <img
                      src={showcaseData[showcaseTab].image}
                      alt={showcaseData[showcaseTab].title}
                      className="absolute inset-0 w-full h-full object-cover grayscale-[0.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/10 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="glass-dark p-5 rounded-2xl border border-white/10 text-white space-y-1">
                        <span className="text-[8px] text-brand-400 font-bold uppercase tracking-widest font-mono">Live Terverifikasi</span>
                        <p className="text-xs font-semibold leading-relaxed">Antriin menjamin konsistensi performa digital berstandar tinggi.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5">
           <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000" 
            alt="Abstract Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600 rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-10 tracking-tight">
                Siap untuk tingkatkan <br /> standar layanan Anda?
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-16 font-medium">
                Bergabunglah dengan ribuan bisnis yang telah mentransformasi pengalaman pelanggan mereka bersama Antriin.
              </p>
              <Link to="/register">
                <button className="bg-white text-slate-900 px-12 py-6 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-50 transition-all shadow-xl">
                  Mulai Sekarang Gratis
                </button>
              </Link>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-10 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                <div className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Tanpa Kartu Kredit</div>
                <div className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Setup 5 Menit</div>
                <div className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Dukungan Prioritas 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
