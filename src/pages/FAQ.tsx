import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown, ChevronUp, Clock, ShieldCheck, HelpCircle, Laptop, Phone, Star } from "lucide-react";

interface FAQItem {
  id: string;
  category: "umum" | "pelanggan" | "toko" | "pembayaran";
  question: string;
  answer: string;
}

const faqCategories = [
  { id: "semua", label: "Semua Kategori", icon: <HelpCircle className="w-4 h-4" /> },
  { id: "umum", label: "Umum & Konsep", icon: <Star className="w-4 h-4" /> },
  { id: "pelanggan", label: "Sisi Pelanggan", icon: <Phone className="w-4 h-4" /> },
  { id: "toko", label: "Kebutuhan Toko", icon: <Laptop className="w-4 h-4" /> },
  { id: "pembayaran", label: "Paket & Layanan", icon: <ShieldCheck className="w-4 h-4" /> },
];

const faqData: FAQItem[] = [
  {
    id: "fq1",
    category: "umum",
    question: "Apa itu platform Antriin?",
    answer: "Antriin adalah platform manajemen antrean digital pintar yang dikembangkan khusus untuk membantu UMKM (seperti kedai kopi, salon, klinik, dan toko ritel) mengelola antrean pelanggan dengan tertib, transparan, dan bebas stres. Pelanggan dapat memantau nomor antrean langsung dari handphone mereka secara real-time."
  },
  {
    id: "fq2",
    category: "pelanggan",
    question: "Apakah pelanggan harus men-download aplikasi atau mendaftar?",
    answer: "Tidak perlu sama sekali! Pelanggan cukup membuka tautan halaman masuk utama, memasukkan Nama Lengkap mereka, dan langsung mendapatkan nomor antrean digital. Hal ini demi kepraktisan dan kecepatan akses bagi semua usia."
  },
  {
    id: "fq3",
    category: "toko",
    question: "Bagaimana cara memanggil antrean yang sedang berjalan?",
    answer: "Sebagai pemilik usaha/operator, Anda hanya perlu membuka Panel Kontrol Admin di perangkat komputer, tablet, atau handphone. Cukup klik tombol 'Panggil Antrean berikutnya', dan sistem secara terintegrasi akan memperbarui status layar pelanggan serta menyuarakan nomor panggilan melalui suara otomatis (TTS) komputer Anda."
  },
  {
    id: "fq4",
    category: "pembayaran",
    question: "Apakah benar-benar ada paket gratis?",
    answer: "Ya, kami berkomitmen mendukung pertumbuhan UMKM lokal. Paket 'UMKM Pemula' kami berstatus 100% Gratis selamanya untuk kuota maksimal hingga 30 antrean per hari. Sangat cocok bagi Anda yang baru merintis bisnis."
  },
  {
    id: "fq5",
    category: "pelanggan",
    question: "Bagaimana jika pelanggan melewatkan gilirannya?",
    answer: "Operator toko memiliki fleksibilitas penuh di Dashboard Admin untuk menandai pelanggan sebagai 'Dilewati' atau 'Diproses'. Jika dilewati, nomor antrean tersebut bisa dipanggil ulang sewaktu-waktu atau operator dapat langsung beralih ke antrean berikutnya."
  },
  {
    id: "fq6",
    category: "toko",
    question: "Apakah saya memerlukan perangkat keras khusus?",
    answer: "Sama sekali tidak. Anda hanya membutuhkan perangkat apa pun yang terhubung ke koneksi internet (komputer, laptop, tablet, atau handphone) untuk menjalankan Dashboard Toko. Pelanggan hanya memerlukan handphone biasa dengan web browser modern."
  },
  {
    id: "fq7",
    category: "pembayaran",
    question: "Bagaimana cara upgrade atau berhenti berlangganan?",
    answer: "Anda dapat melakukan upgrade ke paket 'UMKM Berkembang' atau 'Kemitraan Bisnis' kapan saja melalui menu Manajemen Akun. Proses penagihan berjalan bulanan tanpa kontrak yang mengikat, sehingga Anda bebas membatalkannya kapan saja."
  }
];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaq = faqData.filter((item) => {
    const matchesCategory = activeCategory === "semua" || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-24 bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Visual */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] bg-brand-600/10 border border-brand-600/15 text-brand-600 font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full inline-block">
            Pusat Informasi & FAQ
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Pusat <span className="text-brand-600">Bantuan</span>
          </h1>
          <p className="text-slate-505 text-sm md:text-base leading-relaxed text-slate-500 max-w-lg mx-auto font-medium">
            Temukan jawaban instan untuk mengoptimalkan penggunaan sistem antrean digital Anda.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-12">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pertanyaan atau kata kunci bantuan..."
            className="w-full py-4.5 pl-14 pr-6 bg-white border border-slate-200 rounded-[2rem] text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-xl shadow-slate-100/50 font-medium"
          />
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setExpandedId(null); // Reset expanded accordion
              }}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10 scale-102"
                  : "bg-white text-slate-500 border-slate-100 hover:border-slate-200 hover:text-slate-800"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-20">
          <AnimatePresence mode="wait">
            {filteredFaq.length > 0 ? (
              filteredFaq.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    layout="position"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-white border rounded-[2rem] overflow-hidden transition-all duration-300 ${
                      isExpanded 
                        ? "border-brand-500/30 shadow-xl shadow-brand-500/5" 
                        : "border-slate-100 hover:border-slate-200 shadow-sm"
                    }`}
                  >
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full text-left py-6 px-8 flex items-center justify-between gap-6 focus:outline-none group cursor-pointer"
                    >
                      <span className={`text-sm md:text-base font-bold text-slate-900 uppercase tracking-tight group-hover:text-brand-600 transition-colors ${isExpanded ? "text-brand-600" : ""}`}>
                        {item.question}
                      </span>
                      <div className={`p-2 bg-slate-50 rounded-xl text-slate-400 group-hover:text-slate-700 transition-colors shrink-0 ${isExpanded ? "bg-brand-50 text-brand-600" : ""}`}>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-7 pt-1 text-slate-500 text-xs md:text-sm font-semibold leading-relaxed border-t border-slate-50">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white rounded-[2.5rem] border border-slate-100 shadow-inner">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Hasil Tidak Ditemukan</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">Gunakan kata kunci atau kategori yang berbeda.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Call to action */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 rounded-full blur-[80px] opacity-20 pointer-events-none" />
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-display font-black uppercase tracking-tight">Tidak menemukan jawaban Anda?</h3>
            <p className="text-xs text-slate-300 font-semibold max-w-sm">Tim operasional kami bersiaga membantu menyelesaikan kendala operasional digital toko Anda 24/7.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link 
              to="/contact" 
              className="py-4 px-6 bg-brand-500 hover:bg-brand-600 text-slate-950 rounded-2xl text-[10px] uppercase tracking-widest font-black transition-all shadow-lg shadow-brand-500/10 cursor-pointer block text-center"
            >
              Hubungi Kami Sekarang
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
