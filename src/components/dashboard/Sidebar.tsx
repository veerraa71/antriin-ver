import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Settings2, 
  BarChart3, 
  LogOut, 
  Bell, 
  Briefcase,
  Layers
} from "lucide-react";
import { cn } from "../../lib/utils";

interface SidebarProps {
  role: "admin" | "customer";
}

export function Sidebar({ role }: SidebarProps) {
  const location = useLocation();

  const adminMenu = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "Ringkasan", path: "/dashboard/admin" },
    { icon: <Users className="w-5 h-5" />, label: "Antrian Aktif", path: "/dashboard/admin/queue" },
    { icon: <Layers className="w-5 h-5" />, label: "Kelola Layanan", path: "/dashboard/admin/services" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Statistik", path: "/dashboard/admin/stats" },
    { icon: <Settings2 className="w-5 h-5" />, label: "Pengaturan Bisnis", path: "/dashboard/admin/settings" },
  ];

  const customerMenu = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "Akun Saya", path: "/dashboard/customer" },
    { icon: <Users className="w-5 h-5" />, label: "Antrian Saya", path: "/dashboard/customer/queue" },
    { icon: <Briefcase className="w-5 h-5" />, label: "Cari Layanan", path: "/dashboard/customer/search" },
  ];

  const menu = role === "admin" ? adminMenu : customerMenu;

  return (
    <aside className="w-72 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col p-6 overflow-y-auto">
      <Link to="/" className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
          <Users className="text-white w-5 h-5" />
        </div>
        <span className="font-display text-xl font-bold tracking-tight uppercase">
          Antri<span className="text-brand-600">in</span>
        </span>
      </Link>

      <div className="space-y-1 flex-grow">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-4">Menu Utama</p>
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all group",
              location.pathname === item.path 
                ? "bg-brand-50 text-brand-600 shadow-sm" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <span className={cn(
              "transition-colors",
              location.pathname === item.path ? "text-brand-600" : "text-slate-400 group-hover:text-slate-900"
            )}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </div>

      <div className="pt-8 border-t border-slate-100 space-y-1">
        <Link
          to="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all group"
        >
          <Settings className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
          Pengaturan Akun
        </Link>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all group"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
