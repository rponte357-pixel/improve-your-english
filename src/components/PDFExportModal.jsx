// PDFExportModal — selection UI for "Export to PDF".
//
// Renders as:
//   • Desktop  → centered floating modal
//   • Mobile   → bottom sheet sliding from the bottom (full width, scroll)
//
// Same JSX in both cases; the visual difference comes from CSS media
// queries. No conditional rendering based on viewport — keeps the
// component testable and avoids hydration issues.
//
// State owned here:
//   • Which themes, which levels, which personal lists are selected
//   • Which blocks are expanded (▸/▾) — for the collapsible UI
//   • Which format is chosen (cheat | reference)
//   • Whether to mark learned words
//
// On Export → calls exportToPdf() from pdfRenderer.js which opens a
// new window and triggers print dialog. The modal closes on success.

import { useEffect, useMemo, useState } from "react";
import { useCustomLists } from "../data/customLists";
import { exportToPdf } from "../data/pdfRenderer";

const LEVELS = ["B1", "B2", "C1", "C2"];
const STORAGE_KEY_FORMAT = "iye:pdf:format";

export default function PDFExportModal({
  open,
  onClose,
  blocks,
  vocabThemes,
  isLearned,
}) {
  const { lists } = useCustomLists();

  // Selection state. Default: all themes + all non-empty levels +
  // no personal lists selected. The user opts INTO personal lists
  // explicitly to avoid surprises.
  const [themeSel, setThemeSel] = useState(() => initThemeSelection(blocks));
  const [levelSel, setLevelSel] = useState(() => initLevelSelection());
  const [listSel,  setListSel]  = useState({});

  // Which blocks are expanded. Default: all collapsed (mobile-friendly).
  const [expanded, setExpanded] = useState({});

  // Format: cheat-sheet by default, but remember last choice.
  const [format, setFormat] = useState(() => readStoredFormat());
  const [markLearned, setMarkLearned] = useState(true);

  // Feedback state
  const [exportError, setExportError] = useState(null);
  const [exporting, setExporting]     = useState(false);

  // Reset state when modal opens, so a fresh open starts clean.
  useEffect(() => {
    if (open) {
      setExportError(null);
      setExporting(false);
    }
  }, [open]);

  // Persist format choice across sessions for convenience.
  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY_FORMAT, format); } catch { /* ignore */ }
  }, [format]);

  // ─── Derived: number of words in current selection ───────────────
  const stats = useMemo(() => {
    let sections = 0;
    let words    = 0;

    for (const blockId of Object.keys(blocks)) {
      const block = blocks[blockId];
      for (const themeId of block.themeIds) {
        if (!themeSel[themeId]) continue;
        const theme = vocabThemes[themeId];
        if (!theme) continue;
        for (const lvl of LEVELS) {
          if (!levelSel[lvl]) continue;
          const arr = theme.levels?.[lvl] || [];
          if (arr.length === 0) continue;
          sections += 1;
          words    += arr.length;
        }
      }
    }
    for (const l of lists) {
      if (!listSel[l.id]) continue;
      sections += 1;
      words    += (l.words || []).length;
    }

    // Rough page estimate: cheat ≈ 60-80 words/page in 3 columns,
    // reference ≈ 18-22 entries/page in 1 column.
    const wordsPerPage = format === "cheat" ? 70 : 20;
    const pages = Math.max(1, Math.ceil(words / wordsPerPage));

    return { sections, words, pages };
  }, [themeSel, levelSel, listSel, lists, blocks, vocabThemes, format]);

  // ─── Toggle helpers ──────────────────────────────────────────────
  const toggleTheme = (themeId) =>
    setThemeSel((s) => ({ ...s, [themeId]: !s[themeId] }));

  const toggleBlock = (blockId, selectAll) => {
    const block = blocks[blockId];
    if (!block) return;
    setThemeSel((s) => {
      const out = { ...s };
      for (const t of block.themeIds) out[t] = selectAll;
      return out;
    });
  };

  const toggleLevel = (lvl) =>
    setLevelSel((s) => ({ ...s, [lvl]: !s[lvl] }));

  const toggleList = (id) =>
    setListSel((s) => ({ ...s, [id]: !s[id] }));

  const toggleExpand = (blockId) =>
    setExpanded((s) => ({ ...s, [blockId]: !s[blockId] }));

  const setAllThemes = (on) => {
    const next = {};
    for (const block of Object.values(blocks)) {
      for (const t of block.themeIds) next[t] = on;
    }
    setThemeSel(next);
  };
  const setAllLists = (on) => {
    const next = {};
    for (const l of lists) next[l.id] = on;
    setListSel(next);
  };

  // ─── Export action ───────────────────────────────────────────────
  const doExport = () => {
    setExportError(null);
    setExporting(true);
    const result = exportToPdf({
      selection: { themes: themeSel, levels: levelSel, lists: listSel },
      vocabThemes,
      blocks,
      customLists: lists,
      isLearned,
      format,
      markLearned,
    });
    setExporting(false);
    if (!result.ok) {
      setExportError(result.error);
      return;
    }
    // Close the modal after a short delay so the user sees that the
    // print window opened. If they want to export again, reopening
    // the modal preserves their selection (state is reused).
    setTimeout(() => onClose(), 400);
  };

  if (!open) return null;

  // Block descriptors (for rendering): id, name, themes selected count
  const blockRows = Object.values(blocks).map((b) => {
    const total = b.themeIds.length;
    const selected = b.themeIds.filter((t) => themeSel[t]).length;
    return { ...b, total, selected, allOn: selected === total, anyOn: selected > 0 };
  });

  const totalLists       = lists.length;
  const listsSelected    = lists.filter((l) => listSel[l.id]).length;
  const canExport        = stats.sections > 0;

  return (
    <div
      className="vocab-pdf-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Export to PDF"
    >
      <div className="vocab-pdf-modal">
        <div className="vocab-pdf-handle" aria-hidden="true" />

        <div className="vocab-pdf-head">
          <h2 className="vocab-pdf-title">⬇ Export to PDF</h2>
          <button
            type="button"
            className="vocab-pdf-x"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="vocab-pdf-body">

          {/* ─── Curated themes ─── */}
          <div className="vocab-pdf-sec-h">
            <span>VOCABULARY LAB THEMES</span>
            <span className="vocab-pdf-sec-actions">
              <button type="button" onClick={() => setAllThemes(true)}>Select all</button>
              <span className="vocab-pdf-sep">·</span>
              <button type="button" onClick={() => setAllThemes(false)}>Deselect all</button>
            </span>
          </div>

          {blockRows.map((block) => (
            <div key={block.id} className="vocab-pdf-block">
              <button
                type="button"
                className="vocab-pdf-block-row"
                onClick={() => toggleExpand(block.id)}
                aria-expanded={!!expanded[block.id]}
              >
                <span className="vocab-pdf-block-icon" aria-hidden="true">
                  {block.icon || "•"}
                </span>
                <span className="vocab-pdf-block-name">{block.name}</span>
                <span className="vocab-pdf-block-meta">
                  {block.selected}/{block.total}
                </span>
                <span className="vocab-pdf-chevron" aria-hidden="true">
                  {expanded[block.id] ? "▾" : "▸"}
                </span>
              </button>

              {expanded[block.id] && (
                <div className="vocab-pdf-block-themes">
                  <div className="vocab-pdf-block-controls">
                    <button
                      type="button"
                      className="vocab-pdf-mini-link"
                      onClick={() => toggleBlock(block.id, true)}
                    >
                      Select all
                    </button>
                    <span className="vocab-pdf-sep">·</span>
                    <button
                      type="button"
                      className="vocab-pdf-mini-link"
                      onClick={() => toggleBlock(block.id, false)}
                    >
                      Deselect all
                    </button>
                  </div>
                  {block.themeIds.map((tId) => {
                    const theme = vocabThemes[tId];
                    if (!theme) return null;
                    const count = countThemeWords(theme, levelSel);
                    const on = !!themeSel[tId];
                    return (
                      <label
                        key={tId}
                        className={`vocab-pdf-opt-row ${on ? "vocab-pdf-opt-row-on" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggleTheme(tId)}
                        />
                        <span className="vocab-pdf-opt-label">
                          {theme.icon ? `${theme.icon} ` : ""}
                          {theme.name}
                        </span>
                        <span className="vocab-pdf-opt-meta">{count} words</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* ─── Levels filter ─── */}
          <div className="vocab-pdf-sec-h">
            <span>LEVELS TO INCLUDE</span>
          </div>
          <div className="vocab-pdf-level-row">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                className={`vocab-pdf-level-chip ${levelSel[lvl] ? "vocab-pdf-level-chip-on" : ""}`}
                onClick={() => toggleLevel(lvl)}
              >
                {lvl}
              </button>
            ))}
            <span className="vocab-pdf-level-hint">
              Applies to Vocabulary Lab themes only.
            </span>
          </div>

          {/* ─── Personal lists ─── */}
          {totalLists > 0 && (
            <>
              <div className="vocab-pdf-sec-h">
                <span>MY PERSONAL LISTS</span>
                <span className="vocab-pdf-sec-actions">
                  <button type="button" onClick={() => setAllLists(true)}>Select all</button>
                  <span className="vocab-pdf-sep">·</span>
                  <button type="button" onClick={() => setAllLists(false)}>Deselect all</button>
                </span>
              </div>
              <div className="vocab-pdf-lists">
                {lists.map((l) => {
                  const on = !!listSel[l.id];
                  return (
                    <label
                      key={l.id}
                      className={`vocab-pdf-opt-row ${on ? "vocab-pdf-opt-row-on" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggleList(l.id)}
                      />
                      <span className="vocab-pdf-opt-label">🗂️ {l.name}</span>
                      <span className="vocab-pdf-opt-meta">
                        {l.words.length} {l.words.length === 1 ? "word" : "words"}
                      </span>
                    </label>
                  );
                })}
              </div>
            </>
          )}

          {/* ─── Format ─── */}
          <div className="vocab-pdf-sec-h">
            <span>FORMAT</span>
          </div>
          <div className="vocab-pdf-fmt-row">
            <button
              type="button"
              className={`vocab-pdf-fmt-card ${format === "cheat" ? "vocab-pdf-fmt-card-on" : ""}`}
              onClick={() => setFormat("cheat")}
            >
              <span className="vocab-pdf-fmt-radio" />
              <div>
                <div className="vocab-pdf-fmt-label">Cheat-sheet</div>
                <div className="vocab-pdf-fmt-sub">3 columns, no examples</div>
              </div>
            </button>
            <button
              type="button"
              className={`vocab-pdf-fmt-card ${format === "reference" ? "vocab-pdf-fmt-card-on" : ""}`}
              onClick={() => setFormat("reference")}
            >
              <span className="vocab-pdf-fmt-radio" />
              <div>
                <div className="vocab-pdf-fmt-label">Reference book</div>
                <div className="vocab-pdf-fmt-sub">1 column, with examples</div>
              </div>
            </button>
          </div>

          {/* ─── Options ─── */}
          <div className="vocab-pdf-sec-h">
            <span>OPTIONS</span>
          </div>
          <label className="vocab-pdf-toggle-row">
            <span>
              <span className="vocab-pdf-toggle-label">
                Mark learned words with ✓
              </span>
              <div className="vocab-pdf-toggle-sub">
                Adds a green check next to words you've already learned.
              </div>
            </span>
            <input
              type="checkbox"
              checked={markLearned}
              onChange={(e) => setMarkLearned(e.target.checked)}
            />
          </label>

          {exportError && (
            <div className="vocab-pdf-error">⚠ {exportError}</div>
          )}
        </div>

        <div className="vocab-pdf-footer">
          <div className="vocab-pdf-summary">
            <b>{stats.sections}</b> section{stats.sections === 1 ? "" : "s"} · <b>{stats.words}</b> word{stats.words === 1 ? "" : "s"} · ≈ <b>{stats.pages}</b> page{stats.pages === 1 ? "" : "s"}
          </div>
          <div className="vocab-pdf-ctas">
            <button
              type="button"
              className="vocab-pdf-btn-secondary"
              onClick={onClose}
              disabled={exporting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="vocab-pdf-btn-primary"
              onClick={doExport}
              disabled={!canExport || exporting}
            >
              {exporting ? "Opening…" : "⬇ Export PDF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────

function initThemeSelection(blocks) {
  const out = {};
  for (const block of Object.values(blocks)) {
    for (const t of block.themeIds) out[t] = true;
  }
  return out;
}

function initLevelSelection() {
  return { B1: true, B2: true, C1: true, C2: true };
}

function readStoredFormat() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY_FORMAT);
    if (v === "cheat" || v === "reference") return v;
  } catch { /* ignore */ }
  return "cheat";
}

function countThemeWords(theme, levelSel) {
  if (!theme || !theme.levels) return 0;
  let total = 0;
  for (const lvl of LEVELS) {
    if (!levelSel[lvl]) continue;
    total += (theme.levels[lvl] || []).length;
  }
  return total;
}
