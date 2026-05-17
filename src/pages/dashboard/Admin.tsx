import { motion } from "motion/react";
import { 
  Users, 
  Clock, 
  TrendingUp, 
  UserCheck, 
  MoreHorizontal,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const stats = [
  { label: "Antrian Hari Ini", value: "48", trend: "+12%", icon: <Users className="w-5 h-5" />, color: "bg-brand-50 text-brand-600" },
  { label: "Rata-rata Menunggu", value: "18m", trend: "-5%", icon: <Clock className="w-5 h-5" />, color: "bg-emerald-50 text-emerald-600" },
  { label: "Pelanggan Baru", value: "12", trend: "+8%", icon: <UserCheck className="w-5 h-5" />, color: "bg-amber-50 text-amber-600" },
  { label: "Kepuasan", value: "98%", trend: "+2%", icon: <TrendingUp className="w-5 h-5" />, color: "bg-violet-50 text-violet-600" },
];

const data = [
  { name: "Sen", value: 32 },
  { name: "Sel", value: 45 },
  { name: "Rab", value: 38 },
  { name: "Kam", value: 52 },
  { name: "Jum", value: 48 },
  { name: "Sab", value: 65 },
  { name: "Min", value: 42 },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 uppercase tracking-tight">Ringkasan Bisnis</h1>
          <p className="text-slate-500 text-sm font-medium">Pantau performa bisnis Anda secara real-time.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest">
            Unduh Laporan
          </button>
          <button className="px-4 py-2 bg-brand-600 rounded-xl text-xs font-bold text-white hover:bg-brand-700 transition-all uppercase tracking-widest shadow-lg shadow-brand-500/20">
            Entri Manual
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${s.color}`}>
                {s.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                s.trend.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              }`}>
                {s.trend}
              </span>
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{s.label}</p>
            <div className="text-3xl font-display font-bold text-slate-900">{s.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-display font-bold text-slate-900 uppercase">Trafik Mingguan</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-600" />
                <span className="text-xs font-medium text-slate-500 font-mono italic">Minggu Ini</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0c8de3" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0c8de3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: "16px", 
                    border: "none", 
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                    fontWeight: "600"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0c8de3" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Queues Sidebar */}
        <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-xl shadow-slate-900/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600 rounded-full blur-[100px] opacity-10" />
          <div className="flex justify-between items-center mb-10 relative z-10">
            <h3 className="font-display font-bold text-white uppercase tracking-tight">Sesi Aktif</h3>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-6 relative z-10">
            {[
              { id: "024", name: "Rizky Fauzi", status: "Melayani", time: "5m ago" },
              { id: "025", name: "Siti Aminah", status: "Memanggil", time: "Now" },
              { id: "026", name: "Budi Santoso", status: "Menunggu", time: "12m ago" },
            ].map((q, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-4 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-display font-bold text-sm">
                    {q.id}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold group-hover:text-brand-400 transition-colors uppercase tracking-tight">{q.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono italic uppercase tracking-wider">{q.status}</p>
                  </div>
                </div>
                <button className="p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-12 py-4 bg-white text-slate-900 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-50 transition-all relative z-10">
            Dashboard Lengkap <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
