import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import { 
  getQueuesFromDb, 
  saveQueuesToDb, 
  getRegisteredUsers, 
  registerNewUser, 
  getDatabaseMode 
} from "./db-manager";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Gemini Setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  app.use(express.json());

  // DB Mode Checker for Frontend
  app.get("/api/db/status", (req, res) => {
    const status = getDatabaseMode();
    res.json(status);
  });

  // API Route for Registered Users
  app.get("/api/auth/users", async (req, res) => {
    try {
      const users = await getRegisteredUsers();
      // Remove passwords for security
      const safeUsers = users.map(({ name, email, role }) => ({ name, email, role }));
      res.json(safeUsers);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route for User Registration (Server-side persistence)
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Semua form pendaftaran wajib diisi!" });
      }
      
      const success = await registerNewUser({ name, email, password, role });
      if (success) {
        res.json({ success: true, message: "Pendaftaran berhasil disimpan ke database!" });
      } else {
        res.status(500).json({ error: "Gagal menyimpan akun ke database." });
      }
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // API Route for User Login authentication
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email dan kata sandi wajib diisi!" });
      }

      const users = await getRegisteredUsers();
      // Find matching user credentials
      const matched = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!matched) {
        return res.status(401).json({ error: "Email atau kata sandi Anda salah!" });
      }

      res.json({
        success: true,
        user: {
          name: matched.name,
          email: matched.email,
          role: matched.role
        }
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route for Database Querying and Syncing
  app.get("/api/queues", async (req, res) => {
    const data = await getQueuesFromDb();
    res.json(data);
  });

  app.post("/api/queues", async (req, res) => {
    try {
      const queues = req.body;
      if (Array.isArray(queues)) {
        await saveQueuesToDb(queues);
        res.json({ success: true, count: queues.length });
      } else {
        res.status(400).json({ error: "Invalid queue data format (must be an array)" });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route for Chatbot
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    const cleanMessage = (message || "").toLowerCase();

    try {
      // Periksa apakah API key terpasang sebelum memanggil Gemini
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        throw new Error("Missing or placeholder Gemini API Key");
      }

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: "You are ANTRIIN AI, a helpful virtual assistant for a modern digital queue management platform. You assist business owners (MSMEs/UMKM) and customers. Your tone is professional, warm, and helpful. You explain that ANTRIIN helps with real-time queue estimation, online queue pass ticketing, and business analytics. Answer concisely and use friendly Indonesian.",
        },
        history: history || [],
      });

      const response = await chat.sendMessage({ message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.warn("Gemini API not available, triggering smart fallback response...", error.message);
      
      // Smart Indonesian Rule-based NLP fallback engine
      let reply = "";
      if (cleanMessage.includes("antri") || cleanMessage.includes("tunggu") || cleanMessage.includes("nomor") || cleanMessage.includes("tiket")) {
        reply = "Tentu! Di platform ANTRIIN, pelanggan dapat mengambil nomor antrian secara online di halaman 'Ambil Tiket'. Setelah memilih jenis layanan (Kasir, Pelanggan, atau Konsultasi), sistem akan menerbitkan nomor urut pintar seperti A-01 atau B-01 lengkap dengan proprosi waktu menanti.";
      } else if (cleanMessage.includes("kasir") || cleanMessage.includes("bayar") || cleanMessage.includes("transaksi")) {
        reply = "Layanan Kasir (Kode A) disiapkan untuk pelayanan transaksi kasir, pembayaran belanjaan, atau urusan administratif kilat pada konter utama gerai UMKM Anda.";
      } else if (cleanMessage.includes("cs") || cleanMessage.includes("pelanggan") || cleanMessage.includes("keluhan")) {
        reply = "Layanan Pelanggan (Kode B) ideal untuk membantu pelanggan yang memerlukan bantuan langsung, pengajuan garansi, penukaran barang, atau registrasi layanan tambahan.";
      } else if (cleanMessage.includes("konsul") || cleanMessage.includes("tanya") || cleanMessage.includes("ambil")) {
        reply = "Layanan Konsultasi (Kode C) melayani temu langsung tatap muka dengan staff teknis atau sesi pengambilan barang belanjaan yang membutuhkan waktu verifikasi lebih lama.";
      } else if (cleanMessage.includes("harga") || cleanMessage.includes("biaya") || cleanMessage.includes("gratis") || cleanMessage.includes("bayar")) {
        reply = "Kabar baiknya, ANTRIIN 100% gratis untuk UMKM! Kami berkomitmen mendukung percepatan digitalisasi bisnis mikro kecil agar dapat memiliki sistem tata kelola antrian modern layaknya korporasi besar.";
      } else if (cleanMessage.includes("suara") || cleanMessage.includes("bunyi") || cleanMessage.includes("panggil") || cleanMessage.includes("audio")) {
        reply = "Sistem ANTRIIN dilengkapi fitur pemanggil suara (TTS/Text-to-Speech) Bahasa Indonesia otomatis. Ketika admin mengklik 'Panggil Berikutnya' di panel kontrol, komputer Anda akan otomatis menyebutkan nomor antrian tersebut!";
      } else if (cleanMessage.includes("fitur") || cleanMessage.includes("kelebihan") || cleanMessage.includes("unggulan")) {
        reply = "Fitur unggulan ANTRIIN meliputi: pembagian nomor antrian otomatis multi-layanan, integrasi suara panggilan modern, visualisasi analitik mingguan (Recharts), sinkronisasi data instan, dan asisten pemandu AI.";
      } else if (cleanMessage.includes("halo") || cleanMessage.includes("hai") || cleanMessage.includes("pagi") || cleanMessage.includes("siang") || cleanMessage.includes("sore")) {
        reply = "Halo! Saya ANTRIIN AI. Ada yang bisa saya bantu terkait sirkulasi antrian toko UMKM Anda hari ini? Silakan tanya mengenai cara mengambil nomor, fitur panggilan suara, ataupun panel statistik.";
      } else {
        reply = "Saya adalah asisten AI dari ANTRIIN. Anda dapat menanyakan seputar sistem antrian online UMKM, cara mendaftarkan antrean, pengaturan loket layanan, atau fitur pengeras suara pemanggil antrian otomatis bergaya modern.";
      }
      
      res.json({ text: reply });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
