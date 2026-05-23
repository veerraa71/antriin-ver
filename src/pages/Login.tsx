import React from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Users, Mail, Lock, ArrowLeft, Loader2, AlertCircle, Phone, User, Building, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"customer" | "admin">("customer");
  
  // State Pelanggan (Masuk Instan)
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // State Pemilik Usaha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Pre-populate email jika baru saja register
  useEffect(() => {
    const lastReg = localStorage.getItem("antriin_last_registered_email");
    if (lastReg) {
      setEmail(lastReg);
      setActiveTab("admin");
      localStorage.removeItem("antriin_last_registered_email");
    }
  }, []);

  const handleCustomerInstantLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!customerName.trim()) {
      setError("Nama Lengkap wajib diisi!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        const cleanName = customerName.trim();
        const cleanPhone = customerPhone.trim();
        
        // Buat detail session pelanggan unik berdasarkan nama atau telepon
        const customerEmail = cleanPhone 
          ? `${cleanPhone}@telp.local` 
          : `${cleanName.toLowerCase().replace(/\s+/g, "")}@customer.local`;

        const matchedUser = {
          name: cleanName,
          email: customerEmail,
          phone: cleanPhone,
          role: "customer"
        };

        // Simpan sesi aktif pelanggan
        localStorage.setItem("antriin_current_user", JSON.stringify(matchedUser));
        
        setLoading(false);
        navigate("/dashboard/customer");
      } catch (err) {
        setError("Gagal masuk. Silakan coba lagi.");
        setLoading(false);
      }
    }, 1000);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Alamat email wajib diisi!");
      return;
    }
    if (!password) {
      setError("Kata sandi wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 seconds fail-fast

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Email atau kata sandi pemilik usaha salah!");
      }

      // Simpan sesi aktif
      localStorage.setItem("antriin_current_user", JSON.stringify({
        name: data.user.name,
        email: data.user.email,
        role: data.user.role
      }));
      
      setLoading(false);
      if (data.user.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/customer");
      }
    } catch (err: any) {
      console.warn("Backend API login unreachable or returned error, falling back to local storage credentials...", err.message);
      
      // Offline fallback: check localStorage users
      const localUsersStr = localStorage.getItem("antriin_local_users") || "[]";
      const localUsers = JSON.parse(localUsersStr);
      
      // Default admin and demo users
      const defaultUsers = [
        { name: "Admin ANTRIIN", email: "admin@antriin.com", password: "password123", role: "admin" },
        { name: "Budi Santoso", email: "budi@email.com", password: "password123", role: "customer" }
      ];
      
      const allUsers = [...defaultUsers, ...localUsers];
      const matched = allUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (matched) {
        localStorage.setItem("antriin_current_user", JSON.stringify({
          name: matched.name,
          email: matched.email,
          role: matched.role
        }));
        setLoading(false);
        if (matched.role === "admin") {
          navigate("/dashboard/admin");
        } else {
          navigate("/dashboard/customer");
        }
      } else {
        // Fallback email/password error
        setError(err.message && !err.message.includes("aborted") && !err.message.includes("fetch") 
          ? err.message 
          : "Sandi salah atau server lokal sedang sibuk. Silakan coba kredensial demo.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2" />
      
      <Link to="/" className="fixed top-10 left-10 flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all group z-20">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Kembali ke Beranda</span>
      </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 mb-10">
          <div className="w-11 h-11 bg-brand-600 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-500/20">
            <Users className="text-white w-6 h-6" />
          </div>
          <span className="font-display text-3xl font-bold tracking-tight uppercase">
            Antri<span className="text-brand-600">in</span>
          </span>
        </Link>
        <h2 className="text-4xl font-display font-bold text-slate-900 mb-2 tracking-tight">Selamat Datang</h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Akses layanan digital antrian terpintar.</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
        <div className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-3xl shadow-slate-200/40 border border-slate-100">
          
          {/* Selector Tab */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            <button
              onClick={() => {
                setActiveTab("customer");
                setError("");
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === "customer" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <User className="w-4 h-4" /> Pelanggan
            </button>
            <button
              onClick={() => {
                setActiveTab("admin");
                setError("");
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === "admin" 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Building className="w-4 h-4" /> Pemilik Usaha
            </button>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 mb-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-xs font-semibold"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {activeTab === "customer" ? (
            /* FORM CUSTOMER: MASUK TANPA EMAIL */
            <form onSubmit={handleCustomerInstantLogin} className="space-y-6">
              <div className="bg-brand-50/60 rounded-2xl p-4 border border-brand-100/50 mb-2">
                <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Masuk Instan Tanpa Sandi
                </span>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                  Sebagai Pelanggan, Anda tidak perlu repot membuat akun. Cukup ketik Nama Anda untuk memesan nomor antrian online!
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Nama Lengkap</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={customerName}
                    disabled={loading}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="block w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-inner font-medium"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">No. WhatsApp / HP (Opsional)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <input
                    type="tel"
                    value={customerPhone}
                    disabled={loading}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="block w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-inner font-medium"
                    placeholder="Contoh: 081234567890"
                  />
                </div>
                <p className="text-[9px] text-slate-400 font-semibold mt-2.5 px-1 uppercase tracking-wide">Berguna untuk verifikasi tiket antrian personal Anda.</p>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-3 py-5 px-6 bg-slate-900 text-white rounded-3xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all shadow-2xl shadow-slate-900/10 disabled:opacity-70"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Mulai Masuk & Antri"}
              </button>
            </form>
          ) : (
            /* FORM ADMIN: MASUK DENGAN EMAIL */
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Email Pemilik Usaha / Admin</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-inner font-medium"
                    placeholder="nama@toko-umkm.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Kata Sandi</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-inner font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-3 py-5 px-6 bg-slate-900 text-white rounded-3xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all shadow-2xl shadow-slate-900/10 disabled:opacity-70"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Masuk Dashboard Bisnis"}
              </button>
            </form>
          )}

          <div className="relative py-4 mt-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em]">
              <span className="px-5 bg-white text-slate-300 font-bold">Uji Coba Instan</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <button 
              type="button"
              onClick={() => {
                setActiveTab("customer");
                setCustomerName("Budi Santoso");
                setCustomerPhone("081234567890");
              }}
              className="flex flex-col items-center justify-center p-3 text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-2xl text-[10px] font-bold uppercase tracking-wider transition-all"
            >
              <span>Demo Customer</span>
              <span className="text-[8px] font-medium text-slate-400 lowercase italic font-sans">budi - tanpa email</span>
            </button>
            <button 
              type="button"
              onClick={() => {
                setActiveTab("admin");
                setEmail("admin@antriin.com");
                setPassword("password123");
              }}
              className="flex flex-col items-center justify-center p-3 text-brand-600 bg-brand-50 hover:bg-brand-100/80 border border-brand-100 rounded-2xl text-[10px] font-bold uppercase tracking-wider transition-all"
            >
              <span>Demo Admin/Owner</span>
              <span className="text-[8px] font-medium text-brand-400 lowercase italic font-sans">admin@antriin.com</span>
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest leading-loose">
              Tertarik mendaftarkan usaha Anda? <br />
              <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700 underline decoration-2 underline-offset-4">Daftarkan Toko UMKM Baru</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
