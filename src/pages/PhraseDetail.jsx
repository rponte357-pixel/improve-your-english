// PhraseDetail — the detail view of a single expression.
//
// Hero card (dark, ink colour, with the phrase prominently displayed),
// followed by blocks for meaning, when-to-use, mini-dialogue, origin and
// common mistake.

import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ENTRIES } from "../data/phrases";
import { CAT_ICONS } from "../data/phrases-meta";
import HighlightPhrase from "../components/HighlightPhrase";
import "../styles/phrases.css";

export default function PhraseDetail() {
  const { id } = useParams();
  const entry = ENTRIES.find((e) => String(e.id) === id);

  // Scroll to top whenever the detail page mounts.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!entry) return <Navigate to="/phrases" replace />;

  return (
    <section className="phrases phrases-detail-page">
      <Link to="/phrases" className="phrases-back-btn fu">
        ← Back to all expressions
      </Link>

      <div className="phrases-detail-hero fu fu1">
        <div className="phrases-detail-eye">
          ✦ C1 English Expression
          <span
            className={`phrases-detail-tag phrases-detail-type-tag ${entry.type.toLowerCase()}`}
          >
            {entry.type}
          </span>
        </div>
        <div className="phrases-detail-phrase">
          {entry.emoji} "{entry.phrase}"
        </div>
        <div className="phrases-detail-tags">
          <span className="phrases-detail-tag">
            {CAT_ICONS[entry.category]} {entry.category}
          </span>
          <span className="phrases-detail-tag">{entry.tone}</span>
          <span className="phrases-detail-tag">Level {entry.difficulty}</span>
        </div>
      </div>

      <div className="phrases-dblock fu fu2">
        <div className="phrases-dblock-lbl">💡 Meaning</div>
        <div className="phrases-dblock-text">{entry.meaning}</div>
      </div>

      <div className="phrases-dblock fu fu2">
        <div className="phrases-dblock-lbl">🎭 When to use it</div>
        <div className="phrases-dblock-text">{entry.when_to_use}</div>
      </div>

      <div className="phrases-dblock fu fu3">
        <div className="phrases-dblock-lbl">💬 Mini Dialogue</div>
        <div className="phrases-dialogue">
          {entry.dialogue.map((line, i) => (
            <div className="phrases-d-line" key={i}>
              <span className="phrases-d-spk">{line.speaker}:</span>
              <span className="phrases-d-txt">
                <HighlightPhrase text={line.line} phrase={entry.phrase} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="phrases-origin-block fu fu4">
        <div
          className="phrases-dblock-lbl"
          style={{ color: "var(--ph-muted)" }}
        >
          📜 Origin
        </div>
        <div className="phrases-dblock-text">{entry.origin}</div>
      </div>

      <div className="phrases-err-block fu fu5">
        <div className="phrases-err-lbl">⚠️ Common Mistake</div>
        <div className="phrases-err-txt">{entry.mistake}</div>
      </div>
    </section>
  );
}
