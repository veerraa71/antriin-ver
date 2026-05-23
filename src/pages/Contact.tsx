import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: ""
  });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
      setFormData({ name: "", email: "", business: "", message: "" });
    }, 1200);
  };

  const contactInfos = [
    {
      icon: <Mail className="w-5 h-5 text-brand-600" />,
      label: "Kirim Surel Resmi",
      value: "kontak@antriin.com",
      desc: "Balasan maksimal dalam 24 jam kerja."
    },
    {
      icon: <Phone className="w-5 h-5 text-emerald-600" />,
      label: "WhatsApp Layanan",
      value: "082256897701",
      desc: "Senin - Sabtu pukul 08:00 - 18:00 WIB."
    },
    {
      icon: <MapPin className="w-5 h-5 text-indigo-600" />,
      label: "Kantor Operasional",
      value: "Menara Digital, Blok C4 Jakarta",
      desc: "Kunjungan kemitraan bisnis dengan janji temu."
    }
  ];

  return (
    <div className="py-24 bg-transparent min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] bg-brand-600/10 border border-brand-600/15 text-brand-600 font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full inline-block">
            Terhubung Bersama Kami
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Hubungi <span className="text-brand-600">Kami</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Ada pertanyaan khusus mengenai integrasi sistem atau butuh solusi kustom bisnis? Kami siap memberikan jawaban terbaik kapan pun Anda butuhkan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Contact cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">INFORMASI UMUM</span>
              <h2 className="text-xl md:text-2xl font-display font-black text-slate-900 uppercase">Kontak Kemitraan</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">Kami selalu terbuka berkolaborasi dengan jurnalis lokal, investor, dan pemilik rantaian outlet yang berencana mengimplementasikan sistem antrean digital.</p>
            </div>

            <div className="space-y-4 pt-4">
              {contactInfos.map((info, index) => (
                <div key={index} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-3xl hover:border-slate-200 hover:shadow-lg transition-all duration-300">
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 shadow-inner">
                    {info.icon}
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block font-sans">{info.label}</span>
                    <h4 className="text-slate-900 text-xs md:text-sm font-bold uppercase tracking-wide mb-1">{info.value}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold">{info.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-slate-900 text-white rounded-3xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500 rounded-full blur-[60px] opacity-20 pointer-events-none" />
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-brand-400 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-400">Punya Masalah Mendesak?</h4>
                  <p className="text-[10px] text-slate-300 font-semibold leading-relaxed">Silakan langsung sapa tim kami di nomor WhatsApp resmi untuk respon cepat di bawah 15 menit.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 bg-white rounded-[3.5rem] p-8 md:p-12 border border-slate-100 shadow-3xl shadow-slate-200/45">
            <AnimatePresence mode="wait">
              {!isSubmitSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-display font-black text-slate-900 uppercase">Kirimkan Pesan</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Silakan lengkapi formulir dukungan Anda di bawah ini</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2 font-sans">NAMA LENGKAP <span className="text-brand-600">*</span></label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Zackaria Siregar"
                        className="w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2 font-sans">ALAMAT SUREL <span className="text-brand-600">*</span></label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="zack@bisnis.com"
                          className="w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2 font-sans">NAMA TOKO / UMKM (OPSIONAL)</label>
                        <input
                          type="text"
                          value={formData.business}
                          onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                          placeholder="Kopi Seduh Modern"
                          className="w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2 font-sans">ISI PESAN ANDA <span className="text-brand-600">*</span></label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tuliskan kendala, usulan fitur atau pertanyaan komersial Anda di sini sejelas mungkin..."
                        className="w-full py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all font-semibold leading-relaxed resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-slate-900 hover:bg-brand-600 text-white rounded-3xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>Sedang Mengirim...</>
                      ) : (
                        <>
                          Kirim Dukungan Seketika <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-black text-slate-900 uppercase">Pesan Terkirim!</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold max-w-md mx-auto">
                      Terima kasih atas pesan Anda. Pihak representatif dukungan teknis Antriin telah menerima pengajuan tiket Anda dan akan membalas via surel dalam kurun waktu beberapa jam kerja.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsSubmitSuccess(false)}
                      className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] uppercase tracking-widest font-bold rounded-2xl transition-all cursor-pointer"
                    >
                      Kirim Pesan Lainnya
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
