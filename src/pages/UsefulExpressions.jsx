// ─── Useful Expressions (Functional Language) ───────────────────────
// A standalone section for communicative formulae, separate from
// Vocabulary. Reuses Flashcards/Quiz/Matching/useProgress from
// Vocabulary.jsx — the only difference is the data lives in
// USEFUL_FUNCTIONS / INTERMEDIATE_FUNCTIONS instead of VOCAB_THEMES.
//
// Flow (r85):
//   1. Entry: 2 blocks side by side (Foundations A1-A2 / Intermediate B1-B2).
//   2. Block hub: the functions inside that block (12 or 10 bubbles).
//   3. FunctionView: level selector (A1/A2 or B1/B2) + sub-tabs.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  USEFUL_BLOCKS,
  getBlockFunctions,
  findFunctionById,
} from "../data/usefulExpressions";
import { Flashcards, Quiz, Matching, useProgress } from "./Vocabulary";
import { exportBlockToPdf } from "../lib/usefulExpressionsPdf";
import "../styles/vocabulary.css";

const MODES = [
  { id: "flashcards", label: "🃏 Flashcards" },
  { id: "quiz",       label: "❓ Quiz" },
  { id: "matching",   label: "🔀 Matching" },
];

export default function UsefulExpressions() {
  // Two-stage selection: first a block, then a function inside it.
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [selectedFunctionId, setSelectedFunctionId] = useState(null);
  const { progress, markLearned, isLearned } = useProgress();

  const selectedBlock = USEFUL_BLOCKS.find((b) => b.id === selectedBlockId);

  // ── Stage 1: pick a block ──
  if (!selectedBlock) {
    return (
      <section className="vocab">
        <BlocksEntry onPick={setSelectedBlockId} />
      </section>
    );
  }

  // ── Stage 2: pick a function inside the block ──
  if (!selectedFunctionId) {
    return (
      <section className="vocab">
        <FunctionsHub
          block={selectedBlock}
          onBack={() => setSelectedBlockId(null)}
          onPickFunction={setSelectedFunctionId}
        />
      </section>
    );
  }

  // ── Stage 3: a function is selected ──
  const hit = findFunctionById(selectedFunctionId);
  if (!hit) {
    setSelectedFunctionId(null);
    return null;
  }

  return (
    <section className="vocab">
      <FunctionView
        fn={hit.fn}
        block={selectedBlock}
        functionId={selectedFunctionId}
        onBack={() => setSelectedFunctionId(null)}
        progress={progress}
        markLearned={markLearned}
        isLearned={isLearned}
      />
    </section>
  );
}

// ─── Stage 1: Two-block entry ───────────────────────────────────────
function BlocksEntry({ onPick }) {
  return (
    <div className="foundations-hub">
      <Link to="/" className="foundations-back">
        ← Back to Hub
      </Link>

      <header className="foundations-header">
        <h1 className="foundations-title">Useful Expressions</h1>
        <p className="foundations-subtitle">Functional language by level</p>
      </header>

      <div className="foundations-eyebrow">CHOOSE YOUR LEVEL</div>

      <div className="ue-blocks-grid">
        {USEFUL_BLOCKS.map((block) => {
          const fnCount = block.functionIds.length;
          return (
            <button
              key={block.id}
              type="button"
              className="ue-block-card"
              onClick={() => onPick(block.id)}
              style={{
                background: `linear-gradient(135deg, ${block.gradientFrom}, ${block.gradientTo})`,
              }}
              aria-label={`${block.name} — open`}
            >
              <div className="ue-block-icon">{block.icon}</div>
              <h2 className="ue-block-name">{block.name}</h2>
              <p className="ue-block-subtitle">{block.subtitle}</p>
              <p className="ue-block-description">{block.description}</p>
              <div className="ue-block-meta">
                <span className="ue-block-meta-pill">{block.levels.join(" + ")}</span>
                <span className="ue-block-meta-pill">{fnCount} functions</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Stage 2: Functions inside the selected block ───────────────────
function FunctionsHub({ block, onBack, onPickFunction }) {
  const functions = getBlockFunctions(block);
  const [downloadError, setDownloadError] = useState(null);

  const handleDownload = () => {
    setDownloadError(null);
    const result = exportBlockToPdf({ block, functions });
    if (!result.ok) {
      setDownloadError(result.error);
    }
  };

  return (
    <div className="foundations-hub">
      <button type="button" className="foundations-back" onClick={onBack}>
        ← Back to levels
      </button>

      <header className="foundations-header">
        <h1 className="foundations-title">{block.name}</h1>
        <p className="foundations-subtitle">
          {block.functionIds.length} functions — {block.levels.join(" + ")}
        </p>
      </header>

      <div className="ue-pdf-actions">
        <button
          type="button"
          className="ue-pdf-btn"
          onClick={handleDownload}
        >
          ↓ Descargar PDF
        </button>
        {downloadError && (
          <p className="ue-pdf-error" role="alert">
            {downloadError}
          </p>
        )}
      </div>

      <div className="foundations-eyebrow">FUNCTIONAL LANGUAGE</div>

      <div className="foundations-grid">
        {block.functionIds.map((id) => {
          const fn = functions[id];
          if (!fn) return null;
          return (
            <button
              key={id}
              type="button"
              className="foundations-bubble"
              onClick={() => onPickFunction(id)}
              aria-label={`${fn.name} — open`}
            >
              <span className="foundations-bubble-icon">{fn.icon}</span>
              <span className="foundations-bubble-name">{fn.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Stage 3: FunctionView — practice the function ──────────────────
function FunctionView({ fn, block, functionId, onBack, progress, markLearned, isLearned }) {
  const [level, setLevel] = useState(block.levels[0]);
  const [mode, setMode] = useState("flashcards");

  useEffect(() => {
    setLevel(block.levels[0]);
    setMode("flashcards");
  }, [functionId, block]);

  const expressions = fn.levels[level] || [];
  const isEmpty = expressions.length === 0;

  return (
    <div className="vocab-themeview-foundations">
      <div className="vocab-blocknav">
        <button className="vocab-blocknav-back" onClick={onBack}>
          ← Back to functions
        </button>
        <div className="vocab-blocknav-title">
          <span className="vocab-blocknav-icon">{block.icon}</span>
          <span>{block.name}</span>
        </div>
        <div className="vocab-blocknav-spacer" />
      </div>

      <div className="vocab-current-theme">
        <span className="vocab-current-theme-icon">{fn.icon}</span>
        <span className="vocab-current-theme-name">{fn.name}</span>
      </div>

      {/* Compact level selector — A1/A2 or B1/B2 depending on the block */}
      <div className="vocab-levels vocab-levels-compact">
        {block.levels.map((lvl) => {
          const count = fn.levels[lvl]?.length || 0;
          return (
            <button
              key={lvl}
              className={`vocab-level vocab-level-${lvl.toLowerCase()} ${level === lvl ? "vocab-level-on" : ""}`}
              onClick={() => setLevel(lvl)}
              disabled={count === 0}
              title={count === 0 ? "No content yet" : `${count} expressions`}
            >
              <span className="vocab-level-badge">{lvl}</span>
              <span className="vocab-level-count">{count} phrases</span>
            </button>
          );
        })}
      </div>

      <div className="vocab-tabs">
        {MODES.map((m) => (
          <button
            key={m.id}
            className={`vocab-tab ${mode === m.id ? "vocab-tab-on" : ""}`}
            onClick={() => setMode(m.id)}
            disabled={isEmpty}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="vocab-content">
        {isEmpty && <UEEmpty />}
        {!isEmpty && mode === "flashcards" && (
          <Flashcards
            words={expressions}
            themeId={`ue-${functionId}`}
            level={level}
            markLearned={markLearned}
            isLearned={isLearned}
          />
        )}
        {!isEmpty && mode === "quiz" && (
          <Quiz
            words={expressions}
            themeId={`ue-${functionId}`}
            level={level}
            markLearned={markLearned}
          />
        )}
        {!isEmpty && mode === "matching" && (
          <Matching
            words={expressions}
            themeId={`ue-${functionId}`}
            level={level}
            markLearned={markLearned}
          />
        )}
      </div>
    </div>
  );
}

function UEEmpty() {
  return (
    <div className="vocab-empty">
      <p>No expressions yet for this level. Coming soon.</p>
    </div>
  );
}
