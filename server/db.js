import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB file will live in the same folder as db.js (server/)
const dbPath = path.join(__dirname, "eneba.sqlite");

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      platform TEXT NOT NULL,
      region TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      priceEur REAL NOT NULL,
      oldPriceEur REAL,
      cashbackEur REAL DEFAULT 0,
      likes INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_games_title ON games(title);
  `);
}
