import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { db, initDb } from "./db.js";
import { seedIfEmpty } from "./seed.js";

const app = express();
app.use(cors());
app.use(express.json());

initDb();
seedIfEmpty();

function buildSearchWhere(searchRaw) {
  const search = (searchRaw || "").trim().toLowerCase();
  if (!search) return { where: "", params: {} };

  const tokens = search.split(/\s+/).filter(Boolean);
  const clauses = tokens.map((t, i) => `LOWER(title) LIKE :t${i}`);
  const params = Object.fromEntries(tokens.map((t, i) => [`t${i}`, `%${t}%`]));
  return { where: `WHERE ${clauses.join(" AND ")}`, params };
}

app.get("/list", (req, res) => {
  const { where, params } = buildSearchWhere(req.query.search);

  const rows = db
    .prepare(
      `
      SELECT id, title, platform, region, imageUrl, priceEur, oldPriceEur, cashbackEur, likes
      FROM games
      ${where}
      ORDER BY likes DESC, priceEur ASC
    `
    )
    .all(params);

  res.json({ count: rows.length, items: rows });
});

// ---------- Serve the React build (only if it exists) ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDist = path.join(__dirname, "../client/dist");
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));

  // SPA fallback (KEEP LAST)
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));