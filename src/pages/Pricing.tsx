import { motion } from "motion/react";
import { Check, Zap, Briefcase, Target, ShieldCheck } from "lucide-react";

const plans = [
  {
    name: "UMKM Pemula",
    price: "0",
    description: "Sangat cocok untuk warung atau toko kecil yang baru memulai digitalisasi antrean.",
    features: ["Hingga 30 Antrean / Hari", "1 Panel Dashboard Operator", "Notifikasi Suara Dasar", "Dukungan Komunitas"],
    icon: <Target className="w-6 h-6 text-emerald-600" />,
    color: "bg-white text-slate-900 border-slate-200/80 shadow-lg shadow-slate-100/50",
    iconBg: "bg-emerald-50",
    checkColor: "bg-emerald-100 text-emerald-700",
    popular: false
  },
  {
    name: "UMKM Berkembang",
    price: "149.000",
    description: "Pilihan terbaik untuk usaha kuliner, klinik, dan toko ritel harian.",
    features: ["Antrean Tak Terbatas", "Multi-Layanan & Multi-Loket", "Notifikasi WhatsApp Otomatis", "Panggilan Suara TTS AI", "Laporan Statistik Harian"],
    icon: <Zap className="w-6 h-6 text-brand-400" />,
    color: "bg-slate-900 text-white border-slate-800 shadow-2xl shadow-slate-900/30",
    iconBg: "bg-white/10",
    checkColor: "bg-brand-500/20 text-brand-300",
    popular: true
  },
  {
    name: "Kemitraan Bisnis",
    price: "349.000",
    description: "Dukungan penuh multi-cabang, prioritas tinggi, dan integrasi API operasional.",
    features: ["Hingga 5 Lokasi Cabang", "Manajemen Staf & Akses Multi-User", "Data Analitik Tren Bulanan", "Akses API & Integrasi Aplikasi", "Dukungan Prioritas 24/7"],
    icon: <Briefcase className="w-6 h-6 text-blue-600" />,
    color: "bg-white text-slate-900 border-slate-200/80 shadow-lg shadow-slate-100/50",
    iconBg: "bg-blue-50",
    checkColor: "bg-blue-100 text-blue-700",
    popular: false
  }
];

export function Pricing() {
  return (
    <div className="py-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 px-4 space-y-4">
          <span className="text-[10px] bg-brand-600/10 border border-brand-600/15 text-brand-600 font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full inline-block">
            Investasi Layanan Berkualitas
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-black text-slate-900 tracking-tight uppercase">Harga Sederhana & <span className="text-brand-600">Transparan</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base font-semibold leading-relaxed">
            Investasikan kenyamanan pelanggan Anda dengan paket layanan yang fleksibel, tanpa biaya tersembunyi, dan mudah diatur sesuai skala bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className={`p-8 md:p-10 rounded-[3.5rem] border flex flex-col relative transition-all duration-300 ${p.color}`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-slate-950 text-[9px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl shadow-brand-500/20">
                  Pilihan Terpopuler
                </div>
              )}
              
              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${p.iconBg} shadow-inner`}>
                  {p.icon}
                </div>
                <h3 className="text-xl font-display font-black mb-3 uppercase tracking-wider">{p.name}</h3>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-xs font-bold opacity-70 italic">Rp</span>
                  <span className="text-4xl md:text-5xl font-black tracking-tighter">{p.price}</span>
                  <span className="text-xs font-bold opacity-70 uppercase tracking-widest ml-2">/bln</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-semibold min-h-[40px]">{p.description}</p>
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                {p.features.map((f, fi) => (
                  <div key={fi} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${p.checkColor} shadow-sm`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-90">{f}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4.5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-md cursor-pointer ${
                p.popular 
                  ? "bg-brand-500 hover:bg-brand-600 text-slate-950 shadow-lg shadow-brand-500/10" 
                  : p.checkColor.includes("blue") 
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200/50"
              }`}>
                Mulai {p.name}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-10 rounded-[3rem] border border-dashed border-slate-200 bg-white flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-brand-300 transition-colors">
          <div className="flex items-center gap-8 text-center md:text-left">
            <div className="w-20 h-20 rounded-[2rem] bg-brand-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-10 h-10 text-brand-600" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900 text-2xl tracking-tight">Butuh solusi enterprise khusus?</h4>
              <p className="text-slate-500 font-medium">Untuk operasi skala besar dengan ribuan transaksi harian.</p>
            </div>
          </div>
          <button className="px-10 py-4 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl shadow-slate-900/10 whitespace-nowrap">
            Hubungi Tim Sales
          </button>
        </div>
      </div>
    </div>
  );
}
