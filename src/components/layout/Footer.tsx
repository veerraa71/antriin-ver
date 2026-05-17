import { Link } from "react-router-dom";
import { Users, Instagram, Twitter, Mail, Phone, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
              <Users className="text-white w-5 h-5" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight uppercase">
              Antri<span className="text-brand-600">in</span>
            </span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
            Digitalisasi pengalaman antrian untuk UMKM modern. Meningkatkan standar layanan dan kepuasan pelanggan di seluruh negeri.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all shadow-sm">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all shadow-sm">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all shadow-sm">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-slate-900 mb-8 uppercase tracking-widest text-[10px]">Produk</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
            <li><Link to="/gallery" className="text-slate-400 hover:text-brand-600 transition-colors">Galeri</Link></li>
            <li><Link to="/pricing" className="text-slate-400 hover:text-brand-600 transition-colors">Harga</Link></li>
            <li><Link to="/demo" className="text-slate-400 hover:text-brand-600 transition-colors">Demo Langsung</Link></li>
            <li><Link to="/about" className="text-slate-400 hover:text-brand-600 transition-colors">Tentang Kami</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-slate-900 mb-8 uppercase tracking-widest text-[10px]">Bantuan</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
            <li><Link to="/faq" className="text-slate-400 hover:text-brand-600 transition-colors">Pusat Bantuan</Link></li>
            <li><Link to="/contact" className="text-slate-400 hover:text-brand-600 transition-colors">Hubungi Kami</Link></li>
            <li><Link to="/terms" className="text-slate-400 hover:text-brand-600 transition-colors">Syarat & Ketentuan</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-slate-900 mb-8 uppercase tracking-widest text-[10px]">Kontak</h4>
          <ul className="space-y-5 text-sm text-slate-600">
            <li className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-brand-600" />
              </div>
              <span className="font-medium">kontak@antriin.com</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-brand-600" />
              </div>
              <span className="font-medium">082256897701</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
        <p>© 2024 PLATFORM ANTRIIN. SELURUH HAK CIPTA DILINDUNGI.</p>
      </div>
    </footer>
  );
}
