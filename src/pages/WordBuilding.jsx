// Word Building — explore word families built from a productive root.
//
// Pick a root (act, create, connect…) and see its derivatives grouped by
// part of speech, colour-coded by category, each with a Spanish gloss,
// the affix that formed it, and (for some) an example sentence. Tap any
// word to save it to a personal list — reusing the same save machinery
// as the Reading Room (saveWordToList / getCustomListNames), so words
// land in the user's normal custom lists.

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { loadAndExportRoots } from "../data/pdfRenderer";
import {
  WORD_ROOTS,
  WB_TARGET_LIST_NAME,
  WB_GAME_TYPES,
  getRoot,
  familySize,
  familyByCategory,
  getCategorizePool,
  buildCategorizeRound,
  WB_CONCEPTS,
  getBestScore,
  recordScore,
  buildDiscoverRound,
  buildBuildRound,
  buildContextRound,
} from "../data/wordBuilding";
import {
  saveWordToList,
  getCustomListNames,
  READING_LAST_LIST_KEY,
} from "../data/readingRoom";
import "../styles/wordBuilding.css";

// Category → colour class (CSS handles the actual colours).
const CAT_CLASS = {
  verb: "wb-cat-verb",
  noun: "wb-cat-noun",
  adjective: "wb-cat-adj",
  adverb: "wb-cat-adv",
  negative: "wb-cat-neg",
  related: "wb-cat-rel",
};

function readJson(key, fallback) {
  if (typeof window === "undefined" || !window.localStorage) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeJson(key, value) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

// Map a Word Building category to the part-of-speech label saved with
// the word (so it shows the same kind of tag as Reading Room words:
// "verb", "noun", "adjective", "adverb"). Negatives and related words
// don't map to a single clean part of speech, so we leave those without
// a forced type rather than guess wrong.
function posForCategory(categoryKey) {
  switch (categoryKey) {
    case "verb": return "verb";
    case "noun": return "noun";
    case "adjective": return "adjective";
    case "adverb": return "adverb";
    default: return null; // negative / related — no single POS
  }
}

// Build the ordered list of save destinations: the Word Building list
// first, then the user's other custom lists (de-duplicated).
function buildListOptions() {
  const names = getCustomListNames().map((l) => l.name);
  const ordered = [WB_TARGET_LIST_NAME];
  for (const n of names) {
    if (n && !ordered.includes(n)) ordered.push(n);
  }
  return ordered;
}

export default function WordBuilding() {
  const [view, setView] = useState("concepts"); // "concepts" | "study" | "practise"
  const [game, setGame] = useState(null);    // null | "categorize"
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfMsg, setPdfMsg] = useState(null);
  const [rootId, setRootId] = useState(WORD_ROOTS[0].id);
  const [selected, setSelected] = useState(null); // word entry being saved
  const [toast, setToast] = useState(null);
  const [lists, setLists] = useState(() => buildListOptions());
  const [defaultList, setDefaultList] = useState(() => {
    const last = readJson(READING_LAST_LIST_KEY, null);
    return last || WB_TARGET_LIST_NAME;
  });

  const root = getRoot(rootId);
  const categories = familyByCategory(root);

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 3000);
  };

  const openWord = (word, categoryKey) => {
    setLists(buildListOptions());
    setSelected({ ...word, _category: categoryKey });
  };

  const handleSave = (targetName) => {
    if (!selected) return;
    const listName = (targetName || WB_TARGET_LIST_NAME).trim();
    const res = saveWordToList(
      {
        en: selected.en,
        es: selected.es,
        example: selected.example,
        pos: posForCategory(selected._category),
      },
      listName
    );
    if (res.ok && res.added > 0) {
      writeJson(READING_LAST_LIST_KEY, res.listName);
      setDefaultList(res.listName);
      setLists(buildListOptions());
      showToast(`Saved to "${res.listName}"`);
    } else if (res.duplicate) {
      showToast(`Already in "${res.listName}"`);
    } else {
      showToast("Couldn't save — try again");
    }
  };

  // Download the full word-family reference as a PDF, loaded live from
  // Supabase (so it includes any maintenance edits).
  const downloadPdf = async () => {
    if (pdfBusy) return;
    setPdfBusy(true);
    setPdfMsg(null);
    const result = await loadAndExportRoots(supabase);
    if (!result.ok) {
      setPdfMsg("No se pudo generar el PDF. Inténtalo de nuevo.");
    }
    setPdfBusy(false);
  };

  return (
    <div className="wb">
      <div className="wb-topbar">
        <Link to="/" className="wb-back">← Back to home</Link>
      </div>

      <header className="wb-header">
        <h1>🧩 Word Building</h1>
        <p>Build word families — study them, then play</p>
      </header>

      {/* If a game is running, it takes over the screen. */}
      {game === "categorize" ? (
        <CategorizeGame onExit={() => setGame(null)} />
      ) : game === "discover" ? (
        <DiscoverGame onExit={() => setGame(null)} />
      ) : game === "build" ? (
        <BuildGame onExit={() => setGame(null)} />
      ) : game === "context" ? (
        <ContextGame onExit={() => setGame(null)} />
      ) : game === "speed" ? (
        <SpeedGame onExit={() => setGame(null)} />
      ) : (
        <>
          <div className="wb-pdf-bar">
            <button
              type="button"
              className="wb-pdf-btn"
              onClick={downloadPdf}
              disabled={pdfBusy}
              title="Descarga todas las raíces y palabras en PDF"
            >
              {pdfBusy ? "Generando PDF…" : "⬇ Descargar PDF"}
            </button>
            {pdfMsg && <span className="wb-pdf-msg">{pdfMsg}</span>}
          </div>

          <div className="wb-tabs">
            <button
              className={`wb-tab ${view === "concepts" ? "wb-tab-active" : ""}`}
              onClick={() => setView("concepts")}
            >
              💡 Concepts
            </button>
            <button
              className={`wb-tab ${view === "study" ? "wb-tab-active" : ""}`}
              onClick={() => setView("study")}
            >
              📖 Study
            </button>
            <button
              className={`wb-tab ${view === "practise" ? "wb-tab-active" : ""}`}
              onClick={() => setView("practise")}
            >
              🎮 Practise
            </button>
          </div>

          {view === "concepts" ? (
            <ConceptsTab />
          ) : view === "study" ? (
            <>
              <div className="wb-root-picker">
                <span className="wb-root-picker-label">Choose a root</span>
                <RootDropdown
                  roots={WORD_ROOTS}
                  value={rootId}
                  onChange={setRootId}
                />
              </div>

              <div className="wb-root-card">
                <span className="wb-root-label">Root</span>
                <span className="wb-root-word">{root.root}</span>
                <span className="wb-root-idea">{root.idea}</span>
                <span className="wb-root-meta">{familySize(root)} words in this family</span>
              </div>

              <div className="wb-families">
                {categories.map((cat) => (
                  <div key={cat.key} className="wb-family">
                    <span className={`wb-cat-badge ${CAT_CLASS[cat.key]}`}>{cat.label}</span>
                    <div className="wb-words">
                      {cat.words.map((w, i) => (
                        <button key={i} className="wb-word" onClick={() => openWord(w, cat.key)}>
                          <span className="wb-word-main">
                            <span className="wb-word-en">{w.en}</span>
                            <span className="wb-word-es">· {w.es}</span>
                            {w.affix && <span className="wb-word-affix">{w.affix}</span>}
                          </span>
                          {w.example && <span className="wb-word-ex">{w.example}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <PractiseTab onPlay={setGame} />
          )}
        </>
      )}

      {selected && (
        <SaveWordPopup
          key={selected.en}
          word={selected}
          lists={lists}
          defaultList={defaultList}
          onSave={handleSave}
          onClose={() => setSelected(null)}
        />
      )}

      {toast && <div className="wb-toast">{toast}</div>}
    </div>
  );
}

// ─── Custom root dropdown (styled, not the native <select>) ─────────
// A compact selector that scales to many roots, styled to match the
// app. Opens a scrollable panel; closes on pick or outside click.

function shortIdea(idea) {
  // "la idea de \"llevar / transportar\"" → "llevar / transportar"
  const m = idea.match(/"([^"]+)"/);
  return m ? m[1] : idea;
}

function RootDropdown({ roots, value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const current = roots.find((r) => r.id === value) || roots[0];

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const choose = (id) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div className="wb-dd" ref={wrapRef}>
      <button
        type="button"
        className="wb-dd-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="wb-dd-current">
          <span className="wb-dd-root">{current.root}</span>
          <span className="wb-dd-meaning">— {shortIdea(current.idea)}</span>
        </span>
        <span className={`wb-dd-caret ${open ? "wb-dd-caret-open" : ""}`}>▾</span>
      </button>

      {open && (
        <ul className="wb-dd-panel" role="listbox">
          {roots.map((r) => (
            <li
              key={r.id}
              role="option"
              aria-selected={r.id === value}
              className={`wb-dd-option ${r.id === value ? "wb-dd-option-active" : ""}`}
              onClick={() => choose(r.id)}
            >
              <span className="wb-dd-root">{r.root}</span>
              <span className="wb-dd-meaning">— {shortIdea(r.idea)}</span>
              {r.id === value && <span className="wb-dd-check">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Concepts tab: collapsible theory cards ─────────────────────────

function ConceptsTab() {
  const [open, setOpen] = useState("noun"); // first one open by default

  return (
    <div className="wb-concepts">
      {WB_CONCEPTS.map((c) => {
        const isOpen = open === c.key;
        return (
          <div key={c.key} className="wb-concept">
            <button
              className="wb-concept-head"
              onClick={() => setOpen(isOpen ? null : c.key)}
              aria-expanded={isOpen}
            >
              <span className={`wb-cat-badge ${CAT_CLASS[c.key]}`}>
                {c.label} · {c.labelEs}
              </span>
              <span className="wb-concept-caret">{isOpen ? "▾" : "▸"}</span>
            </button>

            {isOpen && (
              <div className="wb-concept-body">
                {c.concept.map((line, i) => (
                  <p key={i} className="wb-concept-text">{line}</p>
                ))}

                {c.answers.length > 0 && (
                  <div className={`wb-concept-answers ${CAT_CLASS[c.key]}`}>
                    Responden a: <strong>{c.answers.join(" · ")}</strong>
                  </div>
                )}

                {c.affixes.length > 0 && (
                  <>
                    <div className="wb-concept-sub">Afijos típicos</div>
                    <div className="wb-concept-affixes">
                      {c.affixes.map((a, i) => (
                        <span key={i} className="wb-concept-affix">
                          <strong>{a.affix}</strong> · {a.example}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                <div className="wb-concept-sub">Ejemplos</div>
                <div className="wb-concept-examples">
                  {c.examples.map((ex, i) => (
                    <p key={i} className="wb-concept-ex">{ex}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Practise tab: the 5 game cards ─────────────────────────────────

const WB_GAMES = [
  { id: "categorize", icon: "🏷️", name: "Categorize", desc: "Is it a noun, verb, adjective or adverb? Sort each word fast.", available: true },
  { id: "discover",   icon: "🔍", name: "Discover",   desc: "Find the words derived from a root.", available: true },
  { id: "build",      icon: "🧱", name: "Build",      desc: "Add prefixes & suffixes to build words.", available: true },
  { id: "context",    icon: "📝", name: "Context",    desc: "Complete real sentences with the right word.", available: true },
  { id: "speed",      icon: "⚡", name: "Speed Round", desc: "Make as many words as you can in 60 seconds.", available: true },
];

function PractiseTab({ onPlay }) {
  const poolSize = getCategorizePool().length;
  const catBest = getBestScore("categorize");
  return (
    <div className="wb-games">
      {WB_GAMES.map((g) => (
        <button
          key={g.id}
          className={`wb-game-card ${g.available ? "" : "wb-game-soon"}`}
          onClick={() => g.available && onPlay(g.id)}
          disabled={!g.available}
        >
          <div className="wb-game-top">
            <span className="wb-game-icon">{g.icon}</span>
            <span className={`wb-game-badge ${g.available ? "wb-game-badge-on" : ""}`}>
              {g.available ? "AVAILABLE" : "SOON"}
            </span>
          </div>
          <div className="wb-game-name">{g.name}</div>
          <div className="wb-game-desc">{g.desc}</div>
          {g.available && (
            <div className="wb-game-meta">
              {g.id === "categorize" && catBest
                ? `Best: ${catBest.best}/${catBest.total} · ${poolSize} words`
                : `${poolSize} words to practise`}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Categorize game ────────────────────────────────────────────────
// Show a word; the player taps noun / verb / adjective / adverb. Instant
// feedback, then next. A round is 10 questions; ends with a score.

const TYPE_LABELS = {
  verb: "Verb",
  noun: "Noun",
  adjective: "Adjective",
  adverb: "Adverb",
};

function CategorizeGame({ onExit }) {
  const [round, setRound] = useState(() => buildCategorizeRound(10));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(null); // { best, isRecord } once finished

  const current = round[idx];

  const pick = (type) => {
    if (picked) return;
    setPicked(type);
    if (type === current.type) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= round.length) {
      // score state already reflects all answers (pick ran on each,
      // including this question, before Next is shown). Record it.
      const res = recordScore("categorize", score, round.length);
      setResult(res);
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setRound(buildCategorizeRound(10));
    setIdx(0);
    setScore(0);
    setPicked(null);
    setDone(false);
    setResult(null);
  };

  if (done) {
    const pct = Math.round((score / round.length) * 100);
    const msg =
      pct >= 90 ? "Outstanding! 🏆" :
      pct >= 70 ? "Great work! 🎉" :
      pct >= 50 ? "Good — keep practising 💪" :
      "Keep going, you'll get there 🌱";
    const best = result && result.best ? result.best : null;
    return (
      <div className="wb-game-screen">
        <div className="wb-game-result">
          <div className="wb-game-result-score">{score}/{round.length}</div>
          <div className="wb-game-result-msg">{msg}</div>
          {result && result.isRecord ? (
            <div className="wb-game-record">⭐ New best score!</div>
          ) : best ? (
            <div className="wb-game-best">Best: {best.best}/{best.total}</div>
          ) : null}
          <button className="wb-game-btn" onClick={restart}>Play again</button>
          <button className="wb-game-btn wb-game-btn-ghost" onClick={onExit}>Back to games</button>
        </div>
      </div>
    );
  }

  return (
    <div className="wb-game-screen">
      <div className="wb-game-bar">
        <button className="wb-game-quit" onClick={onExit}>← Games</button>
        <span className="wb-game-progress">{idx + 1} / {round.length}</span>
        <span className="wb-game-score">★ {score}</span>
      </div>

      <div className="wb-game-prompt">
        <span className="wb-game-q-label">What type of word is this?</span>
        <span className="wb-game-q-word">{current.en}</span>
        <span className="wb-game-q-es">{current.es}</span>
      </div>

      <div className="wb-game-options">
        {WB_GAME_TYPES.map((type) => {
          let cls = "wb-game-opt";
          if (picked) {
            if (type === current.type) cls += " wb-game-opt-correct";
            else if (type === picked) cls += " wb-game-opt-wrong";
            else cls += " wb-game-opt-dim";
          }
          return (
            <button key={type} className={cls} onClick={() => pick(type)} disabled={!!picked}>
              {TYPE_LABELS[type]}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="wb-game-feedback">
          {picked === current.type ? (
            <span className="wb-game-fb-ok">✓ Correct</span>
          ) : (
            <span className="wb-game-fb-no">
              ✗ It's a {TYPE_LABELS[current.type].toLowerCase()}
            </span>
          )}
          <button className="wb-game-btn" onClick={next}>
            {idx + 1 >= round.length ? "See score" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Discover game ──────────────────────────────────────────────────
// Show a root + a grid of words. Tap the ones that belong to the root's
// family, leave the decoys. Check → score = correct picks − wrong picks
// (floored at 0), out of the number of real words. 5 rounds.

function DiscoverGame({ onExit }) {
  const ROUNDS = 5;
  const [roundNo, setRoundNo] = useState(1);
  const [data, setData] = useState(() => buildDiscoverRound(5, 4));
  const [chosen, setChosen] = useState(() => new Set());
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(null);

  const toggle = (en) => {
    if (checked) return;
    setChosen((prev) => {
      const n = new Set(prev);
      if (n.has(en)) n.delete(en); else n.add(en);
      return n;
    });
  };

  const check = () => {
    if (checked) return;
    // round score: +1 per correct belongs picked, −1 per decoy picked,
    // floored at 0, capped at the number of real words.
    let correct = 0, wrong = 0;
    for (const item of data.items) {
      if (chosen.has(item.en)) {
        if (item.belongs) correct++; else wrong++;
      }
    }
    const roundScore = Math.max(0, correct - wrong);
    setScore((s) => s + roundScore);
    setChecked(true);
  };

  const next = () => {
    if (roundNo >= ROUNDS) {
      const maxPerRound = 5; // realCount
      const res = recordScore("discover", score, ROUNDS * maxPerRound);
      setResult(res);
      setDone(true);
    } else {
      setRoundNo((n) => n + 1);
      setData(buildDiscoverRound(5, 4));
      setChosen(new Set());
      setChecked(false);
    }
  };

  const restart = () => {
    setRoundNo(1);
    setData(buildDiscoverRound(5, 4));
    setChosen(new Set());
    setChecked(false);
    setScore(0);
    setDone(false);
    setResult(null);
  };

  if (done) {
    const totalPossible = ROUNDS * 5;
    const pct = Math.round((score / totalPossible) * 100);
    const msg =
      pct >= 90 ? "Outstanding! 🏆" :
      pct >= 70 ? "Great work! 🎉" :
      pct >= 50 ? "Good — keep practising 💪" :
      "Keep going, you'll get there 🌱";
    const best = result && result.best ? result.best : null;
    return (
      <div className="wb-game-screen">
        <div className="wb-game-result">
          <div className="wb-game-result-score">{score}/{totalPossible}</div>
          <div className="wb-game-result-msg">{msg}</div>
          {result && result.isRecord ? (
            <div className="wb-game-record">⭐ New best score!</div>
          ) : best ? (
            <div className="wb-game-best">Best: {best.best}/{best.total}</div>
          ) : null}
          <button className="wb-game-btn" onClick={restart}>Play again</button>
          <button className="wb-game-btn wb-game-btn-ghost" onClick={onExit}>Back to games</button>
        </div>
      </div>
    );
  }

  return (
    <div className="wb-game-screen">
      <div className="wb-game-bar">
        <button className="wb-game-quit" onClick={onExit}>← Games</button>
        <span className="wb-game-progress">Round {roundNo} / {ROUNDS}</span>
        <span className="wb-game-score">★ {score}</span>
      </div>

      <div className="wb-game-prompt">
        <span className="wb-game-q-label">Tap the words from this root</span>
        <span className="wb-game-q-word">{data.root}</span>
        <span className="wb-game-q-es">{data.idea}</span>
      </div>

      <div className="wb-discover-grid">
        {data.items.map((item) => {
          let cls = "wb-discover-item";
          if (chosen.has(item.en)) cls += " wb-discover-picked";
          if (checked) {
            if (item.belongs) cls += " wb-discover-right";
            else if (chosen.has(item.en)) cls += " wb-discover-wrong";
            else cls += " wb-discover-dim";
          }
          return (
            <button key={item.en} className={cls} onClick={() => toggle(item.en)} disabled={checked}>
              {item.en}
              {checked && item.belongs && <span className="wb-discover-tick"> ✓</span>}
              {checked && !item.belongs && chosen.has(item.en) && <span className="wb-discover-cross"> ✗</span>}
            </button>
          );
        })}
      </div>

      <div className="wb-game-feedback">
        {!checked ? (
          <button className="wb-game-btn" onClick={check}>Check</button>
        ) : (
          <button className="wb-game-btn" onClick={next}>
            {roundNo >= ROUNDS ? "See score" : "Next round →"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Build game ─────────────────────────────────────────────────────
// Show the target word's meaning + root; the player picks the affix that
// builds it from 4 options. Instant feedback, 10 questions, best saved.

function BuildGame({ onExit }) {
  const [round, setRound] = useState(() => buildBuildRound(10));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(null);

  const current = round[idx];

  const pick = (affix) => {
    if (picked) return;
    setPicked(affix);
    if (affix === current.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= round.length) {
      const res = recordScore("build", score, round.length);
      setResult(res);
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setRound(buildBuildRound(10));
    setIdx(0);
    setScore(0);
    setPicked(null);
    setDone(false);
    setResult(null);
  };

  if (done) {
    const pct = Math.round((score / round.length) * 100);
    const msg =
      pct >= 90 ? "Outstanding! 🏆" :
      pct >= 70 ? "Great work! 🎉" :
      pct >= 50 ? "Good — keep practising 💪" :
      "Keep going, you'll get there 🌱";
    const best = result && result.best ? result.best : null;
    return (
      <div className="wb-game-screen">
        <div className="wb-game-result">
          <div className="wb-game-result-score">{score}/{round.length}</div>
          <div className="wb-game-result-msg">{msg}</div>
          {result && result.isRecord ? (
            <div className="wb-game-record">⭐ New best score!</div>
          ) : best ? (
            <div className="wb-game-best">Best: {best.best}/{best.total}</div>
          ) : null}
          <button className="wb-game-btn" onClick={restart}>Play again</button>
          <button className="wb-game-btn wb-game-btn-ghost" onClick={onExit}>Back to games</button>
        </div>
      </div>
    );
  }

  // Show the target word with the affix blanked, to hint the shape.
  return (
    <div className="wb-game-screen">
      <div className="wb-game-bar">
        <button className="wb-game-quit" onClick={onExit}>← Games</button>
        <span className="wb-game-progress">{idx + 1} / {round.length}</span>
        <span className="wb-game-score">★ {score}</span>
      </div>

      <div className="wb-game-prompt">
        <span className="wb-game-q-label">Which affix builds this word?</span>
        <span className="wb-game-q-word">{current.en}</span>
        <span className="wb-game-q-es">{current.es} · from "{current.root}"</span>
      </div>

      <div className="wb-game-options">
        {current.options.map((affix) => {
          let cls = "wb-game-opt";
          if (picked) {
            if (affix === current.answer) cls += " wb-game-opt-correct";
            else if (affix === picked) cls += " wb-game-opt-wrong";
            else cls += " wb-game-opt-dim";
          }
          return (
            <button key={affix} className={cls} onClick={() => pick(affix)} disabled={!!picked}>
              {affix}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="wb-game-feedback">
          {picked === current.answer ? (
            <span className="wb-game-fb-ok">✓ Correct</span>
          ) : (
            <span className="wb-game-fb-no">✗ It's “{current.answer}”</span>
          )}
          <button className="wb-game-btn" onClick={next}>
            {idx + 1 >= round.length ? "See score" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Context game ───────────────────────────────────────────────────
// Fill the gap in a real sentence with the right form of the word.
// 4 options from the same root's family. 8 questions, best saved.

function ContextGame({ onExit }) {
  const [round, setRound] = useState(() => buildContextRound(8));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(null);

  const current = round[idx];

  const pick = (opt) => {
    if (picked) return;
    setPicked(opt);
    if (opt === current.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= round.length) {
      const res = recordScore("context", score, round.length);
      setResult(res);
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setRound(buildContextRound(8));
    setIdx(0);
    setScore(0);
    setPicked(null);
    setDone(false);
    setResult(null);
  };

  if (done) {
    const pct = Math.round((score / round.length) * 100);
    const msg =
      pct >= 90 ? "Outstanding! 🏆" :
      pct >= 70 ? "Great work! 🎉" :
      pct >= 50 ? "Good — keep practising 💪" :
      "Keep going, you'll get there 🌱";
    const best = result && result.best ? result.best : null;
    return (
      <div className="wb-game-screen">
        <div className="wb-game-result">
          <div className="wb-game-result-score">{score}/{round.length}</div>
          <div className="wb-game-result-msg">{msg}</div>
          {result && result.isRecord ? (
            <div className="wb-game-record">⭐ New best score!</div>
          ) : best ? (
            <div className="wb-game-best">Best: {best.best}/{best.total}</div>
          ) : null}
          <button className="wb-game-btn" onClick={restart}>Play again</button>
          <button className="wb-game-btn wb-game-btn-ghost" onClick={onExit}>Back to games</button>
        </div>
      </div>
    );
  }

  // Split the sentence around "___" to render the gap nicely.
  const parts = current.sentence.split("___");

  return (
    <div className="wb-game-screen">
      <div className="wb-game-bar">
        <button className="wb-game-quit" onClick={onExit}>← Games</button>
        <span className="wb-game-progress">{idx + 1} / {round.length}</span>
        <span className="wb-game-score">★ {score}</span>
      </div>

      <div className="wb-context-prompt">
        <span className="wb-game-q-label">Complete the sentence</span>
        <p className="wb-context-sentence">
          {parts[0]}
          <span className="wb-context-gap">{picked ? picked : "______"}</span>
          {parts[1]}
        </p>
        <span className="wb-context-root">from "{current.root}"</span>
      </div>

      <div className="wb-game-options">
        {current.options.map((opt) => {
          let cls = "wb-game-opt";
          if (picked) {
            if (opt === current.answer) cls += " wb-game-opt-correct";
            else if (opt === picked) cls += " wb-game-opt-wrong";
            else cls += " wb-game-opt-dim";
          }
          return (
            <button key={opt} className={cls} onClick={() => pick(opt)} disabled={!!picked}>
              {opt}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="wb-game-feedback">
          {picked === current.answer ? (
            <span className="wb-game-fb-ok">✓ Correct</span>
          ) : (
            <span className="wb-game-fb-no">✗ It's “{current.answer}”</span>
          )}
          <button className="wb-game-btn" onClick={next}>
            {idx + 1 >= round.length ? "See score" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Speed Round ────────────────────────────────────────────────────
// 60 seconds, classify words as fast as you can. Each tap flashes
// green/red briefly and auto-advances. Score = correct answers. Best
// saved (compared as score out of itself — higher is always better).

const SPEED_SECONDS = 60;

function SpeedGame({ onExit }) {
  const [phase, setPhase] = useState("intro"); // "intro" | "playing" | "done"
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SPEED_SECONDS);
  const [flash, setFlash] = useState(null); // {type, ok} for brief colour
  const [result, setResult] = useState(null);
  const timerRef = useRef(null);
  const flashRef = useRef(null);

  // Build a long queue so we never run out within 60s.
  const start = () => {
    setQueue(buildCategorizeRound(200));
    setIdx(0);
    setScore(0);
    setAttempts(0);
    setTimeLeft(SPEED_SECONDS);
    setFlash(null);
    setPhase("playing");
  };

  // Countdown.
  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(timerRef.current);
  }, [phase]);

  // When time runs out, finish and record.
  useEffect(() => {
    if (phase === "playing" && timeLeft === 0) {
      // best for speed: store score out of attempts (or score/score=1).
      // We compare by raw score, so store total = score to keep ratio 1
      // and let recordScore compare raw via a dedicated key handling.
      const prev = getBestScore("speed");
      const isRecord = !prev || score > prev.best;
      if (isRecord && typeof window !== "undefined" && window.localStorage) {
        try {
          const raw = window.localStorage.getItem("iye:wb:scores");
          const all = raw ? JSON.parse(raw) : {};
          all.speed = { best: score, total: score, updatedAt: Date.now() };
          window.localStorage.setItem("iye:wb:scores", JSON.stringify(all));
        } catch { /* ignore */ }
      }
      setResult({ isRecord, best: isRecord ? score : (prev ? prev.best : score) });
      setPhase("done");
    }
  }, [timeLeft, phase, score]);

  // Cleanup flash timer on unmount.
  useEffect(() => () => window.clearTimeout(flashRef.current), []);

  const current = queue[idx];

  const answer = (type) => {
    if (phase !== "playing" || !current) return;
    const ok = type === current.type;
    if (ok) setScore((s) => s + 1);
    setAttempts((a) => a + 1);
    // brief flash, then advance
    setFlash({ type, ok });
    window.clearTimeout(flashRef.current);
    flashRef.current = window.setTimeout(() => {
      setFlash(null);
      setIdx((i) => i + 1);
    }, 180);
  };

  if (phase === "intro") {
    const best = getBestScore("speed");
    return (
      <div className="wb-game-screen">
        <div className="wb-game-result">
          <div className="wb-speed-intro-icon">⚡</div>
          <div className="wb-game-result-msg">
            Classify as many words as you can in {SPEED_SECONDS} seconds.
          </div>
          {best && <div className="wb-game-best">Best: {best.best} words</div>}
          <button className="wb-game-btn" onClick={start}>Start</button>
          <button className="wb-game-btn wb-game-btn-ghost" onClick={onExit}>Back to games</button>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="wb-game-screen">
        <div className="wb-game-result">
          <div className="wb-game-result-score">{score}</div>
          <div className="wb-game-result-msg">
            words in {SPEED_SECONDS}s {attempts > 0 ? `· ${score}/${attempts} correct` : ""}
          </div>
          {result && result.isRecord ? (
            <div className="wb-game-record">⭐ New best score!</div>
          ) : result ? (
            <div className="wb-game-best">Best: {result.best} words</div>
          ) : null}
          <button className="wb-game-btn" onClick={start}>Play again</button>
          <button className="wb-game-btn wb-game-btn-ghost" onClick={onExit}>Back to games</button>
        </div>
      </div>
    );
  }

  // playing
  const lowTime = timeLeft <= 10;
  return (
    <div className="wb-game-screen">
      <div className="wb-game-bar">
        <button className="wb-game-quit" onClick={onExit}>← Games</button>
        <span className={`wb-speed-timer ${lowTime ? "wb-speed-timer-low" : ""}`}>
          ⏱ {timeLeft}s
        </span>
        <span className="wb-game-score">★ {score}</span>
      </div>

      <div className="wb-game-prompt">
        <span className="wb-game-q-label">What type of word is this?</span>
        <span className="wb-game-q-word">{current ? current.en : ""}</span>
        <span className="wb-game-q-es">{current ? current.es : ""}</span>
      </div>

      <div className="wb-game-options">
        {WB_GAME_TYPES.map((type) => {
          let cls = "wb-game-opt";
          if (flash && flash.type === type) {
            cls += flash.ok ? " wb-game-opt-correct" : " wb-game-opt-wrong";
          }
          return (
            <button key={type} className={cls} onClick={() => answer(type)}>
              {TYPE_LABELS[type]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Popup to save a word into a chosen / new list. Mirrors the Reading
// Room's WordPopup picker (state lives here, keyed by word so it resets).
function SaveWordPopup({ word, lists, defaultList, onSave, onClose }) {
  const NEW = "__new__";
  const [choice, setChoice] = useState(defaultList || (lists[0] || ""));
  const [newName, setNewName] = useState("");
  const [savedMsg, setSavedMsg] = useState(false);
  const isCreating = choice === NEW;

  const handleSaveClick = () => {
    const target = isCreating ? newName.trim() : choice;
    if (!target) return;
    onSave(target);
    setSavedMsg(true);
  };
  const saveDisabled = savedMsg || (isCreating && !newName.trim());

  return (
    <div className="wb-popup-backdrop" onClick={onClose}>
      <div className="wb-popup" onClick={(e) => e.stopPropagation()}>
        <div className="wb-popup-word">{word.en}</div>
        <div className="wb-popup-es">{word.es}</div>
        {word.example && <div className="wb-popup-ex">{word.example}</div>}

        <div className="wb-popup-picker">
          <label className="wb-popup-picker-label">Save to list</label>
          <select
            className="wb-popup-select"
            value={choice}
            onChange={(e) => { setChoice(e.target.value); setSavedMsg(false); }}
          >
            {lists.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
            <option value={NEW}>+ New list…</option>
          </select>
          {isCreating && (
            <input
              className="wb-popup-newname"
              type="text"
              placeholder="New list name"
              value={newName}
              maxLength={60}
              onChange={(e) => { setNewName(e.target.value); setSavedMsg(false); }}
              autoFocus
            />
          )}
        </div>

        <button className="wb-popup-save" onClick={handleSaveClick} disabled={saveDisabled}>
          {savedMsg ? "✓ Saved" : "+ Save word"}
        </button>
        <button className="wb-popup-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
