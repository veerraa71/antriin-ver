import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

interface Message {
  role: "user" | "model";
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Halo! Saya Antriin AI. Ada yang bisa saya bantu dengan antrian Anda hari ini?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMsg,
          history: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }))
        }),
      });
      
      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: "model", text: data.text }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: "model", text: "Maaf, terjadi kesalahan. Silakan coba lagi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-6 w-[380px] md:w-[420px] h-[600px] glass-dark rounded-[2.5rem] overflow-hidden shadow-3xl flex flex-col border border-white/10"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm uppercase tracking-tight">Antriin AI</h4>
                  <p className="text-[10px] text-brand-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" /> Agen Cerdas
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2.5 rounded-xl transition-all"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth bg-slate-950"
            >
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "flex items-start gap-3 max-w-[90%]",
                  m.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}>
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                    m.role === "user" ? "bg-slate-800 text-slate-400" : "bg-brand-600 text-white"
                  )}>
                    {m.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-3xl text-sm leading-relaxed font-medium",
                    m.role === "user" 
                      ? "bg-slate-900 text-slate-200 rounded-tr-none border border-slate-800" 
                      : "bg-white text-slate-900 rounded-tl-none shadow-xl border border-slate-100"
                  )}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-500" /> Sedang Berpikir...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-slate-900">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Tanya apa saja..."
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-2xl py-4 px-6 pr-14 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all shadow-inner"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2.5 top-2 p-2.5 h-10 w-10 bg-brand-600 text-white rounded-xl flex items-center justify-center hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 disabled:opacity-50"
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-3xl shadow-slate-900/30 relative group border border-white/10"
      >
        <span className="absolute -top-14 right-0 bg-white text-slate-900 text-[10px] font-bold px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-slate-100 uppercase tracking-widest">
          Butuh Bantuan?
        </span>
        {isOpen ? <X className="w-8 h-8 text-brand-400" /> : <MessageSquare className="w-8 h-8 text-brand-400" />}
      </motion.button>
    </div>
  );
}
