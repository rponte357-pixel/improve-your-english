// ─── Foundations Grammar (A1/A2) ────────────────────────────────────
// Flow (r91):
//   1. Hub: 17 A1 bubbles + 21 A2 bubbles (greyed out if not available).
//   2. UnitView: pedagogical content (concept / form / uses / examples
//      / warning) + tabs for Practice (exercises).

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GRAMMAR_CURRICULUM,
  FOUNDATIONS_GRAMMAR_BLOCK,
  isUnitAvailable,
  getUnit,
} from "../data/grammar";
import GrammarExercises from "./GrammarExercises";
import "../styles/vocabulary.css";

export default function FoundationsGrammar() {
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  if (!selectedUnitId) {
    return (
      <section className="vocab">
        <UnitsHub onPick={setSelectedUnitId} />
      </section>
    );
  }

  const unit = getUnit(selectedUnitId);
  if (!unit) {
    // Should not happen, but defensive: go back to hub.
    setSelectedUnitId(null);
    return null;
  }

  return (
    <section className="vocab">
      <UnitView unit={unit} onBack={() => setSelectedUnitId(null)} />
    </section>
  );
}

// ─── Hub: all 38 units grouped by level ─────────────────────────────

function UnitsHub({ onPick }) {
  return (
    <div className="foundations-hub">
      <Link to="/grammar" className="foundations-back">
        ← Back to Grammar
      </Link>

      <header className="foundations-header">
        <h1 className="foundations-title">{FOUNDATIONS_GRAMMAR_BLOCK.name}</h1>
        <p className="foundations-subtitle">{FOUNDATIONS_GRAMMAR_BLOCK.subtitle}</p>
      </header>

      <div className="grammar-level-section">
        <h2 className="grammar-level-title">A1 — Beginner</h2>
        <div className="foundations-grid">
          {GRAMMAR_CURRICULUM.A1.map((u) => (
            <UnitBubble key={u.id} unit={u} onPick={onPick} />
          ))}
        </div>
      </div>

      <div className="grammar-level-section">
        <h2 className="grammar-level-title">A2 — Elementary</h2>
        <div className="foundations-grid">
          {GRAMMAR_CURRICULUM.A2.map((u) => (
            <UnitBubble key={u.id} unit={u} onPick={onPick} />
          ))}
        </div>
      </div>
    </div>
  );
}

function UnitBubble({ unit, onPick }) {
  const available = isUnitAvailable(unit.id);
  return (
    <button
      type="button"
      className={`foundations-bubble ${!available ? "foundations-bubble-locked" : ""}`}
      onClick={() => available && onPick(unit.id)}
      aria-label={`${unit.name} — ${available ? "open" : "coming soon"}`}
      title={available ? unit.name_es : "Coming soon"}
      disabled={!available}
    >
      <span className="foundations-bubble-icon">{unit.icon}</span>
      <span className="foundations-bubble-name">{unit.name}</span>
      {!available && <span className="foundations-bubble-lock">🔒</span>}
    </button>
  );
}

// ─── UnitView: the lesson + exercises ───────────────────────────────

function UnitView({ unit, onBack }) {
  const [tab, setTab] = useState("lesson"); // 'lesson' | 'practice'

  return (
    <div className="vocab-themeview-foundations">
      <div className="vocab-blocknav">
        <button className="vocab-blocknav-back" onClick={onBack}>
          ← Back to units
        </button>
        <div className="vocab-blocknav-title">
          <span className="vocab-blocknav-icon">📚</span>
          <span>Foundations Grammar</span>
        </div>
        <div className="vocab-blocknav-spacer" />
      </div>

      <div className="vocab-current-theme">
        <span className="vocab-current-theme-icon">{unit.icon}</span>
        <span className="vocab-current-theme-name">{unit.name}</span>
        <span className="grammar-unit-level-badge">{unit.level}</span>
      </div>

      <div className="vocab-tabs">
        <button
          className={`vocab-tab ${tab === "lesson" ? "vocab-tab-on" : ""}`}
          onClick={() => setTab("lesson")}
        >
          📖 Lesson
        </button>
        <button
          className={`vocab-tab ${tab === "practice" ? "vocab-tab-on" : ""}`}
          onClick={() => setTab("practice")}
        >
          ✏️ Practice ({unit.exercises.length})
        </button>
      </div>

      <div className="vocab-content">
        {tab === "lesson" && <Lesson unit={unit} />}
        {tab === "practice" && (
          <GrammarExercises exercises={unit.exercises} unitName={unit.name} />
        )}
      </div>
    </div>
  );
}

// ─── Lesson: concept / form / uses / examples / warning ─────────────

function Lesson({ unit }) {
  return (
    <div className="grammar-lesson">
      {/* Concept */}
      <section className="grammar-section">
        <h3 className="grammar-section-title">💡 Concepto</h3>
        <p className="grammar-concept">{unit.concept}</p>
      </section>

      {/* Form */}
      {unit.form && (
        <section className="grammar-section">
          <h3 className="grammar-section-title">📐 Forma</h3>
          <h4 className="grammar-form-title">{unit.form.title}</h4>
          <FormTable form={unit.form} />
          {unit.form.shortAnswers && (
            <>
              <h4 className="grammar-form-subtitle">Respuestas cortas</h4>
              <ShortAnswersTable answers={unit.form.shortAnswers} />
            </>
          )}
        </section>
      )}

      {/* Uses */}
      {unit.uses && unit.uses.length > 0 && (
        <section className="grammar-section">
          <h3 className="grammar-section-title">🎯 Usos</h3>
          <ul className="grammar-uses">
            {unit.uses.map((use, i) => (
              <li key={i} className="grammar-use">
                <strong>{use.title}.</strong>{" "}
                <span className="grammar-use-note">{use.note}</span>
                <div className="grammar-use-example">{use.example}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Examples */}
      {unit.examples && unit.examples.length > 0 && (
        <section className="grammar-section">
          <h3 className="grammar-section-title">📝 Ejemplos</h3>
          <ul className="grammar-examples">
            {unit.examples.map((ex, i) => (
              <li key={i} className="grammar-example">
                <span className="grammar-example-en">{ex.en}</span>
                <span className="grammar-example-es">{ex.es}</span>
                {ex.note && <span className="grammar-example-note">{ex.note}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Warning */}
      {unit.warning && (
        <section className="grammar-section grammar-section-warning">
          <h3 className="grammar-section-title">⚠️ {unit.warning.title}</h3>
          <ul className="grammar-warnings">
            {unit.warning.items.map((w, i) => (
              <li key={i} className="grammar-warning-item">
                <div className="grammar-warning-wrong">
                  ✗ <span>{w.wrong}</span>
                </div>
                <div className="grammar-warning-right">
                  ✓ <span>{w.right}</span>
                </div>
                <div className="grammar-warning-reason">{w.reason}</div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

// ─── Form table (afirmativa/negativa/interrogativa or similar) ──────

function FormTable({ form }) {
  const rows = form.table || [];
  if (rows.length === 0) return null;

  // Detect column keys from the first row (excluding "person" if present).
  const keys = Object.keys(rows[0]);

  return (
    <div className="grammar-table-wrapper">
      <table className="grammar-table">
        <thead>
          <tr>
            {keys.map(k => <th key={k}>{prettyKey(k)}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {keys.map(k => <td key={k}>{row[k]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ShortAnswersTable({ answers }) {
  return (
    <div className="grammar-table-wrapper">
      <table className="grammar-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>✓ Yes</th>
            <th>✗ No</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((a, i) => (
            <tr key={i}>
              <td>{a.question}</td>
              <td>{a.positive}</td>
              <td>{a.negative}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function prettyKey(k) {
  // Map common keys to nice labels
  const map = {
    person: "Person",
    affirmative: "Afirmativa",
    negative: "Negativa",
    interrogative: "Interrogativa",
    pronoun: "Pronombre",
    adjective: "Adjetivo",
    spanish: "Español",
    example: "Ejemplo",
  };
  return map[k] || k;
}
