import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Clock, 
  HelpCircle, 
  CheckCircle,
  PlusCircle,
  Info,
  ChevronRight,
  Sparkles,
  Ticket,
  MapPin,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { 
  getQueues, 
  addQueue, 
  QueueItem,
  syncQueuesWithServer
} from "../../lib/queueStore";

export function CustomerDashboard() {
  const [queues, setQueues] = useState<QueueItem[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<"Layanan Kasir" | "Layanan Pelanggan" | "Layanan Konsultasi">("Layanan Kasir");
  const [isTicketCreated, setIsTicketCreated] = useState(false);
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    // Jalankan sinkronisasi awal dengan database file server
    syncQueuesWithServer();

    // Ambil informasi pengguna login
    try {
      const userStr = localStorage.getItem("antriin_current_user");
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      } else {
        // Fallback default budi jika dicoba langsung
        setCurrentUser({ name: "Budi Santoso", email: "budi@email.com", role: "customer" });
      }
    } catch (e) {
      setCurrentUser({ name: "Budi Santoso", email: "budi@email.com", role: "customer" });
    }

    setQueues(getQueues());

    // Ticking jam terus berjalan
    const clockTimer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Sinkronisasi data dari file server di background (setiap 3 detik)
    const syncTimer = setInterval(() => {
      syncQueuesWithServer();
    }, 3000);

    // Dengarkan event sinkronisasi real-time antrian
    const handleUpdate = () => {
      setQueues(getQueues());
    };
    window.addEventListener("queue-updated", handleUpdate);
    
    return () => {
      clearInterval(clockTimer);
      clearInterval(syncTimer);
      window.removeEventListener("queue-updated", handleUpdate);
    };
  }, []);

  // Temukan semua tiket aktif milik pengguna saat ini (berdasarkan email)
  const myEmail = currentUser?.email || "budi@email.com";
  const myActiveTickets = queues.filter(q => q.email.toLowerCase() === myEmail.toLowerCase() && q.status !== "Selesai" && q.status !== "Lewat");
  const myCompletedTickets = queues.filter(q => q.email.toLowerCase() === myEmail.toLowerCase() && (q.status === "Selesai" || q.status === "Lewat"));

  // Sesi Antrian sedang berjalan (jika ada)
  const currentTicket = myActiveTickets.length > 0 ? myActiveTickets[myActiveTickets.length - 1] : null;

  // Hitung jumlah menunggu di depan antrian milik pengguna
  const getQueuePositionStats = (ticket: QueueItem) => {
    // Filter antrian dengan tipe layanan sama yang masih menunggu dan terdaftar sebelum pengguna ini
    const prefix = ticket.id.split("-")[0];
    const sameServiceWaiting = queues.filter(q => q.id.startsWith(prefix) && q.status === "Menunggu");
    
    // Cari index antrian kita di dalam daftar tunggu
    const ticketIndex = sameServiceWaiting.findIndex(q => q.id === ticket.id);
    const peopleAhead = ticketIndex >= 0 ? ticketIndex : 0;
    const estWaitTime = peopleAhead * 5; // Estimasi 5 menit per orang

    return {
      peopleAhead,
      estWaitTime
    };
  };

  // Ajukan Nomor Antrian Baru
  const handleRequestTicket = () => {
    const name = currentUser?.name || "Budi Santoso";
    const email = currentUser?.email || "budi@email.com";
    
    addQueue(name, email, selectedService);
    setIsTicketCreated(true);
    
    // Auto reset efek kembang api / sukses tiket setelah beberapa detik
    setTimeout(() => setIsTicketCreated(false), 3000);
  };

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-8 md:p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-xl shadow-slate-900/10 animate-fade-in">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-600/20 via-transparent to-transparent" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-500 rounded-full blur-[140px] opacity-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl font-medium">
            <span className="text-[10px] font-bold bg-white/10 px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-4 inline-block border border-white/15 text-brand-300">
              DASHBOARD ANTRIAN PERSONAL
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-3">
              Halo, <span className="text-brand-400">{currentUser?.name || "Pelanggan Setia"}</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Dapatkan pengalaman antrian paling instan dan nyaman. Ambil tiket antrian Anda secara daring, pantau tanpa perlu berdiri lama di lokasi!
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center justify-center text-center self-stretch md:self-auto min-w-[200px] shrink-0">
            <Clock className="w-8 h-8 text-brand-400 animate-pulse mb-2" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1 font-mono">Waktu Server</span>
            <h3 className="text-2xl font-mono font-black tracking-tight text-white">
              {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </h3>
            <span className="text-[9px] text-brand-300 font-bold uppercase tracking-widest mt-2 block">
              SINKRONISASI LIVE
            </span>
          </div>
        </div>
      </div>

      {/* Bagian Utama (Grid Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Kolom Kiri: Formulir Pengambilan atau Visual Tiket Aktif */}
        <div className="lg:col-span-7 space-y-8">
          
          <AnimatePresence mode="wait">
            {currentTicket ? (
              // Menampilkan Tiket Antrian Aktif Pengguna
              <motion.div
                key="active-ticket"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center px-1">
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 uppercase">Tiket Antrian Anda</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Pantau status antrian Anda secara live</p>
                  </div>
                  {currentTicket.status === "Dipanggil" && (
                    <span className="px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> DIPANGGIL SEKARANG!
                    </span>
                  )}
                </div>

                {/* Struktur Desain Tiket Maskapai yang Premium */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden relative">
                  {/* Bagian Atas Tiket */}
                  <div className="p-8 bg-brand-600 text-white relative">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex justify-between items-center mb-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-brand-200" />
                        <span className="font-display font-bold uppercase tracking-widest text-xs">ANTRIIN DIGITAL PASS</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full border border-white/15">
                        {currentTicket.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-end relative z-10">
                      <div>
                        <p className="text-brand-200 text-[9px] font-bold uppercase tracking-widest mb-1">Nomor Antrian Anda</p>
                        <h2 className="text-6xl font-display font-black tracking-tighter">
                          {currentTicket.id}
                        </h2>
                      </div>
                      <div className="text-right">
                        <p className="text-brand-200 text-[9px] font-bold uppercase tracking-widest mb-1">Tujuan Konter</p>
                        <h4 className="text-xl font-bold uppercase tracking-tight">
                          {currentTicket.serviceType}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Gerigi Pembatas Tiket Sobek Kosmetik */}
                  <div className="relative h-4 bg-slate-50 flex items-center justify-between px-0 overflow-hidden">
                    <div className="w-6 h-6 rounded-full bg-slate-50 -ml-3 border-r border-slate-100 shrink-0" />
                    <div className="w-full border-t border-dashed border-slate-200 mx-2" />
                    <div className="w-6 h-6 rounded-full bg-slate-50 -mr-3 border-l border-slate-100 shrink-0" />
                  </div>

                  {/* Rincian Bawah Tiket */}
                  <div className="p-8 bg-white text-slate-800 space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Nama Pelanggan</span>
                        <span className="font-bold text-slate-800 uppercase tracking-tight">{currentTicket.name}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Waktu Masuk</span>
                        <span className="font-mono font-bold text-slate-800">{currentTicket.joinedAt} WIB</span>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-brand-600" />
                      </div>
                      <div className="flex-grow">
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Antrian di Depan Anda</span>
                        <span className="font-bold text-slate-900 text-sm">
                          {getQueuePositionStats(currentTicket).peopleAhead === 0 
                            ? "Giliran Anda berikutnya!" 
                            : `${getQueuePositionStats(currentTicket).peopleAhead} Orang lagi`
                          }
                        </span>
                      </div>
                    </div>

                    <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-grow">
                        <span className="block text-[9px] font-bold text-emerald-600/70 uppercase tracking-wider">Estimasi Sisa Menunggu</span>
                        <span className="font-bold text-emerald-800 text-sm">
                          {getQueuePositionStats(currentTicket).peopleAhead === 0 
                            ? "~ Segera dipanggil" 
                            : `Kurang lebih ${getQueuePositionStats(currentTicket).estWaitTime} menit`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 text-xs text-amber-800 font-medium">
                  <Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Pemberitahuan:</strong> Silakan standby di ruang tunggu atau halaman ini. Status antrian sinkron secara otomatis. Bila nomor <b>{currentTicket.id}</b> dipanggil, operator akan memutar pengeras suara di lokasi!
                  </p>
                </div>
              </motion.div>
            ) : (
              // Menampilkan Form Ambil Antrian Baru
              <motion.div
                key="request-ticket-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 uppercase">Ambil Tiket Baru</h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Silakan pilih jenis pelayanan terbaik kami</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { type: "Layanan Kasir", code: "Kode A", desc: "Pembayaran & Kasir Belanja" },
                      { type: "Layanan Pelanggan", code: "Kode B", desc: "Layanan Keluhan, Garansi, & Info" },
                      { type: "Layanan Konsultasi", code: "Kode C", desc: "Konsultasi Produk & Sesi Pengambilan" }
                    ].map((srv) => (
                      <button
                        key={srv.type}
                        onClick={() => setSelectedService(srv.type as any)}
                        className={`p-6 rounded-3xl border-2 transition-all text-left flex flex-col justify-between h-40 ${
                          selectedService === srv.type 
                            ? "border-brand-600 bg-brand-50 text-brand-900 shadow-inner" 
                            : "border-slate-50 bg-slate-50/60 hover:border-slate-100 text-slate-700"
                        }`}
                      >
                        <span className="text-[10px] font-bold text-brand-600 tracking-widest uppercase bg-white border border-slate-100 px-3 py-1 rounded-full w-max">
                          {srv.code}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm uppercase mt-4 mb-1">{srv.type}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold">{srv.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-5 bg-brand-50/60 rounded-2xl border border-brand-100/50 flex gap-4">
                    <Sparkles className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-brand-900">KEUNTUNGAN ANTRIIN</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                        Sistem kami memberikan penomoran pintar yang memperhitungkan beban operator secara real-time. Anda tidak perlu repot mengambil tiket kertas fisik.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleRequestTicket}
                    className="w-full py-5 px-6 bg-slate-950 text-white rounded-3xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-600 transition-all shadow-xl shadow-slate-900/15 flex items-center justify-center gap-2 group"
                  >
                    Dapatkan Tiket Antrian Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Kolom Kanan: Detail Layanan Personal & Riwayat */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Box Riwayat Antrian */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between h-full min-h-[380px]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-display font-bold text-slate-900 uppercase">Riwayat Cetak Tiket</h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Aktivitas kunjungan Anda sebelumnya</p>
                </div>
              </div>

              <div className="space-y-4 max-h-[240px] overflow-y-auto pr-1">
                {myCompletedTickets.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider italic">Belum ada riwayat antrian selesai</p>
                  </div>
                ) : (
                  myCompletedTickets.map((tik) => (
                    <div key={tik.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-200 text-slate-600 rounded-lg flex items-center justify-center font-display font-bold text-xs">
                          {tik.id}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 uppercase">{tik.serviceType}</h4>
                          <span className="text-[8px] font-semibold text-slate-400 font-mono italic">{tik.joinedAt} WIB</span>
                        </div>
                      </div>
                      <span className={`text-[8px] font-bold py-0.5 px-2 rounded-full border ${
                        tik.status === "Selesai" 
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                          : "bg-red-50 text-red-400 border-red-100"
                      }`}>
                        {tik.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span>PROFIL: {currentUser?.email}</span>
              <span className="text-brand-600 font-bold">ANTRIIN SINKRON</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
