export async function fetchList(search = "") {
  const q = search ? `?search=${encodeURIComponent(search)}` : "";

  const base = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
  const url = `${base}/list${q}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch list");
  return res.json();
}



// const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// export async function fetchList(search = "") {
//   const q = search ? `?search=${encodeURIComponent(search)}` : "";
//   const url = `${API_BASE}/list${q}`; // if API_BASE is "", this becomes "/list..."
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("Failed to fetch list");
//   return res.json();
// }
