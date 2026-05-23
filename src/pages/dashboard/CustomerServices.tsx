import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Clock, 
  Sparkles, 
  Ticket, 
  Layers, 
  ShieldCheck, 
  Briefcase, 
  ArrowRight,
  Info
} from "lucide-react";
import { 
  getQueues, 
  addQueue, 
  QueueItem,
  syncQueuesWithServer 
} from "../../lib/queueStore";

export function CustomerServices() {
  const [queues, setQueues] = useState<QueueItem[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdTicket, setCreatedTicket] = useState<any>(null);

  useEffect(() => {
    syncQueuesWithServer();
    setQueues(getQueues());

    // Ambil info user
    try {
      const userStr = localStorage.getItem("antriin_current_user");
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      }
    } catch (e) {}

    // Synchronize every 3 seconds
    const interval = setInterval(() => {
      syncQueuesWithServer();
    }, 3000);

    const handleUpdate = () => {
      setQueues(getQueues());
    };
    window.addEventListener("queue-updated", handleUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("queue-updated", handleUpdate);
    };
  }, []);

  // Services catalog list
  const servicesList = [
    {
      id: "A",
      name: "Layanan Kasir",
      desc: "Layanan pembayaran transaksi belanja mandiri, redeem poin promo, dan pengembalian uang refund.",
      avgTime: "4 Menit",
      operator: "Siti Rahmawati (Kasir 1)",
      capacity: "Sangat Cepat",
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600"
    },
    {
      id: "B",
      name: "Layanan Pelanggan",
      desc: "Menangani pendaftaran program loyalitas, klaim garansi produk rusak, keluhan layanan, dan informasi kurir.",
      avgTime: "8 Menit",
      operator: "Ahmad Subagio (CS Desk 1)",
      capacity: "Sedang",
      color: "from-brand-500 to-brand-600",
      textColor: "text-brand-600"
    },
    {
      id: "C",
      name: "Layanan Konsultasi",
      desc: "Layanan temu janji ahli, demonstrasi instalasi produk pintar, konsultasi spesifikasi server, dan custom order UMKM.",
      avgTime: "15 Menit",
      operator: "Dr. Pratama Handoko (Consultant Desk)",
      capacity: "Gantian Terjadwal",
      color: "from-violet-500 to-indigo-700",
      textColor: "text-violet-600"
    }
  ];

  // Hitung status real-time per layanan
  const getServiceStats = (serviceId: string, serviceName: string) => {
    const serviceQueues = queues.filter(q => q.id.startsWith(serviceId));
    const waiting = serviceQueues.filter(q => q.status === "Menunggu").length;
    const active = serviceQueues.find(q => q.status === "Dipanggil" || q.status === "Dilayani");
    return {
      waiting,
      currentActive: active ? active.id : "Belum Berjalan"
    };
  };

  const handleBooking = (serviceName: "Layanan Kasir" | "Layanan Pelanggan" | "Layanan Konsultasi") => {
    const name = currentUser?.name || "Budi Santoso";
    const email = currentUser?.email || "budi@email.com";

    const newItem = addQueue(name, email, serviceName);
    setCreatedTicket(newItem);
    setIsSuccess(true);
    setQueues(getQueues());

    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Baner Deskripsi */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-slate-900 uppercase">Katalog Layanan Digital</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Temukan dan ambil antrian konter secara instan</p>
          </div>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed max-w-4xl font-medium">
          Dapatkan rincian beban operasional toko saat ini. Panel ini menampilkan jumlah pelanggan yang sedang menunggu pelayanan dan nomor tiket yang sedang aktif dipanggil oleh operator konter kami sekarang. Anda dapat langsung mengklik tombol <span className="text-brand-600 font-bold">Ambil Nomor Antrian</span> di setiap kartu untuk mendaftarkan diri.
        </p>
      </div>

      {isSuccess && createdTicket && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 text-emerald-800">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Ticket className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase">Berhasil Mendapatkan Tiket!</h4>
              <p className="text-[11px] font-semibold text-emerald-600">Nomor tiket Antrian Anda telah diterbitkan dan tersimpan langsung.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="bg-emerald-600 text-white font-display font-black text-xl px-5 py-2.5 rounded-2xl shadow-sm">
              {createdTicket.id}
            </div>
            <span className="text-xs font-bold text-emerald-700 uppercase bg-white px-3.5 py-2 rounded-xl border border-emerald-100">
              {createdTicket.serviceType}
            </span>
          </div>
        </motion.div>
      )}

      {/* Grid Katalog Layanan */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {servicesList.map((service) => {
          const stats = getServiceStats(service.id, service.name);
          return (
            <div 
              key={service.id}
              className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-200 transition-all group duration-300"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${service.color} text-white font-display font-black text-sm tracking-wider shadow-md`}>
                    KODE {service.id}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500`}>
                    Avg: {service.avgTime}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors uppercase tracking-tight">{service.name}</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1 mb-4">{service.operator}</p>
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">{service.desc}</p>
                </div>

                <div className="border-t border-dashed border-slate-100 pt-6 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-wider">Antrian Menunggu:</span>
                    <span className={`font-black uppercase py-1 px-3.5 rounded-full ${
                      stats.waiting === 0 
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                        : "bg-amber-50 text-amber-600 border border-amber-100"
                    }`}>
                      {stats.waiting === 0 ? "KOSONG/SENGGANG" : `${stats.waiting} Orang`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-wider">Aktif Dilayani:</span>
                    <span className="font-mono font-bold text-slate-800 bg-slate-50 border border-slate-100 py-1 px-3 rounded-lg">
                      {stats.currentActive}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-wider">Kapasitas Sesi:</span>
                    <span className="font-bold text-slate-600">{service.capacity}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-50">
                <button
                  onClick={() => handleBooking(service.name as any)}
                  className="w-full py-4 bg-slate-950 text-white group-hover:bg-brand-600 rounded-2xl text-[10px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Ambil Tiket Antrian <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3 text-xs text-blue-800 font-semibold leading-relaxed">
        <Info className="w-5 h-5 shrink-0 text-blue-600" />
        <p>
          <strong>Informasi Estimasi:</strong> Waktu tunggu per orang dihitung rata-rata durasi transaksi yang terekam di sistem server sebelumnya. Kami menyarankan Anda tiba di lokasi setidaknya 5-10 menit sebelum nomor sisa antrian Anda terpanggil.
        </p>
      </div>

    </div>
  );
}
