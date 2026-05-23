import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Settings, 
  Clock, 
  Volume2, 
  Database, 
  HelpCircle, 
  Check, 
  Sliders, 
  ArrowRight,
  Info
} from "lucide-react";
import { 
  getQueues, 
  saveQueues, 
  QueueItem,
  syncQueuesWithServer 
} from "../../lib/queueStore";

export function AdminSettings() {
  const [storeOpen, setStoreOpen] = useState("08:00");
  const [storeClose, setStoreClose] = useState("18:00");
  const [synthRate, setSynthRate] = useState(0.85);
  const [synthLang, setSynthLang] = useState("id-ID");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Load existing settings if any
    const savedOpen = localStorage.getItem("antrian_store_open") || "08:00";
    const savedClose = localStorage.getItem("antrian_store_close") || "18:00";
    const savedRate = localStorage.getItem("antrian_synth_rate") || "0.85";
    const savedLang = localStorage.getItem("antrian_synth_lang") || "id-ID";

    setStoreOpen(savedOpen);
    setStoreClose(savedClose);
    setSynthRate(Number(savedRate));
    setSynthLang(savedLang);
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("antrian_store_open", storeOpen);
    localStorage.setItem("antrian_store_close", storeClose);
    localStorage.setItem("antrian_synth_rate", String(synthRate));
    localStorage.setItem("antrian_synth_lang", synthLang);

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Sound speed TTS test
  const handleTestSound = () => {
    if (!("speechSynthesis" in window)) {
      alert("Browser ini tidak mendukung ucapan Text-To-Speech.");
      return;
    }
    window.speechSynthesis.cancel();
    const text = "Nomor Antrian A, Nol satu, Silakan menuju ke loket transaksi kasir";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = synthLang;
    utterance.rate = synthRate;
    
    // Look for voice preference
    const voices = window.speechSynthesis.getVoices();
    const voiceObj = voices.find(v => v.lang.includes(synthLang.split("-")[0]));
    if (voiceObj) utterance.voice = voiceObj;

    window.speechSynthesis.speak(utterance);
  };

  // Reset database entirely
  const handleResetDatabase = () => {
    if (window.confirm("CRITICAL WARNING: Ini akan menghapus data antrian berjalan dan memuat ulang antrian seeder pengembang. Lanjutkan?")) {
      const DEFAULT_SEED: QueueItem[] = [
        { id: "A-01", name: "Rizky Fauzi", email: "rizky@gmail.com", serviceType: "Layanan Kasir", status: "Selesai", joinedAt: "13:45" },
        { id: "B-01", name: "Siti Aminah", email: "siti@gmail.com", serviceType: "Layanan Pelanggan", status: "Dilayani", joinedAt: "14:10" },
        { id: "C-01", name: "Budi Santoso", email: "budi@email.com", serviceType: "Layanan Konsultasi", status: "Menunggu", joinedAt: "14:12" },
        { id: "A-02", name: "Dewi Lestari", email: "dewi@gmail.com", serviceType: "Layanan Kasir", status: "Menunggu", joinedAt: "14:15" },
        { id: "B-02", name: "Ahmad Subarjo", email: "ahmad@gmail.com", serviceType: "Layanan Pelanggan", status: "Menunggu", joinedAt: "14:22" }
      ];
      localStorage.removeItem("antrian_list");
      saveQueues(DEFAULT_SEED);
      
      alert("Database antrian berhasil di-hard-reset dan di-reseed semula!");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900 uppercase">Pengaturan Bisnis</h1>
        <p className="text-slate-500 text-sm font-medium">Konfigurasi operasional toko, jam aktif mesin kasir, parameter speaker, dan utilitas database.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left main form controls */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
          <form onSubmit={handleSaveSettings} className="space-y-8">
            <h3 className="text-base font-display font-bold text-slate-905 uppercase flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-4">
              <Sliders className="w-5 h-5 text-brand-600" /> Parameter Umum & Sound
            </h3>

            {saveSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-800 text-xs font-bold animate-pulse flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Seluruh parameter pengaturan berhasil disimpan dan distabilkan secara permanen!</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2 text-slate-400">Jam Mulai Layanan</label>
                <input
                  type="time"
                  value={storeOpen}
                  onChange={(e) => setStoreOpen(e.target.value)}
                  className="block w-full py-3.5 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2 text-slate-400">Jam Tutup Layanan</label>
                <input
                  type="time"
                  value={storeClose}
                  onChange={(e) => setStoreClose(e.target.value)}
                  className="block w-full py-3.5 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider text-slate-400">Kecepatan Bicara Suara (TTS Rate)</label>
                  <span className="text-xs font-mono font-bold text-brand-600">{synthRate}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={synthRate}
                  onChange={(e) => setSynthRate(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <span className="block text-[9px] text-slate-400 font-semibold mt-1.5 italic">Direkomendasikan set antara 0.8 sampai 0.9 agar pelafalan ejaan Indonesia terdengar sopan.</span>
              </div>

              <div className="pt-2">
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-2 text-slate-400 font-sans">Bahasa Sintesis Suara</label>
                <select
                  value={synthLang}
                  onChange={(e) => setSynthLang(e.target.value)}
                  className="block w-full py-3.5 px-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700"
                >
                  <option value="id-ID">Bahasa Indonesia (id-ID)</option>
                  <option value="en-US">English (en-US)</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4">
              <button
                type="submit"
                className="px-6 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg"
              >
                Simpan Konfigurasi
              </button>
              <button
                type="button"
                onClick={handleTestSound}
                className="px-6 py-4 bg-slate-50 hover:bg-slate-100 text-slate-755 font-bold border border-slate-100 text-slate-700 rounded-2xl text-xs uppercase tracking-widest transition-all"
              >
                Uji Coba Panggilan Suara
              </button>
            </div>
          </form>
        </div>

        {/* Right side diagnostics */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-6">
            <h3 className="text-base font-display font-bold text-slate-905 uppercase flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-4">
              <Database className="w-5 h-5 text-red-500" /> Diagnosis Sistem
            </h3>

            <div className="space-y-4 text-xs font-semibold text-slate-650">
              <div className="flex justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-slate-400 uppercase text-[9px] font-bold tracking-wider">Engine Lokasi</span>
                <span className="text-slate-800 uppercase text-[10px] font-bold">Local SQLite via Node</span>
              </div>

              <div className="flex justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-slate-400 uppercase text-[9px] font-bold tracking-wider">Status Sync</span>
                <span className="text-emerald-700 uppercase text-[10px] font-bold">ONLINE / AKTIF</span>
              </div>

              <div className="flex justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-slate-400 uppercase text-[9px] font-bold tracking-wider">TTS Synthesis</span>
                <span className="text-brand-600 uppercase text-[10px] font-bold">READY</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleResetDatabase}
                className="w-full py-4 bg-red-50 hover:bg-red-100 border border-red-150 text-red-650 font-bold hover:text-red-700 text-red-600 rounded-2xl text-[10px] uppercase tracking-widest transition-all text-center cursor-pointer"
              >
                Hard Reset Database
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
