// PronunciationExplorer — browse all 100 verbs grouped by sound category.
// Each card plays its audio when clicked and shows the example sentence.

import { useMemo, useState } from "react";
import { PRONUNCIATION_VERBS, PRONUNCIATION_RULES } from "../data/pronunciation";
import AudioButton from "../components/AudioButton";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "id",  label: "/ɪd/" },
  { key: "t",   label: "/t/"  },
  { key: "d",   label: "/d/"  },
];

export default function PronunciationExplorer() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  // Filter + search applied together.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRONUNCIATION_VERBS.filter((v) => {
      if (filter !== "all" && v.sound !== filter) return false;
      if (q && !v.verb.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filter, query]);

  // Group by sound for display, preserving order within each.
  const grouped = useMemo(() => {
    const out = { id: [], t: [], d: [] };
    filtered.forEach((v) => out[v.sound].push(v));
    return out;
  }, [filtered]);

  return (
    <div className="pron-explorer">
      <p className="pron-intro">
        Tap any verb to hear its pronunciation. Hover (or tap on mobile) to read an example sentence.
      </p>

      <div className="pron-controls">
        <input
          type="text"
          className="pron-search"
          placeholder="🔍 Search a verb…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="pron-filters">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`pron-filter ${filter === c.key ? "active" : ""}`}
              onClick={() => setFilter(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">No verbs match that search.</p>
      )}

      {["id", "t", "d"].map((cat) => {
        const verbs = grouped[cat];
        if (verbs.length === 0) return null;
        const rule = PRONUNCIATION_RULES[cat];
        return (
          <section key={cat} className="pron-section">
            <h3
              className="pron-section-title"
              style={{ color: rule.color }}
            >
              <span
                className="pron-section-badge"
                style={{ background: rule.color }}
              >
                {rule.sound}
              </span>
              {rule.title}
              <span className="pron-section-count">{verbs.length} verbs</span>
            </h3>
            <div className="pron-grid">
              {verbs.map((v) => (
                <VerbCard key={v.verb} verb={v} color={rule.color} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function VerbCard({ verb, color }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`pron-card ${expanded ? "expanded" : ""}`}
      style={{ "--card-accent": color }}
    >
      <div className="pron-card-main">
        <button
          type="button"
          className="pron-card-toggle"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          aria-label={`${expanded ? "Hide" : "Show"} example for ${verb.verb}`}
        >
          <span className="pron-card-word">{verb.verb}</span>
          <span className="pron-card-chevron">{expanded ? "▾" : "▸"}</span>
        </button>
        <AudioButton
          src={`audio/${verb.file}`}
          label=""
          size="sm"
        />
      </div>
      {expanded && (
        <div className="pron-card-example">{verb.example}</div>
      )}
    </div>
  );
}
