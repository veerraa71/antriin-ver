import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Users, Mail, Lock, User, Chrome, ArrowLeft, Briefcase, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useState } from "react";

export function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"admin" | "customer">("admin");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama Lengkap wajib diisi!");
      return;
    }
    if (!email.trim()) {
      setError("Alamat Email wajib diisi!");
      return;
    }
    if (!password || password.length < 8) {
      setError("Kata Sandi minimal harus 8 karakter!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mendaftar ke server.");
      }

      // Store in memory for automatic form-filling
      localStorage.setItem("antriin_last_registered_email", email);
      
      setLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2200);
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan pendaftaran. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-16 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-100 rounded-full blur-[120px] opacity-20 -translate-y-1/2 -translate-x-1/2" />

      <Link to="/" className="fixed top-10 left-10 flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all group z-20">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Kembali ke Beranda</span>
      </Link>

      {/* Overlay Sukses */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-10 rounded-[3rem] shadow-3xl max-w-md w-full text-center border border-slate-100 flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Pendaftaran Berhasil!</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Akun Anda sebagai <span className="text-brand-600 font-bold capitalize">{role === "admin" ? "Pemilik Bisnis" : "Pelanggan"}</span> siap digunakan. Anda akan dihantarkan ke halaman masuk...
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest italic animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-brand-600" /> Mengalihkan...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 mb-10">
          <div className="w-11 h-11 bg-brand-600 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-500/20">
            <Users className="text-white w-6 h-6" />
          </div>
          <span className="font-display text-3xl font-bold tracking-tight uppercase">
            Antri<span className="text-brand-600">in</span>
          </span>
        </Link>
        <h2 className="text-4xl font-display font-bold text-slate-900 mb-2 tracking-tight">Buat Identitas</h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Bergabunglah dalam revolusi antrian digital.</p>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-[520px] relative z-10">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-3xl shadow-slate-200/40 border border-slate-100">
          
          <div className="flex gap-4 mb-10">
            <button 
              type="button"
              onClick={() => setRole("customer")}
              className={`flex-1 p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 group ${
                role === "customer" ? "border-brand-600 bg-brand-50 shadow-inner" : "border-slate-50 bg-slate-50 hover:border-slate-200"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${role === "customer" ? "bg-brand-600 text-white shadow-lg" : "bg-white text-slate-400 group-hover:text-slate-600 shadow-sm"}`}>
                <User className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${role === "customer" ? "text-brand-700" : "text-slate-400"}`}>Pelanggan</span>
            </button>
            <button 
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 group ${
                role === "admin" ? "border-brand-600 bg-brand-50 shadow-inner" : "border-slate-50 bg-slate-50 hover:border-slate-200"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${role === "admin" ? "bg-brand-600 text-white shadow-lg" : "bg-white text-slate-400 group-hover:text-slate-600 shadow-sm"}`}>
                <Briefcase className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${role === "admin" ? "text-brand-700" : "text-slate-400"}`}>Pemilik Bisnis</span>
            </button>
          </div>

          {role === "customer" ? (
            /* PELANGGAN INSTANT INFO CARD */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 px-2 space-y-6"
            >
              <div className="w-16 h-16 bg-brand-50 rounded-3xl flex items-center justify-center mx-auto text-brand-600 border border-brand-100 shadow-sm">
                <Sparkles className="w-8 h-8 animate-pulse text-brand-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-slate-900 leading-tight">Pelanggan Masuk Instan!</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                  Kabar baik! Di platform ANTRIIN, pelanggan tidak perlu repot membuat akun atau mendaftarkan email & kata sandi baru. 
                  Anda dapat langsung mengantre cukup dengan mengetikkan nama Anda pada halaman masuk.
                </p>
              </div>
              <Link
                to="/login"
                className="w-full inline-flex justify-center items-center gap-3 py-5 px-6 bg-slate-900 hover:bg-brand-600 text-white rounded-3xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10"
              >
                Ke Halaman Masuk Instan
              </Link>
            </motion.div>
          ) : (
            /* ADMIN REGISTRATION FORM */
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-xs font-semibold"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Nama Lengkap</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-inner font-medium"
                      placeholder="Contoh: Budi Santoso"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Alamat Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-inner font-medium"
                      placeholder="budi@email.com"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Kata Sandi Aman</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-inner font-medium"
                      placeholder="Min. 8 karakter"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {role === "admin" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-brand-50 rounded-2xl border border-brand-100"
                >
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-brand-800 leading-relaxed font-bold uppercase tracking-wide">
                      Lisensi Profesional: <span className="text-slate-500 font-medium normal-case">Sebagai pemilik bisnis, Anda akan mendapatkan akses ke otomatisasi antrian dan alat analitik kelas industri.</span>
                    </p>
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-3 py-5 px-6 bg-slate-900 text-white rounded-3xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all shadow-2xl shadow-slate-900/10 disabled:opacity-70"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verifikasi Identitas & Bergabung"}
              </button>
            </form>
          )}

          <div className="relative py-4 my-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em]">
              <span className="px-5 bg-white text-slate-300 font-bold">Pendaftaran Aman</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => {
              setName("Budi Santoso");
              setEmail("budi@email.com");
              setPassword("password123");
            }}
            className="w-full flex justify-center items-center gap-4 py-5 px-6 bg-slate-50 border border-slate-100 text-slate-700 rounded-3xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            Gunakan Akun Demo
          </button>

          <div className="mt-12 text-center">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest leading-loose">
              Sudah punya akun? <br />
              <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700 underline decoration-2 underline-offset-4">Masuk Sekarang</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
