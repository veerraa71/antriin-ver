export interface QueueItem {
  id: string; // "A-01", "B-02", etc
  name: string;
  email: string;
  serviceType: "Layanan Kasir" | "Layanan Pelanggan" | "Layanan Konsultasi";
  status: "Menunggu" | "Dipanggil" | "Dilayani" | "Selesai" | "Lewat";
  joinedAt: string; // HH:MM
  calledAt?: string;
  servedAt?: string;
}

// Seeding awal jika localStorage kosong
const DEFAULT_QUEUES: QueueItem[] = [
  { id: "A-01", name: "Rizky Fauzi", email: "rizky@gmail.com", serviceType: "Layanan Kasir", status: "Selesai", joinedAt: "13:45" },
  { id: "B-01", name: "Siti Aminah", email: "siti@gmail.com", serviceType: "Layanan Pelanggan", status: "Dilayani", joinedAt: "14:10" },
  { id: "C-01", name: "Budi Santoso", email: "budi@email.com", serviceType: "Layanan Konsultasi", status: "Menunggu", joinedAt: "14:12" },
  { id: "A-02", name: "Dewi Lestari", email: "dewi@gmail.com", serviceType: "Layanan Kasir", status: "Menunggu", joinedAt: "14:15" },
  { id: "B-02", name: "Ahmad Subarjo", email: "ahmad@gmail.com", serviceType: "Layanan Pelanggan", status: "Menunggu", joinedAt: "14:22" }
];

// Sinkronisasi background dari server database ke localStorage secara asinkron
export async function syncQueuesWithServer() {
  try {
    const res = await fetch("/api/queues");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        localStorage.setItem("antrian_list", JSON.stringify(data));
        window.dispatchEvent(new Event("queue-updated"));
      }
    }
  } catch (err) {
    console.warn("Server sync currently unavailable, using offline local storage fallback.", err);
  }
}

export function getQueues(): QueueItem[] {
  const data = localStorage.getItem("antrian_list");
  if (!data) {
    localStorage.setItem("antrian_list", JSON.stringify(DEFAULT_QUEUES));
    // Kirim pancingan data awal ke server database file setelah rendering pertama
    saveQueues(DEFAULT_QUEUES);
    return DEFAULT_QUEUES;
  }
  return JSON.parse(data);
}

export function saveQueues(queues: QueueItem[]) {
  localStorage.setItem("antrian_list", JSON.stringify(queues));
  
  // Memicu event kustom lokal agar komponen ter-update instan
  window.dispatchEvent(new Event("queue-updated"));

  // Kirim data secara asinkron ke server database file untuk persistensi permanen
  fetch("/api/queues", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(queues),
  }).catch(err => {
    console.error("Failed to commit queue storage to server db.json:", err);
  });
}

export function addQueue(name: string, email: string, serviceType: "Layanan Kasir" | "Layanan Pelanggan" | "Layanan Konsultasi"): QueueItem {
  const queues = getQueues();
  
  // Hitung nomor urut berdasarkan tipe layanan
  let prefix = "";
  if (serviceType === "Layanan Kasir") prefix = "A";
  else if (serviceType === "Layanan Pelanggan") prefix = "B";
  else prefix = "C";

  const sameServiceQueues = queues.filter(q => q.id.startsWith(prefix));
  let nextNum = 1;
  if (sameServiceQueues.length > 0) {
    const nums = sameServiceQueues.map(q => parseInt(q.id.split("-")[1], 10)).filter(n => !isNaN(n));
    if (nums.length > 0) {
      nextNum = Math.max(...nums) + 1;
    }
  }

  const paddedNum = String(nextNum).padStart(2, "0");
  const newId = `${prefix}-${paddedNum}`;

  const now = new Date();
  const joinedAt = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const newItem: QueueItem = {
    id: newId,
    name,
    email,
    serviceType,
    status: "Menunggu",
    joinedAt
  };

  queues.push(newItem);
  saveQueues(queues);
  return newItem;
}

export function updateQueueStatus(id: string, status: QueueItem["status"]): QueueItem[] {
  const queues = getQueues();
  const updated = queues.map(q => {
    if (q.id === id) {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      
      if (status === "Dipanggil") {
        return { ...q, status, calledAt: timeStr };
      } else if (status === "Dilayani") {
        return { ...q, status, servedAt: timeStr };
      }
      return { ...q, status };
    }
    return q;
  });
  saveQueues(updated);
  return updated;
}

// Fungsi Text-To-Speech untuk interaktivitas maksimal
export function speakQueueNumber(queueId: string, serviceType: string) {
  if (!("speechSynthesis" in window)) return;
  
  // Menghentikan ucapan sebelumnya jika ada
  window.speechSynthesis.cancel();
  
  const formattedId = queueId.split("").join(" "); // Mengubah "A-01" menjadi "A   0 1" agar dieja lebih lambat
  const text = `Nomor Antrian, ${formattedId}, Silakan menuju ke, ${serviceType}`;
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID"; // Bahasa Indonesia asli
  utterance.rate = 0.85; // Sedikit lebih lambat agar terdengar sopan dan jelas
  utterance.pitch = 1.0;
  
  // Mencoba mencari voice Bahasa Indonesia jika ada
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find(voice => voice.lang.includes("id") || voice.lang.includes("ID"));
  if (idVoice) {
    utterance.voice = idVoice;
  }
  
  window.speechSynthesis.speak(utterance);
}
