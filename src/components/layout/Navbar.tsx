import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Users, ChevronRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Panduan", href: "/#panduan" },
    { name: "Harga", href: "/pricing" },
  ];

  const isHome = location.pathname === "/";
  const isDarkNav = isHome && !scrolled;

  const logoColorClass = isDarkNav ? "text-white" : "text-slate-900";
  const linkColorClass = isDarkNav 
    ? "text-slate-300 hover:text-white" 
    : "text-slate-500 hover:text-brand-600";
  const loginColorClass = isDarkNav 
    ? "text-slate-300 hover:text-white" 
    : "text-slate-500 hover:text-slate-900";
  const menuBtnColorClass = isDarkNav ? "text-white" : "text-slate-900";

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[60] transition-all duration-300",
      scrolled ? "glass border-b border-slate-200 py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all shadow-lg shadow-brand-500/20">
            <Users className="text-white w-5 h-5" />
          </div>
          <span className={cn("font-display text-2xl font-bold tracking-tight uppercase transition-colors duration-350", logoColorClass)}>
            Antri<span className="text-brand-600">in</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.href} 
              className={cn("text-xs font-bold uppercase tracking-widest transition-colors duration-350", linkColorClass)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className={cn("hidden sm:block text-xs font-bold uppercase tracking-widest transition-colors duration-350", loginColorClass)}>
            Masuk
          </Link>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl shadow-slate-900/10"
            >
              Coba Gratis
            </motion.button>
          </Link>
          
          <button 
            className={cn("md:hidden transition-colors duration-350", menuBtnColorClass)}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 glass border-b border-slate-200 p-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.href} 
              className="text-sm font-bold uppercase tracking-widest text-slate-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/login" 
            className="text-sm font-bold uppercase tracking-widest text-slate-500"
            onClick={() => setMobileMenuOpen(false)}
          >
            Log In
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
