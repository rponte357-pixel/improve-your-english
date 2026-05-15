// PronunciationErrors — review verbs the user has misclassified, grouped by
// the correct sound. Each entry has an audio button so they can hear it again,
// and a "clear" action to remove it from the list when they feel confident.

import { useMemo } from "react";
import { usePronunciationErrors } from "../hooks/usePronunciationErrors";
import { PRONUNCIATION_VERBS, PRONUNCIATION_RULES } from "../data/pronunciation";
import AudioButton from "../components/AudioButton";

export default function PronunciationErrors() {
  const { errors, clearError, clearAll } = usePronunciationErrors();

  // Build a lookup so we know each verb's example and file.
  const verbIndex = useMemo(() => {
    const m = new Map();
    PRONUNCIATION_VERBS.forEach((v) => m.set(v.verb, v));
    return m;
  }, []);

  const list = useMemo(() => Object.values(errors), [errors]);

  // Group by correct sound.
  const grouped = useMemo(() => {
    const out = { id: [], t: [], d: [] };
    list.forEach((e) => {
      if (out[e.correctSound]) out[e.correctSound].push(e);
    });
    Object.values(out).forEach((arr) =>
      arr.sort((a, b) => b.count - a.count)
    );
    return out;
  }, [list]);

  if (list.length === 0) {
    return (
      <div className="pron-errors-empty">
        <div className="pron-errors-empty-icon">📋</div>
        <h3>No errors yet</h3>
        <p>
          When you misclassify a verb in the Practice tab, it appears here so you can review it later. Your ear is the goal — your mistakes are the data.
        </p>
      </div>
    );
  }

  const totals = {
    id: grouped.id.length,
    t:  grouped.t.length,
    d:  grouped.d.length,
  };

  return (
    <div className="pron-errors">
      <div className="pron-errors-stats">
        <div className="pron-errors-stat">
          <div className="pron-errors-stat-number">{list.length}</div>
          <div className="pron-errors-stat-label">Verbs to review</div>
        </div>
        {["id", "t", "d"].map((cat) => (
          <div
            key={cat}
            className="pron-errors-stat"
            style={{ color: PRONUNCIATION_RULES[cat].color }}
          >
            <div className="pron-errors-stat-number">{totals[cat]}</div>
            <div className="pron-errors-stat-label">
              {PRONUNCIATION_RULES[cat].sound}
            </div>
          </div>
        ))}
      </div>

      {["id", "t", "d"].map((cat) => {
        const items = grouped[cat];
        if (items.length === 0) return null;
        const rule = PRONUNCIATION_RULES[cat];
        return (
          <section key={cat} className="pron-errors-section">
            <h3 style={{ color: rule.color }}>
              <span
                className="pron-section-badge"
                style={{ background: rule.color }}
              >
                {rule.sound}
              </span>
              {rule.title}
            </h3>
            <div className="pron-errors-list">
              {items.map((err) => {
                const data = verbIndex.get(err.verb);
                if (!data) return null;
                return (
                  <div key={err.verb} className="pron-errors-item">
                    <div className="pron-errors-item-main">
                      <div className="pron-errors-item-word">{err.verb}</div>
                      <div className="pron-errors-item-count">
                        ✗ {err.count} {err.count === 1 ? "miss" : "misses"}
                      </div>
                    </div>
                    <div className="pron-errors-item-example">
                      {data.example}
                    </div>
                    <div className="pron-errors-item-actions">
                      <AudioButton
                        src={`audio/${data.file}`}
                        label="Listen"
                        size="sm"
                      />
                      <button
                        type="button"
                        className="btn-secondary pron-errors-clear"
                        onClick={() => clearError(err.verb)}
                      >
                        ✓ I've got it now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <button
        type="button"
        className="link-btn pron-errors-clear-all"
        onClick={() => {
          if (window.confirm("Clear ALL recorded errors? This can't be undone.")) {
            clearAll();
          }
        }}
      >
        Clear all errors
      </button>
    </div>
  );
}
