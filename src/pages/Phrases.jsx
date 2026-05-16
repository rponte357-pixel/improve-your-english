// Phrases — the home of the phraseup section.
//
// Hero with subtitle, expression-of-the-day card, search, filter chips,
// category tabs, and a grid of expression cards.
//
// Each card links to /phrases/:id which renders <PhraseDetail/>.

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ENTRIES } from "../data/phrases";
import {
  CAT_ICONS,
  TYPES,
  COUNTS,
} from "../data/phrases-meta";
import SubscribeForm from "../components/SubscribeForm";
import "../styles/phrases.css";

export default function Phrases() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // Expression of the Day — rotates daily by day-of-month.
  // Stable through the day even across renders.
  const today = useMemo(
    () => ENTRIES[new Date().getDate() % ENTRIES.length],
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ENTRIES.filter((e) => {
      const ms =
        !q ||
        e.phrase.toLowerCase().includes(q) ||
        e.meaning.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q);
      const mtype = typeFilter === "All" || e.type === typeFilter;
      return ms && mtype;
    });
  }, [search, typeFilter]);

  return (
    <section className="phrases">
      {/* Subtle back link, replaces the original full nav. */}
      <div className="phrases-topbar">
        <Link to="/" className="phrases-back">
          ← Back to home
        </Link>
        <div className="phrases-brand">
          Phrase<em>Up</em>
          <span className="phrases-brand-tag">C1 English</span>
        </div>
      </div>

      <div className="phrases-hero">
        <div className="phrases-eye fu">✦ Advanced English Expressions</div>
        <h1 className="phrases-h1 fu fu1">
          Speak English like<br />
          a <em>native speaker</em>
        </h1>
        <p className="phrases-sub fu fu2">
          Master {COUNTS.total} C1 idioms and proverbs with real context, mini
          dialogues, origin stories — not just definitions.
        </p>

        <Link
          to={`/phrases/${today.id}`}
          className="phrases-potd fu fu3"
          aria-label={`Expression of the day: ${today.phrase}`}
        >
          <div className="phrases-potd-lbl">✦ Expression of the Day</div>
          <div className="phrases-potd-phrase">
            {today.emoji} "{today.phrase}"
          </div>
          <div className="phrases-potd-meaning">{today.meaning}</div>
          <span className="phrases-potd-type">{today.type}</span>
        </Link>

        <SubscribeForm />

        <div className="phrases-search-wrap fu fu4">
          <span className="phrases-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search idioms, proverbs, or topics…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="phrases-filter-bar fu fu5">
          <div className="phrases-filter-row">
            <span className="phrases-f-label">Type</span>
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                className={`phrases-chip phrases-type-chip ${t.toLowerCase()}${
                  typeFilter === t ? " active" : ""
                }`}
                onClick={() => setTypeFilter(t)}
              >
                {t === "Idiom"
                  ? "💬 Idiom"
                  : t === "Proverb"
                  ? "📜 Proverb"
                  : "All"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="phrases-grid-section">
        <div className="phrases-stats-bar">
          <div className="phrases-results-count">
            Showing <strong>{filtered.length}</strong> of {ENTRIES.length}{" "}
            expressions
          </div>
          <div className="phrases-legend">
            <div className="phrases-legend-item">
              <div
                className="phrases-leg-dot"
                style={{ background: "#1D8348" }}
              />{" "}
              Idiom
            </div>
            <div className="phrases-legend-item">
              <div
                className="phrases-leg-dot"
                style={{ background: "#1A5276" }}
              />{" "}
              Proverb
            </div>
          </div>
        </div>

        <div className="phrases-grid">
          {filtered.length === 0 && (
            <div className="phrases-empty">
              <div className="phrases-empty-ico">🔍</div>
              <div className="phrases-empty-title">No expressions found</div>
              <div className="phrases-empty-text">
                Try a different keyword or reset your filters
              </div>
            </div>
          )}
          {filtered.map((p, i) => (
            <Link
              key={p.id}
              to={`/phrases/${p.id}`}
              className="phrases-card fu"
              style={{
                "--ph-card-color": p.color,
                animationDelay: `${i * 0.035}s`,
              }}
            >
              <div className="phrases-card-top">
                <span className="phrases-card-emoji">{p.emoji}</span>
                <div className="phrases-card-badges">
                  <span
                    className={`phrases-badge ${p.type.toLowerCase()}`}
                  >
                    {p.type}
                  </span>
                  <span className="phrases-badge">{p.difficulty}</span>
                </div>
              </div>
              <div className="phrases-card-phrase">"{p.phrase}"</div>
              <div className="phrases-card-meaning">{p.meaning}</div>
              <div className="phrases-card-footer">
                <span className="phrases-card-tag">
                  {CAT_ICONS[p.category]} {p.category}
                </span>
                <span className="phrases-card-tag">{p.tone}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
