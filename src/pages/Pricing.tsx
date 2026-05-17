import { motion } from "motion/react";
import { Check, Zap, Briefcase, Target, ShieldCheck } from "lucide-react";

const plans = [
  {
    name: "Dasar",
    price: "0",
    description: "Ideal untuk usaha kecil dan perorangan.",
    features: ["Maks 20 Antrian/Hari", "Dashboard Standar", "Notifikasi Dasar", "Dukungan Email"],
    icon: <Target className="w-6 h-6" />,
    color: "bg-slate-100 text-slate-900 border-slate-200"
  },
  {
    name: "Pro",
    price: "49k",
    description: "Terbaik untuk UMKM yang sedang berkembang.",
    features: ["Antrian Tak Terbatas", "Analitik Pro", "Notifikasi WhatsApp Otomatis", "Integrasi Asisten AI", "Dukungan Prioritas"],
    icon: <Zap className="w-6 h-6" />,
    color: "bg-brand-600 text-white border-brand-500 shadow-xl shadow-brand-500/20",
    popular: true
  },
  {
    name: "Bisnis",
    price: "99k",
    description: "Solusi lengkap untuk operasi multi-cabang.",
    features: ["Hingga 5 Cabang", "Admin Multi-User", "Analitik AI Lanjutan", "Akses API Penuh", "Dashboard Manajerial"],
    icon: <Briefcase className="w-6 h-6" />,
    color: "bg-slate-900 text-white border-slate-800"
  }
];

export function Pricing() {
  return (
    <div className="py-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 px-4">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">Harga Sederhana & Transparan</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            Investasikan masa depan layanan pelanggan Anda dengan paket yang dirancang untuk tumbuh bersama bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-[3rem] border flex flex-col relative h-full transition-all ${p.color}`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-950 text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-widest shadow-xl">
                  Paling Populer
                </div>
              )}
              
              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-white/10 backdrop-blur-sm shadow-inner`}>
                  {p.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-2 uppercase tracking-wide">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-sm font-bold opacity-70 italic">Rp</span>
                  <span className="text-5xl font-bold tracking-tighter">{p.price}</span>
                  <span className="text-sm font-bold opacity-70 uppercase tracking-widest ml-2">/bln</span>
                </div>
                <p className="text-sm opacity-80 leading-relaxed font-medium">{p.description}</p>
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                {p.features.map((f, fi) => (
                  <div key={fi} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wide opacity-90">{f}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 rounded-3xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-lg ${
                p.popular 
                  ? "bg-white text-brand-600 hover:bg-brand-50" 
                  : p.name === "Bisnis" 
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"
              }`}>
                Pilih Paket {p.name}
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
