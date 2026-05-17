import { motion } from "motion/react";
import { Camera, Heart, Share2, Filter, ChevronRight } from "lucide-react";
import { useState } from "react";

const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800", category: "Aktivitas Antrian", title: "Kesibukan Pagi" },
  { id: 2, src: "https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&q=80&w=800", category: "Cerita UMKM", title: "Keahlian Lokal" },
  { id: 3, src: "https://images.unsplash.com/photo-1556740734-7f9a2b7a0f4d?auto=format&fit=crop&q=80&w=800", category: "Pengalaman Pelanggan", title: "Wajah Bahagia" },
  { id: 4, src: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800", category: "Layanan Bisnis", title: "Pekerjaan Presisi" },
  { id: 5, src: "https://images.unsplash.com/photo-1507206130118-b5907f817163?auto=format&fit=crop&q=80&w=800", category: "Aktivitas Antrian", title: "Alur Digital" },
  { id: 6, src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800", category: "Di Balik Layar", title: "Semangat Tim" },
  { id: 7, src: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800", category: "Cerita UMKM", title: "Kebanggaan Lokal" },
  { id: 8, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", category: "Di Balik Layar", title: "Setup Sistem" },
];

const categories = ["Semua", "Aktivitas Antrian", "Cerita UMKM", "Pengalaman Pelanggan", "Layanan Bisnis", "Di Balik Layar"];

export function Gallery() {
  const [activeTab, setActiveTab] = useState("Semua");

  const filteredPhotos = activeTab === "Semua" ? photos : photos.filter(p => p.category === activeTab);

  return (
    <div className="bg-transparent min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="font-display text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight uppercase">
                Visualisasi <br /> <span className="text-brand-600">Kepuasan.</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Eksplorasi jurnalistik atas pengalaman antrian di seluruh mitra UMKM kami. Setiap tiket menceritakan kisah kesabaran, layanan, dan keunggulan.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="p-4 bg-slate-900 text-white rounded-2xl flex items-center gap-2 hover:bg-brand-600 transition-all font-bold text-xs uppercase tracking-widest shadow-xl shadow-slate-900/10">
                <Camera className="w-4 h-4" /> Bagikan Cerita
              </button>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activeTab === cat 
                    ? "bg-brand-600 text-white border-brand-500 shadow-lg shadow-brand-500/20" 
                    : "bg-white text-slate-400 border-slate-100 hover:border-slate-300 hover:text-slate-600 shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredPhotos.map((photo) => (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative group cursor-pointer break-inside-avoid rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={photo.src} 
                alt={photo.title} 
                className="w-full h-auto grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-2">{photo.category}</p>
                <h3 className="text-2xl font-display font-bold text-white mb-6 underline decoration-brand-500 decoration-2 underline-offset-8 decoration-transparent group-hover:decoration-brand-500">
                  {photo.title}
                </h3>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-white hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase tracking-widest">248</span>
                  </button>
                  <button className="flex items-center gap-2 text-white hover:text-brand-400 transition-colors">
                    <Share2 className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase tracking-widest">Bagikan</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <button className="group inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-brand-600 transition-colors">
            Muat Lebih Banyak <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
