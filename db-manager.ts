import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

const DEFAULTS_FILE = path.join(process.cwd(), "db.json");
const USERS_FILE = path.join(process.cwd(), "users.json");

// Define interfaces for our records
export interface QueueItem {
  id: string; // e.g. "A-01"
  name: string;
  email: string;
  serviceType: string;
  status: "Menunggu" | "Dilayani" | "Selesai" | "Dilewati";
  joinedAt: string;
}

export interface UserItem {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "customer";
}

let mysqlPool: mysql.Pool | null = null;
let isUsingMySQL = false;

// Initialize connection safely
async function initMySQL() {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;
  const port = parseInt(process.env.DB_PORT || "3306", 10);

  if (!host || !user || !database) {
    console.log("ℹ️ MySQL credentials not fully configured in .env. Falling back to local JSON Database.");
    return null;
  }

  try {
    // 1. Create a connection without database selected to make sure DB exists
    const adminConnection = await mysql.createConnection({
      host,
      user,
      password,
      port,
    });
    
    await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await adminConnection.end();

    // 2. Create the connection pool
    const pool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // 3. Setup tables
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin'
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;

    const createQueuesTable = `
      CREATE TABLE IF NOT EXISTS queues (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        serviceType VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Menunggu',
        joinedAt VARCHAR(50) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;

    await pool.query(createUsersTable);
    await pool.query(createQueuesTable);

    console.log("✅ Successfully connected to MySQL & verified tables structure.");
    isUsingMySQL = true;
    mysqlPool = pool;
    return pool;
  } catch (err: any) {
    console.warn("⚠️ Failed to connect to MySQL database server (maybe not running locally yet?):", err.message);
    console.log("ℹ️ Running local JSON Database mode for preview fallback.");
    return null;
  }
}

// Trigger initialization
initMySQL();

// Helper to interact with users
export async function getRegisteredUsers(): Promise<UserItem[]> {
  if (isUsingMySQL && mysqlPool) {
    try {
      const [rows] = await mysqlPool.query("SELECT name, email, password, role FROM users");
      return rows as UserItem[];
    } catch (err) {
      console.error("MySQL query error, fallback to JSON:", err);
    }
  }

  // Fallback
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading users file:", err);
  }
  return [
    { name: "Admin ANTRIIN", email: "admin@antriin.com", password: "password123", role: "admin" }
  ];
}

export async function registerNewUser(user: UserItem): Promise<boolean> {
  if (isUsingMySQL && mysqlPool) {
    try {
      await mysqlPool.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [user.name, user.email, user.password || "", user.role]
      );
      return true;
    } catch (err: any) {
      if (err.code === "ER_DUP_ENTRY") {
        throw new Error("Email ini sudah terdaftar di database MySQL!");
      }
      console.error("MySQL insert error:", err);
    }
  }

  // Fallback to JSON
  const users = await getRegisteredUsers();
  const exists = users.find((u) => u.email.toLowerCase() === user.email.toLowerCase());
  if (exists) {
    throw new Error("Email ini sudah terdaftar!");
  }

  users.push(user);
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing user file:", err);
    return false;
  }
}

// Helper to interact with queues
export async function getQueuesFromDb(): Promise<QueueItem[]> {
  if (isUsingMySQL && mysqlPool) {
    try {
      const [rows] = await mysqlPool.query("SELECT id, name, email, serviceType, status, joinedAt FROM queues");
      return rows as QueueItem[];
    } catch (err) {
      console.error("MySQL query error on queues, fallback to JSON:", err);
    }
  }

  // Fallback to JSON
  try {
    if (fs.existsSync(DEFAULTS_FILE)) {
      const data = fs.readFileSync(DEFAULTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading queue file:", err);
  }
  return [];
}

export async function saveQueuesToDb(queues: QueueItem[]): Promise<boolean> {
  if (isUsingMySQL && mysqlPool) {
    try {
      // For simple sync, delete all and recreate or upsert
      await mysqlPool.query("DELETE FROM queues");
      for (const item of queues) {
        await mysqlPool.query(
          "INSERT INTO queues (id, name, email, serviceType, status, joinedAt) VALUES (?, ?, ?, ?, ?, ?)",
          [item.id, item.name, item.email, item.serviceType, item.status, item.joinedAt]
        );
      }
      return true;
    } catch (err) {
      console.error("MySQL sync queues failed:", err);
    }
  }

  // Fallback to JSON
  try {
    fs.writeFileSync(DEFAULTS_FILE, JSON.stringify(queues, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing queue file:", err);
    return false;
  }
}

export function getDatabaseMode(): { mode: string; host?: string; database?: string } {
  if (isUsingMySQL) {
    return { mode: "MySQL Database Real Active", host: process.env.DB_HOST, database: process.env.DB_NAME };
  }
  return { mode: "JSON File Database Fallback (users.json & db.json)" };
}
