import { db } from "./db.js";

export function seedIfEmpty() {
  const count = db.prepare("SELECT COUNT(*) as c FROM games").get().c;
  if (count > 0) return;

  const insert = db.prepare(`
    INSERT INTO games (title, platform, region, imageUrl, priceEur, oldPriceEur, cashbackEur, likes)
    VALUES (@title, @platform, @region, @imageUrl, @priceEur, @oldPriceEur, @cashbackEur, @likes)
  `);

  const rows = [
    {
      title: "FIFA 23",
      platform: "PS5",
      region: "GLOBAL",
      imageUrl: "https://gameroom.lt/71953/fifa-23-en.jpg",
      priceEur: 19.99,
      oldPriceEur: 39.99,
      cashbackEur: 1.2,
      likes: 420,
    },
    {
      title: "Red Dead Redemption 2",
      platform: "Rockstar (PC)",
      region: "EUROPE",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
      priceEur: 17.49,
      oldPriceEur: 59.99,
      cashbackEur: 0.9,
      likes: 1337,
    },
    {
      title: "Split Fiction",
      platform: "Xbox Series X|S Key",
      region: "GLOBAL",
      imageUrl: "https://m.media-amazon.com/images/I/71Szm8cQxTL._AC_UF1000,1000_QL80_.jpg",
      priceEur: 35.15,
      oldPriceEur: 49.99,
      cashbackEur: 3.87,
      likes: 1039,
    },
    {
      title: "Split Fiction",
      platform: "Nintendo Switch 2 eShop",
      region: "EUROPE",
      imageUrl: "https://images.g2a.com/360x600/1x1x1/split-fiction-nintendo-switch-2-nintendo-eshop-key-united-kingdom-i10000509280017/040aa6a8484f4c2f9d66860c",
      priceEur: 36.25,
      oldPriceEur: null,
      cashbackEur: 3.99,
      likes: 288,
    },
    {
      title: "Split Fiction",
      platform: "Xbox Series X|S Key",
      region: "EUROPE",
      imageUrl: "https://m.media-amazon.com/images/I/71Szm8cQxTL._AC_UF1000,1000_QL80_.jpg",
      priceEur: 34.14,
      oldPriceEur: 49.99,
      cashbackEur: 3.76,
      likes: 500,
    },
  ];

  const txn = db.transaction((items) => items.forEach((r) => insert.run(r)));
  txn(rows);
}
