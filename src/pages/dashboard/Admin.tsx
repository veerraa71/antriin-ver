import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Clock, 
  TrendingUp, 
  UserCheck, 
  MoreHorizontal,
  ChevronRight,
  ArrowUpRight,
  Plus,
  Volume2,
  Check,
  UserX,
  Play,
  X,
  PlusCircle,
  HelpCircle,
  Activity
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { useState, useEffect } from "react";
import { 
  getQueues, 
  saveQueues, 
  addQueue, 
  updateQueueStatus, 
  speakQueueNumber, 
  QueueItem,
  syncQueuesWithServer
} from "../../lib/queueStore";

export function AdminDashboard() {
  const [queues, setQueues] = useState<QueueItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  
  // Form State untuk Antrian Baru
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientType, setNewClientType] = useState<"Layanan Kasir" | "Layanan Pelanggan" | "Layanan Konsultasi">("Layanan Kasir");

  useEffect(() => {
    // Sinkronisasi awal dengan database file server
    syncQueuesWithServer();
    setQueues(getQueues());

    // Jam berjalan terus setiap detik
    const clockTimer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Sinkronisasi data latar belakang berkala dari file server (setiap 3 detik)
    const syncTimer = setInterval(() => {
      syncQueuesWithServer();
    }, 3000);

    // Dengarkan event sinkronisasi real-time antartab/komponen
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

  // Filter antrian berdasarkan status
  const waitingQueues = queues.filter(q => q.status === "Menunggu");
  const activeQueues = queues.filter(q => q.status === "Dipanggil" || q.status === "Dilayani");
  const completedQueuesCount = queues.filter(q => q.status === "Selesai").length;
  const skippedQueuesCount = queues.filter(q => q.status === "Lewat").length;

  // Sedang dipanggil/dilayani teratas
  const currentActiveQueue = queues.find(q => q.status === "Dipanggil" || q.status === "Dilayani");

  // Handler Panggil Antrian Berikutnya secara otomatis
  const handleCallNext = () => {
    if (waitingQueues.length === 0) {
      alert("Tidak ada antrian yang sedang menunggu!");
      return;
    }
    const nextQueue = waitingQueues[0]; // First in waiting
    updateQueueStatus(nextQueue.id, "Dipanggil");
    speakQueueNumber(nextQueue.id, nextQueue.serviceType);
  };

  // Handler Aksi Manual Item Antrian tertentu
  const handleSetStatus = (id: string, status: QueueItem["status"]) => {
    updateQueueStatus(id, status);
    
    // Jika tombol panggil diklik, sebutkan nomor antrian
    if (status === "Dipanggil") {
      const q = queues.find(item => item.id === id);
      if (q) speakQueueNumber(q.id, q.serviceType);
    }
  };

  // Handler Tambah Antrian Manual
  const handleAddNewQueueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const email = newClientEmail.trim() || `${newClientName.toLowerCase().replace(/\s+/g, "")}@example.com`;
    addQueue(newClientName, email, newClientType);
    
    // Explicitly update state immediately to prevent lag in admin console rendering
    setQueues(getQueues());
    
    setNewClientName("");
    setNewClientEmail("");
    setIsAddModalOpen(false);
  };

  // Ambil data mingguan dinamis untuk grafik recharts
  const getWeeklyData = () => {
    // Generate data grafik berdasarkan antrian hari ini yang terdaftar
    const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
    const baseValues = [12, 18, 15, 22, 28, 35, 14];
    
    // Tambahkan jumlah antrian riil hari ini ke hari saat ini (misal Jumat/hari lainnya)
    const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // 0-6 (Min - Sab)
    baseValues[currentDayIndex] = baseValues[currentDayIndex] + queues.length;

    return days.map((day, i) => ({
      name: day,
      value: baseValues[i]
    }));
  };

  // Menghitung statistik kartu atas secara dinamis
  const totalQueuesToday = queues.length;
  const avgWaitingTime = waitingQueues.length > 0 ? `${waitingQueues.length * 7}m` : "12m";
  const completedPercentage = totalQueuesToday > 0 
    ? `${Math.round((completedQueuesCount / totalQueuesToday) * 100)}%` 
    : "95%";

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Panel */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="px-3 py-1.5 bg-brand-50 text-brand-600 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border border-brand-100">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-ping" />
              SINKRONISASI DATABASE AKTIF
            </span>
            <span className="px-3 py-1.5 bg-slate-900 text-slate-200 rounded-full text-[10px] font-mono font-bold tracking-widest border border-slate-800 flex items-center gap-2 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-brand-400 animate-spin" style={{ animationDuration: '6s' }} />
              {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} WIB
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 uppercase tracking-tight">Ringkasan Bisnis</h1>
          <p className="text-slate-500 text-sm font-medium">Pantau dan kelola seluruh antrian pelanggan Anda secara interaktif.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-initial px-6 py-4 bg-brand-600 rounded-3xl text-xs font-bold text-white hover:bg-brand-700 transition-all uppercase tracking-widest shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Entri Manual
          </button>
        </div>
      </header>

      {/* Kartu Statistik Dinamis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-brand-50 text-brand-600">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full font-sans">
              TODAY
            </span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Antrian Terdaftar hari ini</p>
          <div className="text-3xl font-display font-bold text-slate-900 flex items-baseline gap-2">
            {totalQueuesToday}
            <span className="text-xs font-bold text-slate-400 font-sans font-medium">antrian</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full font-sans">
              PROYEKSI
            </span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Rata-rata Waktu Menanti</p>
          <div className="text-3xl font-display font-bold text-slate-900 flex items-baseline gap-2">
            {avgWaitingTime}
            <span className="text-xs font-bold text-slate-400 font-sans font-medium">per org</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-amber-50 text-amber-600 rounded-full font-sans">
              MENUGGU
            </span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Dalam Antrian Tunggu</p>
          <div className="text-3xl font-display font-bold text-slate-900 flex items-baseline gap-2">
            {waitingQueues.length}
            <span className="text-xs font-bold text-slate-400 font-sans font-medium">antrian</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-violet-50 text-violet-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-violet-50 text-violet-600 rounded-full font-sans">
              SUKSES
            </span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Rasio Layanan Selesai</p>
          <div className="text-3xl font-display font-bold text-slate-900 flex items-baseline gap-2">
            {completedPercentage}
            <span className="text-xs font-bold text-slate-400 font-sans font-medium">hari ini</span>
          </div>
        </motion.div>
      </div>

      {/* Pusat Kendali Utama (Interactive Console) */}
      <div className="p-8 bg-slate-900 rounded-[3rem] text-white shadow-2xl shadow-slate-900/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500 rounded-full blur-[160px] opacity-20 -translate-y-1/3 translate-x-1/3" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
          <div>
            <span className="text-[9px] font-bold bg-white/10 px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-4 inline-block border border-white/5 text-brand-300">
              Dashboard Konsol Operator Antrian
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 tracking-tight">
              {currentActiveQueue ? `Sedang Melayani: ${currentActiveQueue.id}` : "Tidak Ada Antrian Aktif"}
            </h2>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              {currentActiveQueue 
                ? `Pelanggan ${currentActiveQueue.name} saat ini sedang dilayani di bagian ${currentActiveQueue.serviceType}. Silakan pakai tombol suara jika ingin memanggil ulang.`
                : "Semua pelanggan telah selesai dilayani atau belum ada antrian baru. Tekan tombol di samping kanan untuk memanggil pendaftar berikutnya dari antrian tunggu secara berurutan."
              }
            </p>

            {currentActiveQueue && (
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => speakQueueNumber(currentActiveQueue.id, currentActiveQueue.serviceType)}
                  className="px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-2 uppercase tracking-widest"
                >
                  <Volume2 className="w-4 h-4 text-brand-400" /> Panggil Ulang
                </button>
                {currentActiveQueue.status === "Dipanggil" && (
                  <button
                    onClick={() => handleSetStatus(currentActiveQueue.id, "Dilayani")}
                    className="px-5 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl text-xs font-bold transition-all uppercase tracking-widest flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" /> Mulai Layani
                  </button>
                )}
                {currentActiveQueue.status === "Dilayani" && (
                  <button
                    onClick={() => handleSetStatus(currentActiveQueue.id, "Selesai")}
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold transition-all uppercase tracking-widest flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Selesaikan
                  </button>
                )}
                <button
                  onClick={() => handleSetStatus(currentActiveQueue.id, "Lewat")}
                  className="px-5 py-3 bg-red-600/30 hover:bg-red-600/40 border border-red-500/10 text-red-200 rounded-2xl text-xs font-bold transition-all uppercase tracking-widest flex items-center gap-2"
                >
                  <UserX className="w-4 h-4" /> Lewati/Tidak Hadir
                </button>
              </div>
            )}
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={handleCallNext}
              disabled={waitingQueues.length === 0}
              className="w-full md:w-56 h-32 bg-white text-slate-900 rounded-[2rem] font-bold text-sm tracking-widest uppercase hover:bg-brand-50 hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none group shadow-2xl relative"
            >
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-600 animate-ping" />
              <Volume2 className="w-8 h-8 text-brand-600 group-hover:rotate-12 transition-transform" />
              Panggil Berikutnya
              <span className="text-[9px] font-semibold text-slate-400 normal-case">
                ({waitingQueues.length} antri tunggu)
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Panel Grafik Trafik Antrian */}
        <div className="lg:col-span-2 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm relative">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-display font-bold text-slate-900 uppercase">Trafik Mingguan</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Rata-rata total antrian harian</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 py-1.5 px-3 rounded-full">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-600 animate-pulse" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Hari Ini Berjalan</span>
              </div>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getWeeklyData()}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0c8de3" stopOpacity={0.12}/>
                    <stop offset="95%" stopColor="#0c8de3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 700 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: "16px", 
                    border: "none", 
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                    fontWeight: "600"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0c8de3" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel Daftar Antrian Aktif Seluruhnya */}
        <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex flex-col justify-between max-h-[440px] overflow-hidden">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-display font-bold text-slate-900 uppercase">Daftar Pemantau</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Antrian Aktif saat ini</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100">
                <Activity className="w-4 h-4 animate-spin text-brand-600" />
              </div>
            </div>

            <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
              {queues.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider italic">Belum ada antrian</p>
                </div>
              ) : (
                queues.map((q, i) => {
                  let statusBadge = "";
                  if (q.status === "Menunggu") statusBadge = "bg-amber-50 text-amber-600 border-amber-100";
                  else if (q.status === "Dipanggil") statusBadge = "bg-indigo-50 text-indigo-600 border-indigo-100 animate-pulse";
                  else if (q.status === "Dilayani") statusBadge = "bg-emerald-50 text-emerald-600 border-emerald-100";
                  else if (q.status === "Selesai") statusBadge = "bg-slate-50 text-slate-400 border-slate-100 line-through";
                  else statusBadge = "bg-red-50 text-red-400 border-red-100";

                  return (
                    <div 
                      key={q.id} 
                      className={`flex items-center justify-between group p-3.5 rounded-2xl border transition-all ${
                        q.status === "Dipanggil" || q.status === "Dilayani" 
                          ? "bg-brand-50/40 border-brand-100" 
                          : "bg-slate-50/50 border-slate-100 hover:bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-display font-bold text-sm shrink-0 shadow-sm shadow-brand-600/10">
                          {q.id}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 truncate uppercase tracking-tight">{q.name}</h4>
                          <span className="text-[8px] font-semibold text-slate-400 bg-white py-0.5 px-2 rounded-full border border-slate-150 uppercase tracking-widest font-mono">
                            {q.serviceType}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end shrink-0 gap-1">
                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${statusBadge}`}>
                          {q.status}
                        </span>
                        <span className="text-[8px] font-semibold text-slate-400 font-mono italic">{q.joinedAt}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 text-center">
            <span className="text-[9px] font-bold text-brand-600 tracking-wider uppercase">
              Total {totalQueuesToday} Terdaftar · {waitingQueues.length} Menunggu · {completedQueuesCount} Selesai
            </span>
          </div>
        </div>
      </div>

      {/* Modal Dialog Entri Manual (Add Queue Form) */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[3rem] p-10 max-w-md w-full border border-slate-100 shadow-3xl cursor-default"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 uppercase">Tambah Antrian</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Entri Manual oleh Administrator</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddNewQueueSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Nama Pelanggan</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="block w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-medium"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Alamat Email (Opsional)</label>
                  <input
                    type="email"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    className="block w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-medium"
                    placeholder="email@pelanggan.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Tipe Layanan / Loket UMKM</label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      { type: "Layanan Kasir", desc: "Konter Pembayaran & Kasir Belanja (Kode A)" },
                      { type: "Layanan Pelanggan", desc: "Layanan Keluhan, Garansi, & Info Toko (Kode B)" },
                      { type: "Layanan Konsultasi", desc: "Konsultasi Produk & Sesi Pengambilan (Kode C)" }
                    ].map((srv) => (
                      <button
                        key={srv.type}
                        type="button"
                        onClick={() => setNewClientType(srv.type as any)}
                        className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-1 ${
                          newClientType === srv.type 
                            ? "border-brand-600 bg-brand-50 text-brand-900 animate-pulse-subtle" 
                            : "border-slate-50 bg-slate-50 hover:border-slate-100 text-slate-700 font-normal"
                        }`}
                      >
                        <span className="text-xs font-bold uppercase">{srv.type}</span>
                        <span className="text-[10px] font-semibold text-slate-400">{srv.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-3xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer text-center"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-3xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-brand-500/10 cursor-pointer text-center"
                  >
                    Daftar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
