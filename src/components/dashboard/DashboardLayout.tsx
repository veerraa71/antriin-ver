import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Bell, Search, User } from "lucide-react";
import { Chatbot } from "../Chatbot";
import { useState, useEffect } from "react";

interface DashboardLayoutProps {
  role: "admin" | "customer";
}

export function DashboardLayout({ role }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("antriin_current_user");
      if (userStr) {
        const userObj = JSON.parse(userStr);
        setUserName(userObj.name);
      } else {
        // Fallback default jika tidak ada session untuk mencegah blank screen
        setUserName(role === "admin" ? "Admin ANTRIIN" : "Budi Santoso");
      }
    } catch (e) {
      setUserName(role === "admin" ? "Admin ANTRIIN" : "Budi Santoso");
    }
  }, [role]);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar role={role} />
      <div className="flex-grow flex flex-col">
        {/* Dashboard Header */}
        <header className="h-20 border-b border-slate-200 bg-white sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="max-w-md w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari fitur, antrian, atau laporan..." 
              className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand-500 transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-500">
              <Bell className="w-5 h-5 shadow-sm" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-brand-50 transition-colors border border-slate-200">
                <User className="w-5 h-5 text-slate-500 group-hover:text-brand-600 transition-colors" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-tight uppercase tracking-tight">{userName}</p>
                <p className="text-[10px] font-bold text-slate-400 leading-tight uppercase tracking-widest">{role === "admin" ? "Pemilik Bisnis" : "Pelanggan"}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8 pb-24">
          <Outlet />
        </main>
      </div>
      <Chatbot />
    </div>
  );
}
