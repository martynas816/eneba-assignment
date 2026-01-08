import { useEffect, useMemo, useState } from "react";
import { fetchList } from "./api";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({ count: 0, items: [] });
  const [loading, setLoading] = useState(false);

  const debounced = useMemo(() => {
    let t;
    return (value, fn) => {
      clearTimeout(t);
      t = setTimeout(() => fn(value), 250);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchList(search)
      .then(setData)
      .finally(() => setLoading(false));
    // run once on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(e) {
    const v = e.target.value;
    setSearch(v);

    setLoading(true);
    debounced(v, (vv) => {
      fetchList(vv)
        .then(setData)
        .finally(() => setLoading(false));
    });
  }

  return (
    <div className="page">
      <header className="top">
      <div className="brand">
        <img
          className="brandLogo"
          src="https://static.eneba.games/branding/v2/logoFull.svg"
          alt="Eneba"
        />
      </div>

        <div className="searchWrap">
          <div className="searchField">
            <input
              className="search"
              value={search}
              onChange={onChange}
              placeholder="Search..."
            />


            {search && (
              <button
                className="clearSearch"
                type="button"
                onClick={() => {
                  setSearch("");
                  setLoading(true);
                  fetchList("")
                    .then(setData)
                    .finally(() => setLoading(false));
                }}

                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

      <div className="right">
      <div className="locale">
        <img
          className="flag"
          src="https://flagcdn.com/w20/lt.png"
          alt="LT"
        />
        <span className="lang">English</span>
        <span className="marketBlock">EU | EUR</span>
      </div>

        <div className="icons">
          <span>♡</span>
          <span>🛒</span>
          <span>👤</span>
        </div>
      </div>

      </header>

      <main className="content">
        <div className="meta">
          <div>
            Results found: <b>{data.count}</b>
          </div>
          {loading && <div className="loading">Loading…</div>}
        </div>

        <div className="grid" role="list">
          {data.items.map((g) => (
            <article className="card" key={g.id} role="listitem">
              <img className="cover" src={g.imageUrl} alt={`${g.title} cover`} />
              <div className="cardBody">
                <div className="title">{g.title}</div>
                <div className="sub">{g.platform}</div>

                <div className="tag">{g.region}</div>

                <div className="priceRow">
                  <div className="price">€{g.priceEur.toFixed(2)}</div>
                  {g.oldPriceEur != null && (
                    <div className="old">€{Number(g.oldPriceEur).toFixed(2)}</div>
                  )}
                </div>

                <div className="cashback">
                  Cashback: €{Number(g.cashbackEur).toFixed(2)}
                </div>

                <div className="likes">♡ {g.likes}</div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <a
        className="reportBtn"
        href="#"
      >
        Report a problem
      </a>
    </div>
  );
}
