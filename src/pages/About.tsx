import { motion } from "motion/react";
import { Users, Target, Zap, Heart, ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="bg-transparent min-h-screen">
      {/* Editorial Header */}
      <section className="pt-40 pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-end">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold tracking-[0.2rem] uppercase border border-slate-100">
                Berdiri 2026 / Cerita Kami
              </div>
              <h1 className="font-display text-7xl md:text-9xl font-bold text-slate-900 leading-[0.8] tracking-tighter uppercase mb-12">
                Mengangkat <br /> <span className="text-brand-600">Sisi</span> <br /> Manusia.
              </h1>
            </div>
            <div className="flex-1 text-right">
              <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl ml-auto mb-12">
                Kami tidak hanya membangun platform manajemen antrian. Kami membangun jembatan antara efisiensi bisnis dan martabat pelanggan.
              </p>
              <div className="h-0.5 w-32 bg-slate-900 ml-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Philosophy */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl mb-16 relative">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2000" 
                  alt="Visi Kami" 
                  className="w-full h-full object-cover grayscale-[0.2]"
                />
                <div className="absolute inset-0 bg-brand-600/10 mix-blend-multiply" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="font-display text-3xl font-bold text-slate-900">Masalahnya</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    Antrian tradisional seringkali membingungkan. Pelanggan merasa tersesat, cemas, dan tidak dihargai. Pemilik bisnis merasa kewalahan dan tidak mampu melacak arus pelanggan secara nyata. Kami melihat UMKM kesulitan bersaing karena kurangnya alat untuk mengelola waktu.
                  </p>
                </div>
                <div className="space-y-6">
                  <h3 className="font-display text-3xl font-bold text-slate-900">Solusi Kami</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    Antriin memberikan transparansi. Kami mengubah aktivitas menunggu menjadi kesempatan untuk berinteraksi. Dengan pembaruan real-time dan bantuan AI, kami memastikan setiap pelanggan merasa dihargai, sembari memberikan pemilik bisnis data untuk mengoptimalkan usaha mereka.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 space-y-20">
              <div className="p-10 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative shadow-3xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600 rounded-full blur-3xl opacity-20" />
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-8">Nilai Inti Kami</h4>
                <div className="space-y-10">
                  {[
                    { title: "Transparansi", icon: <Target className="w-5 h-5 text-brand-400" /> },
                    { title: "Efisiensi", icon: <Zap className="w-5 h-5 text-brand-400" /> },
                    { title: "Empati", icon: <Heart className="w-5 h-5 text-brand-400" /> },
                    { title: "Inovasi", icon: <Users className="w-5 h-5 text-brand-400" /> }
                  ].map((val, i) => (
                    <div key={i} className="flex items-center gap-6 group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-600 group-hover:scale-110 transition-all">
                        {val.icon}
                      </div>
                      <span className="text-lg font-display font-bold uppercase tracking-wide group-hover:text-brand-400 transition-colors">{val.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="h-px bg-slate-100" />
                <div className="flex justify-between items-center group cursor-pointer">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Bergabung dengan tim</span>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex justify-between items-center group cursor-pointer">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Materi Pers</span>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Recognition or Stats Expansion */}
      <section className="py-32 bg-slate-50/50 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-24 opacity-[0.02] -z-10">
          <Users className="w-[800px] h-[800px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-slate-900 mb-16 tracking-tight">Dampak dari <span className="text-brand-600 font-mono italic underline decoration-4 underline-offset-8">Antriin</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <p className="text-7xl font-display font-bold text-slate-900 mb-4 tracking-tighter">150rb+</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Jam tunggu dipulihkan</p>
            </div>
            <div>
              <p className="text-7xl font-display font-bold text-slate-900 mb-4 tracking-tighter">98.4%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tingkat kepuasan pelanggan</p>
            </div>
            <div>
              <p className="text-7xl font-display font-bold text-slate-900 mb-4 tracking-tighter">2.5k</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">UMKM tangguh diberdayakan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Call to Action */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="max-w-xl">
              <h2 className="font-display text-5xl font-bold text-slate-900 mb-8 tracking-tight uppercase">Mari bangun masa <br /> depan bersama.</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Baik Anda pemilik bisnis yang ingin mengoptimalkan layanan atau pengembang yang ingin membangun platform di atas sistem kami, kami siap untuk Anda.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/register">
                <button className="bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-2xl">
                  Mulai Sekarang
                </button>
              </Link>
              <button className="flex items-center gap-3 text-slate-900 font-bold text-xs uppercase tracking-widest px-10 py-5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-all">
                <MessageSquare className="w-4 h-4" /> Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
