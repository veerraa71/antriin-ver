import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Clock, 
  Plus, 
  Volume2, 
  Check, 
  UserX, 
  Play, 
  X, 
  Trash2, 
  Search, 
  Filter, 
  HelpCircle,
  MoreVertical,
  ChevronDown
} from "lucide-react";
import { 
  getQueues, 
  saveQueues, 
  addQueue, 
  updateQueueStatus, 
  speakQueueNumber, 
  QueueItem,
  syncQueuesWithServer
} from "../../lib/queueStore";

export function AdminQueues() {
  const [queues, setQueues] = useState<QueueItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("Semua");
  const [statusFilter, setStatusFilter] = useState<string>("Semua");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientType, setNewClientType] = useState<"Layanan Kasir" | "Layanan Pelanggan" | "Layanan Konsultasi">("Layanan Kasir");

  useEffect(() => {
    syncQueuesWithServer();
    setQueues(getQueues());

    const syncTimer = setInterval(() => {
      syncQueuesWithServer();
    }, 3000);

    const handleUpdate = () => {
      setQueues(getQueues());
    };
    window.addEventListener("queue-updated", handleUpdate);
    
    return () => {
      clearInterval(syncTimer);
      window.removeEventListener("queue-updated", handleUpdate);
    };
  }, []);

  // Update Status
  const handleSetStatus = (id: string, status: QueueItem["status"]) => {
    updateQueueStatus(id, status);
    setQueues(getQueues());
    if (status === "Dipanggil") {
      const q = queues.find(item => item.id === id);
      if (q) speakQueueNumber(q.id, q.serviceType);
    }
  };

  // Delete Queue entirely
  const handleDeleteQueue = (id: string) => {
    const list = getQueues().filter(q => q.id !== id);
    saveQueues(list);
    setQueues(list);
  };

  // Clean all completed/skipped queue items
  const handleClearHistory = () => {
    if (window.confirm("Beneran ingin membersihkan semua riwayat antrian selesai dan terlewat?")) {
      const activeOnly = getQueues().filter(q => q.status !== "Selesai" && q.status !== "Lewat");
      saveQueues(activeOnly);
      setQueues(activeOnly);
    }
  };

  // Submit manual
  const handleAddNewQueueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const email = newClientEmail.trim() || `${newClientName.toLowerCase().replace(/\s+/g, "")}@example.com`;
    addQueue(newClientName, email, newClientType);
    setQueues(getQueues());
    
    setNewClientName("");
    setNewClientEmail("");
    setIsAddModalOpen(false);
  };

  // Filter & Search Queues
  const filteredQueues = queues.filter(q => {
    const matchSearch = q.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        q.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchCategory = categoryFilter === "Semua" ? true : q.serviceType === categoryFilter;
    const matchStatus = statusFilter === "Semua" ? true : q.status === statusFilter;

    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Top action layout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 uppercase">Manajemen Antrian Aktif</h1>
          <p className="text-slate-500 text-sm font-medium">Kendalikan pemanggilan suara, mulai layanan, dan rincian kontak secara rinci.</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <button 
            type="button"
            onClick={handleClearHistory}
            className="flex-1 sm:flex-initial px-5 py-4 bg-red-50 border border-red-200 text-red-650 hover:bg-red-100 rounded-3xl text-[10px] font-bold text-red-700 uppercase tracking-widest transition-all text-center cursor-pointer"
          >
            Bersihkan Riwayat
          </button>
          <button 
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-initial px-6 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-3xl text-xs font-bold transition-all uppercase tracking-widest shadow-xl shadow-brand-500/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Entri Manual
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Cari antrian berdasarkan nama, ID, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
          />
        </div>

        <div className="md:col-span-3 flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0">Loket:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all cursor-pointer"
          >
            <option value="Semua">Semua Layanan</option>
            <option value="Layanan Kasir">Layanan Kasir (A)</option>
            <option value="Layanan Pelanggan">Layanan Pelanggan (B)</option>
            <option value="Layanan Konsultasi">Layanan Konsultasi (C)</option>
          </select>
        </div>

        <div className="md:col-span-4 flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all cursor-pointer"
          >
            <option value="Semua">Semua Status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Dipanggil">Dipanggil</option>
            <option value="Dilayani">Dilayani</option>
            <option value="Selesai">Selesai</option>
            <option value="Lewat">Dilewati (Tidak Hadir)</option>
          </select>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-55 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="py-5 px-8">ID Antrian</th>
                <th className="py-5 px-4">Nama Pelanggan</th>
                <th className="py-5 px-4">Jenis Layanan</th>
                <th className="py-5 px-4">Waktu Mulai</th>
                <th className="py-5 px-4 text-center">Status</th>
                <th className="py-5 px-8 text-right">Opsi Operasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredQueues.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-xs text-slate-400 italic uppercase tracking-wider font-semibold">
                    Tidak ada antrian yang cocok dengan pencarian / filter Anda
                  </td>
                </tr>
              ) : (
                filteredQueues.map((q) => {
                  let badge = "";
                  if (q.status === "Menunggu") badge = "bg-amber-50 text-amber-600 border-amber-150";
                  else if (q.status === "Dipanggil") badge = "bg-indigo-50 text-indigo-600 border-indigo-150 animate-pulse";
                  else if (q.status === "Dilayani") badge = "bg-emerald-50 text-emerald-600 border-emerald-150";
                  else if (q.status === "Selesai") badge = "bg-slate-50 text-slate-400 border-slate-150 line-through";
                  else badge = "bg-red-50 text-red-550 border-red-150";

                  return (
                    <tr 
                      key={q.id}
                      className={`hover:bg-slate-50/50 transition-colors ${
                        q.status === "Dipanggil" || q.status === "Dilayani" ? "bg-blend-overlay bg-brand-50/10" : ""
                      }`}
                    >
                      <td className="py-5 px-8 font-display font-black text-slate-900">{q.id}</td>
                      <td className="py-5 px-4">
                        <div className="font-bold text-slate-800 uppercase tracking-tight">{q.name}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{q.email}</div>
                      </td>
                      <td className="py-5 px-4">
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full border border-slate-100 bg-slate-50 uppercase text-slate-500">
                          {q.serviceType}
                        </span>
                      </td>
                      <td className="py-5 px-4 font-mono font-bold text-slate-500">{q.joinedAt} WIB</td>
                      <td className="py-5 px-4 text-center">
                        <span className={`text-[9px] font-bold px-3 py-1 rounded-full border uppercase ${badge}`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="py-5 px-8 text-right">
                        <div className="flex justify-end gap-2">
                          
                          {q.status === "Menunggu" && (
                            <button
                              title="Panggil Antrian"
                              onClick={() => handleSetStatus(q.id, "Dipanggil")}
                              className="p-3 bg-brand-50 hover:bg-brand-100 text-brand-600 rounded-2xl border border-brand-100 transition-all cursor-pointer"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          )}

                          {q.status === "Dipanggil" && (
                            <>
                              <button
                                title="Panggil Ulang"
                                onClick={() => speakQueueNumber(q.id, q.serviceType)}
                                className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-650 border border-slate-150 rounded-2xl transition-all cursor-pointer"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <button
                                title="Mulai Layani"
                                onClick={() => handleSetStatus(q.id, "Dilayani")}
                                className="p-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl transition-all cursor-pointer"
                              >
                                <Play className="w-4 h-4 fill-white" />
                              </button>
                            </>
                          )}

                          {q.status === "Dilayani" && (
                            <button
                              title="Selesaikan Layanan"
                              onClick={() => handleSetStatus(q.id, "Selesai")}
                              className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition-all cursor-pointer"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}

                          {(q.status === "Menunggu" || q.status === "Dipanggil" || q.status === "Dilayani") && (
                            <button
                              title="Lewati Pelanggan"
                              onClick={() => handleSetStatus(q.id, "Lewat")}
                              className="p-3 bg-red-50 hover:bg-red-100 text-red-650 rounded-2xl border border-red-100 transition-all cursor-pointer"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            title="Hapus Tiket"
                            onClick={() => handleDeleteQueue(q.id)}
                            className="p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 text-slate-400 border border-slate-100 rounded-2xl transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Input Modal */}
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
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Entri Manual oleh Operator</p>
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
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Tipe Layanan / Konter</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { type: "Layanan Kasir", desc: "Konter Pembayaran & Kasir Belanja (Kode A)" },
                      { type: "Layanan Pelanggan", desc: "Layanan Keluhan, Garansi, & Info Toko (Kode B)" },
                      { type: "Layanan Konsultasi", desc: "Konsultasi Produk & Sesi Pengambilan (Kode C)" }
                    ].map((srv) => (
                      <button
                        key={srv.type}
                        type="button"
                        onClick={() => setNewClientType(srv.type as any)}
                        className={`p-4 rounded-xl border transition-all text-left flex flex-col gap-0.5 ${
                          newClientType === srv.type 
                            ? "border-brand-600 bg-brand-50 text-brand-900 font-bold" 
                            : "border-slate-100 bg-slate-50 hover:border-slate-200 text-slate-705 font-medium"
                        }`}
                      >
                        <span className="text-xs font-bold uppercase">{srv.type}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{srv.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-750 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer text-center"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-brand-500/10 cursor-pointer text-center"
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
