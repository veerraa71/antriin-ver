import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  Users, 
  CheckCircle, 
  X,
  Volume2,
  Lock,
  Eye,
  Info
} from "lucide-react";
import { 
  getQueues, 
  QueueItem,
  syncQueuesWithServer 
} from "../../lib/queueStore";

interface ServiceConfig {
  id: string;
  name: string;
  code: string;
  avgTime: number; // in mins
  deskName: string;
  status: "Aktif" | "Nonaktif";
}

export function AdminServices() {
  const [queues, setQueues] = useState<QueueItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceConfig | null>(null);

  // Form states
  const [srvName, setSrvName] = useState("");
  const [srvCode, setSrvCode] = useState("D");
  const [srvAvgTime, setSrvAvgTime] = useState(10);
  const [srvDesk, setSrvDesk] = useState("");
  const [srvStatus, setSrvStatus] = useState<"Aktif" | "Nonaktif">("Aktif");

  // Load custom services configurations from localStorage or fallback defaults
  const [services, setServices] = useState<ServiceConfig[]>([]);

  useEffect(() => {
    syncQueuesWithServer();
    setQueues(getQueues());

    // Load services from local storage or set defaults
    const savedSrvs = localStorage.getItem("antrian_services_config");
    if (savedSrvs) {
      setServices(JSON.parse(savedSrvs));
    } else {
      const defaultSrvs: ServiceConfig[] = [
        { id: "A", name: "Layanan Kasir", code: "A", avgTime: 4, deskName: "Siti Rahmawati (Kasir 1)", status: "Aktif" },
        { id: "B", name: "Layanan Pelanggan", code: "B", avgTime: 8, deskName: "Ahmad Subagio (CS Desk 1)", status: "Aktif" },
        { id: "C", name: "Layanan Konsultasi", code: "C", avgTime: 15, deskName: "Dr. Pratama Handoko (Consultant Desk)", status: "Aktif" }
      ];
      localStorage.setItem("antrian_services_config", JSON.stringify(defaultSrvs));
      setServices(defaultSrvs);
    }

    const interval = setInterval(() => {
      syncQueuesWithServer();
    }, 4000);

    const handleUpdate = () => {
      setQueues(getQueues());
    };
    window.addEventListener("queue-updated", handleUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("queue-updated", handleUpdate);
    };
  }, []);

  const saveServicesConfig = (updated: ServiceConfig[]) => {
    setServices(updated);
    localStorage.setItem("antrian_services_config", JSON.stringify(updated));
    // Trigger window update so other tabs sync up
    window.dispatchEvent(new Event("services-updated"));
  };

  const getServiceWaitingCount = (prefix: string) => {
    return queues.filter(q => q.id.startsWith(prefix) && q.status === "Menunggu").length;
  };

  const getServiceTotalCount = (prefix: string) => {
    return queues.filter(q => q.id.startsWith(prefix)).length;
  };

  // Add Service Handler
  const handleAddServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvName.trim() || !srvCode.trim()) return;

    const newSrv: ServiceConfig = {
      id: srvCode.trim().toUpperCase(),
      name: srvName,
      code: srvCode.trim().toUpperCase(),
      avgTime: Number(srvAvgTime),
      deskName: srvDesk || "Petugas Desk Utama",
      status: srvStatus
    };

    const updated = [...services, newSrv];
    saveServicesConfig(updated);
    setIsAddModalOpen(false);

    // Reset fields
    setSrvName("");
    setSrvCode("");
    setSrvAvgTime(10);
    setSrvDesk("");
    setSrvStatus("Aktif");
  };

  // Edit Service triggers
  const openEditModal = (service: ServiceConfig) => {
    setSelectedService(service);
    setSrvName(service.name);
    setSrvCode(service.code);
    setSrvAvgTime(service.avgTime);
    setSrvDesk(service.deskName);
    setSrvStatus(service.status);
    setIsEditModalOpen(true);
  };

  const handleEditServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const updated = services.map(srv => {
      if (srv.id === selectedService.id) {
        return {
          ...srv,
          name: srvName,
          avgTime: Number(srvAvgTime),
          deskName: srvDesk,
          status: srvStatus
        };
      }
      return srv;
    });

    saveServicesConfig(updated);
    setIsEditModalOpen(false);
    setSelectedService(null);
  };

  // Delete Service config
  const handleDeleteService = (code: string) => {
    if (code === "A" || code === "B" || code === "C") {
      alert("Layanan default dasar tidak dapat dihapus demi keandalan operasional sistem.");
      return;
    }
    if (window.confirm(`Konfirmasi hapus konfigurasi layanan [Kode ${code}]?`)) {
      const updated = services.filter(srv => srv.code !== code);
      saveServicesConfig(updated);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Banner info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 uppercase">Kelola Parameter Layanan</h1>
          <p className="text-slate-500 text-sm font-medium">Atur durasi penanganan per loket, kelola operator konter, dan tambahkan loket baru.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-3xl text-xs font-bold transition-all uppercase tracking-widest shadow-xl shadow-brand-500/10 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Kategori Baru
        </button>
      </div>

      {/* Services Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((srv) => {
          const waiting = getServiceWaitingCount(srv.code);
          const total = getServiceTotalCount(srv.code);

          return (
            <div 
              key={srv.id}
              className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group duration-300"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-display font-black text-lg shadow-sm">
                    {srv.code}
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                    srv.status === "Aktif" 
                      ? "bg-emerald-50 text-emerald-650 border-emerald-100" 
                      : "bg-slate-50 text-slate-400 border-slate-100"
                  }`}>
                    {srv.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 uppercase tracking-tight">{srv.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1.5 mb-4 text-slate-405 font-semibold text-xs text-slate-400">
                    <span>Operator: {srv.deskName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-semibold text-slate-600">
                    <div>
                      <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wide">Menunggu</span>
                      <span className="font-bold text-slate-800">{waiting} Orang</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wide">Total Terdaftar</span>
                      <span className="font-bold text-slate-800">{total} Tiket</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-100 pt-6 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Avg: {srv.avgTime} menit</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-slate-50">
                <button
                  onClick={() => openEditModal(srv)}
                  className="w-full py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-100 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Sunting
                </button>
                <button
                  onClick={() => handleDeleteService(srv.code)}
                  disabled={srv.code === "A" || srv.code === "B" || srv.code === "C"}
                  className="w-full py-3.5 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-100 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 text-xs text-amber-800 font-semibold leading-relaxed">
        <Info className="w-5 h-5 shrink-0 text-amber-600" />
        <p>
          <strong>Pengingat Operator:</strong> Angka estimasi waktu pelayanan rata-rata digunakan oleh kalkulator estimasi di panel HP pelanggan personal secara dinamis. Harap setel angka penanganan yang seakurat mungkin untuk kepuasan pelanggan yang maksimal.
        </p>
      </div>

      {/* Add Category Modal */}
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
              <div className="flex justify-between items-center mb-8 font-sans">
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 uppercase">Tambah Kategori Baru</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Buat antrian layanan di loket baru</p>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddServiceSubmit} className="space-y-6 font-sans">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Nama Layanan</label>
                  <input
                    type="text"
                    required
                    value={srvName}
                    onChange={(e) => setSrvName(e.target.value)}
                    className="block w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-medium"
                    placeholder="Contoh: Layanan Garansi Khusus"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Kode Huruf (Prefix)</label>
                    <input
                      type="text"
                      required
                      maxLength={1}
                      value={srvCode}
                      onChange={(e) => setSrvCode(e.target.value)}
                      className="block w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-mono font-bold uppercase"
                      placeholder="D"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Avg Waktu Layanan (m)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={srvAvgTime}
                      onChange={(e) => setSrvAvgTime(Number(e.target.value))}
                      className="block w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Nama Operator & Nomor Desk</label>
                  <input
                    type="text"
                    required
                    value={srvDesk}
                    onChange={(e) => setSrvDesk(e.target.value)}
                    className="block w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-medium"
                    placeholder="Contoh: Rian Anggoro (Desk 2)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="w-full py-4 bg-slate-105 hover:bg-slate-200 bg-slate-100 text-slate-700 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer text-center"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-brand-500/10 cursor-pointer text-center"
                  >
                    Buat Layanan
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Category Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEditModalOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[3rem] p-10 max-w-md w-full border border-slate-100 shadow-3xl cursor-default"
            >
              <div className="flex justify-between items-center mb-8 font-sans">
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 uppercase">Sunting Parameter</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Update konter [Kode {selectedService.code}]</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditServiceSubmit} className="space-y-6 font-sans">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Nama Layanan</label>
                  <input
                    type="text"
                    required
                    value={srvName}
                    onChange={(e) => setSrvName(e.target.value)}
                    className="block w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Kode Huruf</label>
                    <input
                      type="text"
                      disabled
                      value={srvCode}
                      className="block w-full py-4 px-5 bg-slate-100 border border-slate-100 rounded-2xl text-slate-400 text-sm font-mono font-bold uppercase cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Avg Waktu pelayanan (m)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={srvAvgTime}
                      onChange={(e) => setSrvAvgTime(Number(e.target.value))}
                      className="block w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Nama Operator & Nomor Desk</label>
                  <input
                    type="text"
                    required
                    value={srvDesk}
                    onChange={(e) => setSrvDesk(e.target.value)}
                    className="block w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Status Keaktifan Loket</label>
                  <select
                    value={srvStatus}
                    onChange={(e) => setSrvStatus(e.target.value as any)}
                    className="block w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-medium"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer text-center"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-brand-500/10 cursor-pointer text-center"
                  >
                    Simpan Perubahan
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
