export async function fetchList(search = "") {
  const q = search ? `?search=${encodeURIComponent(search)}` : "";

  const base = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
  const url = `${base}/list${q}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch list");
  return res.json();
}