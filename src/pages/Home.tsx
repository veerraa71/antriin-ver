import { motion } from "motion/react";
import { ChevronRight, Zap, Target, BarChart3, Clock, CheckCircle2, ShieldCheck, Camera } from "lucide-react";
import { Link } from "react-router-dom";

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
              <Link to="/demo" className="w-full sm:w-auto text-white group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-brand-400 transition-colors">
                Lihat Demo Langsung <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
      <section className="py-32 bg-transparent overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-100 rounded-full blur-[120px] opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
            {[
              { label: "Partner Aktif", val: "2.5k+", desc: "Bisnis yang terus berkembang" },
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

      {/* Visual Experience Section */}
      <section className="py-40 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 text-center max-w-3xl mx-auto">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight uppercase">
              Visualisasi <span className="text-brand-600 italic">Kerapihan.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Rasakan harmoni antara efisiensi bisnis dan kepuasan pelanggan melalui lensa jurnalistik kami.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[700px]">
            <div className="md:col-span-8 group relative overflow-hidden rounded-[3.5rem] shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=1200" 
                alt="Market Scene" 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-2">Denyut Nadi</p>
                <h3 className="text-3xl font-display font-bold uppercase">Alur UMKM Modern</h3>
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-8">
              <div className="flex-1 group relative overflow-hidden rounded-[3rem] shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&q=80&w=800" 
                  alt="Service Detail" 
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-brand-600/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex-1 group relative overflow-hidden rounded-[3rem] shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1556740734-7f9a2b7a0f4d?auto=format&fit=crop&q=80&w=800" 
                  alt="Satisfied Customer" 
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Link to="/gallery" className="px-6 py-3 bg-white text-slate-900 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-xl">
                    Lihat Selengkapnya
                  </Link>
                </div>
              </div>
            </div>
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
