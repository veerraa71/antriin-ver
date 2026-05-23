import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Clock, 
  HelpCircle, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Ticket,
  ChevronRight,
  Info
} from "lucide-react";
import { 
  getQueues, 
  QueueItem,
  syncQueuesWithServer 
} from "../../lib/queueStore";

export function CustomerQueue() {
  const [queues, setQueues] = useState<QueueItem[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    syncQueuesWithServer();
    setQueues(getQueues());

    try {
      const userStr = localStorage.getItem("antriin_current_user");
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      } else {
        // Default customer fallback
        setCurrentUser({ name: "Budi Santoso", email: "budi@email.com", role: "customer" });
      }
    } catch (e) {
      setCurrentUser({ name: "Budi Santoso", email: "budi@email.com", role: "customer" });
    }

    // Refresh every 3 seconds
    const interval = setInterval(() => {
      syncQueuesWithServer();
    }, 3000);

    const handleUpdate = () => {
      setQueues(getQueues());
    };
    window.addEventListener("queue-updated", handleUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("queue-updated", handleUpdate);
    };
  }, []);

  const myEmail = currentUser?.email || "budi@email.com";
  
  // Filter active and completed
  const myActiveTickets = queues.filter(
    q => q.email.toLowerCase() === myEmail.toLowerCase() && q.status !== "Selesai" && q.status !== "Lewat"
  );
  
  const myCompletedTickets = queues.filter(
    q => q.email.toLowerCase() === myEmail.toLowerCase() && (q.status === "Selesai" || q.status === "Lewat")
  );

  // Position index helper
  const getPositionData = (ticket: QueueItem) => {
    const prefix = ticket.id.split("-")[0];
    const sameServiceWaiting = queues.filter(q => q.id.startsWith(prefix) && q.status === "Menunggu");
    const index = sameServiceWaiting.findIndex(q => q.id === ticket.id);
    const peopleAhead = index >= 0 ? index : 0;
    const minutesLeft = peopleAhead * 5;
    return { peopleAhead, minutesLeft };
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Baner Deskripsi */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-slate-900 uppercase">Pelacakan Tiket Saya</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Pantau kemajuan antrian Anda secara detail</p>
          </div>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed max-w-4xl font-medium">
          Halaman ini menampilkan seluruh dafta tiket aktif Anda hari ini beserta monitor tahapan real-time. Anda tidak perlu berdiri mengantri secara manual di ruang tunggu, cukup pantau kemajuan estimasi pemanggilan Anda di bawah ini.
        </p>
      </div>

      {myActiveTickets.length === 0 ? (
        <div className="p-16 bg-white border border-slate-100 rounded-[2.5rem] text-center space-y-6">
          <div className="w-20 h-20 bg-slate-50 border border-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Ticket className="w-10 h-10" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="font-display font-bold text-slate-800 uppercase tracking-tight text-lg">Tidak Ada Tiket Aktif</h3>
            <p className="text-slate-450 text-xs mt-2 text-slate-400 font-semibold leading-relaxed">
              Anda belum mengambil nomor antrian aktif saat ini. Buka menu pencarian katalog layanan untuk mendaftar antrian baru di konter.
            </p>
          </div>
          <div className="pt-2">
            <a 
              href="/dashboard/customer/search" 
              className="py-4 px-8 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest transition-all inline-block shadow-lg shadow-brand-500/10 cursor-pointer"
            >
              Ambil Tiket Konter Sekarang
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* List of active tickets (timelines) */}
          <div className="lg:col-span-8 space-y-8">
            {myActiveTickets.map((ticket) => {
              const { peopleAhead, minutesLeft } = getPositionData(ticket);

              // Step state definitions
              const steps = [
                { title: "Terdaftar", desc: "Tiket dicatat di sistem", active: true, done: true },
                { 
                  title: "Dipanggil", 
                  desc: "Operator berbunyi memanggil", 
                  active: ticket.status === "Dipanggil", 
                  done: ticket.status === "Dipanggil" || ticket.status === "Dilayani" 
                },
                { 
                  title: "Pelayanan", 
                  desc: "Sedang diproses oleh petugas", 
                  active: ticket.status === "Dilayani", 
                  done: ticket.status === "Dilayani" 
                }
              ];

              return (
                <div 
                  key={ticket.id}
                  className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8"
                >
                  {/* Top card block */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-brand-600 text-white rounded-2xl flex items-center justify-center font-display font-black text-2xl shadow-lg shadow-brand-500/15">
                        {ticket.id}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg uppercase tracking-tight">{ticket.serviceType}</h3>
                        <p className="text-slate-400 text-xs font-semibold leading-relaxed">Dibuat pada {ticket.joinedAt} WIB • Untuk {ticket.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border ${
                        ticket.status === "Dipanggil"
                          ? "bg-indigo-50 border-indigo-100 text-indigo-600 animate-pulse"
                          : ticket.status === "Dilayani"
                          ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                          : "bg-amber-50 border-amber-100 text-amber-600"
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>

                  {/* Step indicators (Visual Timeline) */}
                  <div className="relative pt-2">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 bottom-1/2 w-[85%] border-t border-slate-100 -z-0 hidden md:block" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                      {steps.map((st, sI) => (
                        <div key={st.title} className="flex md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-3 bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-2xl border md:border-none border-slate-100">
                          <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${
                            st.active 
                              ? "bg-brand-600 border-brand-100 text-white text-xs font-bold scale-110 shadow-lg shadow-brand-500/20" 
                              : st.done
                              ? "bg-emerald-50 border-emerald-100 text-emerald-600 text-xs font-bold"
                              : "bg-white border-slate-150 text-slate-300 text-xs font-bold"
                          }`}>
                            {st.done && !st.active ? "✓" : sI + 1}
                          </div>
                          <div>
                            <h4 className={`text-xs font-bold uppercase tracking-tight ${st.active ? "text-brand-600" : st.done ? "text-slate-800" : "text-slate-400"}`}>
                              {st.title}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5 max-w-[130px]">{st.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Estimation footer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">ESTIMASI ANTRIAN DI DEPAN:</span>
                      <span className="font-bold text-slate-800 text-sm">
                        {peopleAhead === 0 ? "Giliran Anda Berikutnya!" : `${peopleAhead} Orang lagi`}
                      </span>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">ESTIMASI WAKTU TUNGGU:</span>
                      <span className="font-bold text-slate-800 text-sm">
                        {peopleAhead === 0 ? "Segera dipanggil!" : `Kurang lebih ${minutesLeft} menit`}
                      </span>
                    </div>
                  </div>

                  {ticket.status === "Dipanggil" && (
                    <div className="p-4 bg-indigo-50 border border-indigo-150 rounded-2xl flex items-center gap-3 text-indigo-800 text-xs font-bold animate-pulse">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      <span>Operator memanggil nomor Anda sekarang! Silakan langsung berjalan menuju ke konter loket pelayanan.</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Quick history side box */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between min-h-[300px]">
              <div>
                <h3 className="font-display font-bold text-slate-900 uppercase mb-2">Riwayat Cetak Tiket</h3>
                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-6">Aktivitas kunjungan Anda sebelumnya</p>

                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                  {myCompletedTickets.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider italic">Belum ada riwayat tercatat</p>
                    </div>
                  ) : (
                    myCompletedTickets.map((tc) => (
                      <div key={tc.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-display font-bold text-xs font-mono">
                            {tc.id}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 uppercase truncate max-w-[120px]">{tc.serviceType}</h4>
                            <span className="text-[8px] font-semibold text-slate-450 font-mono italic block text-slate-400">{tc.joinedAt} WIB</span>
                          </div>
                        </div>
                        <span className={`text-[8px] font-bold py-0.5 px-2 rounded-full border ${
                          tc.status === "Selesai" 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                            : "bg-red-50 text-red-400 border-red-100"
                        }`}>
                          {tc.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 text-center">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">PROFIL: {currentUser?.email}</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
