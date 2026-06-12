// ─── CrosswordGame — hand-designed mini crossword (r95) ──────────────
//
// Exercise data:
//   {
//     type: "crossword",
//     prompt: "Completa el crucigrama...",
//     words: [
//       { word: "WROTE", clue: "Pasado de 'write'", row: 0, col: 0, dir: "across" },
//       { word: "WENT",  clue: "Pasado de 'go'",    row: 0, col: 0, dir: "down" },
//       ...
//     ],
//     explanation: "..."
//   }
//   onAnswer(correctWordsCount, allCorrect)
//
// The grid is computed from the word definitions (positions are
// hand-designed in the data so crossings are guaranteed). Numbering
// follows crossword convention: start cells numbered in reading order.
//
// Mobile-first: one <input maxLength=1> per cell, auto-advance along
// the active direction, backspace moves back. Tapping a crossing cell
// twice toggles between across and down.

import { useState, useEffect, useMemo, useRef } from "react";

export default function CrosswordGame({ exercise, showFeedback, onAnswer }) {
  const model = useMemo(() => buildModel(exercise.words), [exercise.words]);

  const [values, setValues] = useState({});       // { "r,c": "A" }
  const [hintsUsed, setHintsUsed] = useState(0);
  const [activeDir, setActiveDir] = useState("across");
  const [activeKey, setActiveKey] = useState(null);
  const inputRefs = useRef({});

  useEffect(() => {
    setValues({});
    setHintsUsed(0);
    setActiveDir("across");
    setActiveKey(null);
  }, [exercise]);

  const filledAll = model.order.every((k) => (values[k] || "").length === 1);

  // ── Input handling ────────────────────────────────────────────────

  function handleChange(r, c, raw) {
    if (showFeedback) return;
    const ch = raw.replace(/[^a-zA-Z]/g, "").slice(-1).toUpperCase();
    const k = key(r, c);
    setValues((v) => ({ ...v, [k]: ch }));
    if (ch) focusStep(r, c, +1);
  }

  function handleKeyDown(e, r, c) {
    if (showFeedback) return;
    if (e.key === "Backspace" && !(values[key(r, c)] || "")) {
      e.preventDefault();
      focusStep(r, c, -1, true);
    }
  }

  function focusStep(r, c, step, clear = false) {
    const [dr, dc] = activeDir === "across" ? [0, step] : [step, 0];
    const k = key(r + dr, c + dc);
    if (model.cells[k]) {
      if (clear) setValues((v) => ({ ...v, [k]: "" }));
      inputRefs.current[k]?.focus();
    }
  }

  function handleFocus(r, c) {
    const k = key(r, c);
    const cell = model.cells[k];
    if (activeKey === k && cell.dirs.across && cell.dirs.down) {
      // Second tap on a crossing cell: toggle direction.
      setActiveDir((d) => (d === "across" ? "down" : "across"));
    } else if (!cell.dirs[activeDir]) {
      setActiveDir(cell.dirs.across ? "across" : "down");
    }
    setActiveKey(k);
  }

  // ── Hint / check ──────────────────────────────────────────────────

  function useHint() {
    for (const k of model.order) {
      const sol = model.cells[k].letter;
      if ((values[k] || "") !== sol) {
        setValues((v) => ({ ...v, [k]: sol }));
        setHintsUsed((h) => h + 1);
        return;
      }
    }
  }

  function check() {
    let correctWords = 0;
    for (const w of model.words) {
      const ok = w.cells.every((k) => (values[k] || "") === model.cells[k].letter);
      if (ok) correctWords++;
    }
    onAnswer(correctWords, correctWords === model.words.length);
  }

  // ── Render ────────────────────────────────────────────────────────

  const across = model.words.filter((w) => w.dir === "across").sort((a, b) => a.number - b.number);
  const down = model.words.filter((w) => w.dir === "down").sort((a, b) => a.number - b.number);

  return (
    <div className="ge-exercise cw-container">
      <div className="ge-label">CROSSWORD</div>
      <div className="ge-prompt">{exercise.prompt}</div>

      <div
        className="cw-grid"
        style={{ gridTemplateColumns: `repeat(${model.cols}, var(--cw-cell))` }}
      >
        {Array.from({ length: model.rows }).map((_, r) =>
          Array.from({ length: model.cols }).map((_, c) => {
            const k = key(r, c);
            const cell = model.cells[k];
            if (!cell) return <div key={k} className="cw-void" />;

            const val = values[k] || "";
            const wrong = showFeedback && val !== cell.letter;
            const shown = showFeedback ? cell.letter : val;
            return (
              <div key={k} className={`cw-cell ${wrong ? "cw-cell-wrong" : ""} ${showFeedback && !wrong ? "cw-cell-ok" : ""}`}>
                {model.numbers[k] && <span className="cw-num">{model.numbers[k]}</span>}
                <input
                  ref={(el) => { inputRefs.current[k] = el; }}
                  type="text"
                  inputMode="text"
                  maxLength={2}
                  value={shown}
                  onChange={(e) => handleChange(r, c, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, r, c)}
                  onFocus={() => handleFocus(r, c)}
                  disabled={showFeedback}
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck="false"
                  aria-label={`Casilla fila ${r + 1}, columna ${c + 1}`}
                />
              </div>
            );
          })
        )}
      </div>

      {/* Clues */}
      <div className="cw-clues">
        <div className="cw-clues-col">
          <div className="cw-clues-title">→ Horizontal</div>
          {across.map((w) => (
            <div key={w.number + w.dir} className="cw-clue">
              <strong>{w.number}.</strong> {w.clue} <span className="cw-clue-len">({w.word.length})</span>
            </div>
          ))}
        </div>
        <div className="cw-clues-col">
          <div className="cw-clues-title">↓ Vertical</div>
          {down.map((w) => (
            <div key={w.number + w.dir} className="cw-clue">
              <strong>{w.number}.</strong> {w.clue} <span className="cw-clue-len">({w.word.length})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {!showFeedback && (
        <div className="cw-controls">
          <button
            type="button"
            className="lw-control-btn lw-control-hint"
            onClick={useHint}
          >
            💡 Hint{hintsUsed > 0 ? ` (${hintsUsed})` : ""}
          </button>
          <button
            type="button"
            className="ge-submit-btn cw-check-btn"
            onClick={check}
            disabled={!filledAll}
          >
            Check
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Grid model ───────────────────────────────────────────────────────

function key(r, c) {
  return `${r},${c}`;
}

function buildModel(words) {
  const cells = {};

  const wordModels = words.map((w, wi) => {
    const ks = [];
    const upper = w.word.toUpperCase();
    for (let i = 0; i < upper.length; i++) {
      const r = w.dir === "across" ? w.row : w.row + i;
      const c = w.dir === "across" ? w.col + i : w.col;
      const k = key(r, c);
      if (!cells[k]) cells[k] = { letter: upper[i], r, c, dirs: {} };
      cells[k].dirs[w.dir] = true;
      ks.push(k);
    }
    return { ...w, idx: wi, cells: ks };
  });

  let rows = 0, cols = 0;
  Object.values(cells).forEach((c) => {
    rows = Math.max(rows, c.r + 1);
    cols = Math.max(cols, c.c + 1);
  });

  // Reading order of existing cells
  const order = Object.values(cells)
    .sort((a, b) => a.r - b.r || a.c - b.c)
    .map((c) => key(c.r, c.c));

  // Crossword numbering: start cells, numbered in reading order
  const startKeys = new Set(wordModels.map((w) => w.cells[0]));
  const numbers = {};
  let n = 0;
  for (const k of order) {
    if (startKeys.has(k)) {
      n++;
      numbers[k] = n;
    }
  }
  wordModels.forEach((w) => { w.number = numbers[w.cells[0]]; });

  return { cells, words: wordModels, rows, cols, order, numbers };
}
