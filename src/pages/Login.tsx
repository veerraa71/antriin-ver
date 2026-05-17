import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Users, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";

export function Login() {
  const [loading, setLoading] = useState(false);

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
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Kelola dashboard Anda dengan efisien.</p>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-[460px] relative z-10">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-3xl shadow-slate-200/40 border border-slate-100">
          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Alamat Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-inner"
                  placeholder="nama@perusahaan.com"
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
                  className="block w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-inner"
                  placeholder="••••••••"
                />
              </div>
              <div className="mt-3 flex justify-end">
                <Link to="/forgot-password" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-brand-600 hover:text-brand-700">Lupa kata sandi?</Link>
              </div>
            </div>

            <button
              onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
              className="w-full flex justify-center items-center gap-3 py-5 px-6 bg-slate-900 text-white rounded-3xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all shadow-2xl shadow-slate-900/10 disabled:opacity-70"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Masuk Sekarang"}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em]">
                <span className="px-5 bg-white text-slate-300 font-bold">Akses Aman</span>
              </div>
            </div>

            <button className="w-full flex justify-center items-center gap-4 py-5 px-6 bg-white border border-slate-200 text-slate-700 rounded-3xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              Lanjutkan dengan Google
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest leading-loose">
              Belum punya akun? <br />
              <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700 underline decoration-2 underline-offset-4">Daftar Akun Gratis</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
