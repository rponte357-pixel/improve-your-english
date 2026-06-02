// Reading Room — read authentic public-domain texts and save words.
//
// Two views in one page, toggled by local state:
//   • Library: header with reading stats, level filter, list of text
//     cards. Tap a card → opens the reader.
//   • Reader: the text rendered as tappable word tokens, a progress
//     bar, and a word popup. Tapping a glossary word shows its meaning
//     + a "Save to my lists" action; tapping a non-glossary word shows
//     a gentle "not in the glossary yet" note.
//
// Translations come from each text's curated glossary (see
// data/readingRoom.js) — no external API. Saving a word writes to the
// user's custom lists via saveWordToList(), reusing the same storage
// the rest of the app uses.
//
// Reading progress + streak are persisted to localStorage so the
// library stats reflect real activity.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  READING_TEXTS,
  READING_LEVELS,
  READING_PROGRESS_KEY,
  READING_STREAK_KEY,
  READING_SAVED_KEY,
  READING_TARGET_LIST_NAME,
  READING_LAST_LIST_KEY,
  getReadingText,
  getTextsByLevel,
  lookupGlossary,
  normalizeToken,
  glossarySize,
  saveWordToList,
  getCustomListNames,
  computeBadges,
  getNewlyEarnedBadges,
} from "../data/readingRoom";
import "../styles/readingRoom.css";

// ─── localStorage helpers (defensive, never throw) ──────────────────

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
    /* ignore quota / serialization errors */
  }
}
function todayStr() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

// Update the reading streak: increment if last read was yesterday,
// reset to 1 if there's a gap, keep if already read today.
function bumpStreak() {
  const s = readJson(READING_STREAK_KEY, { count: 0, lastReadDate: null });
  const today = todayStr();
  if (s.lastReadDate === today) return s; // already counted today
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const next = {
    count: s.lastReadDate === yesterday ? (s.count || 0) + 1 : 1,
    lastReadDate: today,
  };
  writeJson(READING_STREAK_KEY, next);
  return next;
}

// ─── Main component ─────────────────────────────────────────────────

export default function ReadingRoom() {
  const [openTextId, setOpenTextId] = useState(null);
  const [levelFilter, setLevelFilter] = useState("all");

  const openText = openTextId ? getReadingText(openTextId) : null;

  return (
    <div className="rr">
      <div className="rr-topbar">
        {openText ? (
          <button className="rr-back" onClick={() => setOpenTextId(null)}>
            ← Library
          </button>
        ) : (
          <Link to="/" className="rr-back">← Back to home</Link>
        )}
      </div>

      {openText ? (
        <Reader text={openText} />
      ) : (
        <Library
          levelFilter={levelFilter}
          onFilter={setLevelFilter}
          onOpen={setOpenTextId}
        />
      )}
    </div>
  );
}

// ─── Library view ───────────────────────────────────────────────────

function Library({ levelFilter, onFilter, onOpen }) {
  const stats = useReadingStats();
  const texts = getTextsByLevel(levelFilter);

  return (
    <>
      <header className="rr-header">
        <h1>📚 Reading Room</h1>
        <p>Read authentic texts · save words as you go</p>
      </header>

      <div className="rr-stats">
        <div className="rr-stat">
          <span className="rr-stat-num">{stats.streak}</span>
          <span className="rr-stat-label">day streak</span>
        </div>
        <div className="rr-stat">
          <span className="rr-stat-num">{stats.inProgress}</span>
          <span className="rr-stat-label">reading now</span>
        </div>
        <div className="rr-stat">
          <span className="rr-stat-num">{stats.wordsSaved}</span>
          <span className="rr-stat-label">words saved</span>
        </div>
      </div>

      <div className="rr-badges">
        {computeBadges().map((b) => (
          <div
            key={b.id}
            className={`rr-badge ${b.earned ? "rr-badge-earned" : "rr-badge-locked"}`}
            title={`${b.name} — ${b.desc}`}
          >
            <span className="rr-badge-icon">{b.earned ? b.icon : "🔒"}</span>
            <span className="rr-badge-name">{b.name}</span>
          </div>
        ))}
      </div>

      <div className="rr-filters">
        <button
          className={`rr-chip ${levelFilter === "all" ? "rr-chip-active" : ""}`}
          onClick={() => onFilter("all")}
        >
          All
        </button>
        {READING_LEVELS.map((lvl) => (
          <button
            key={lvl}
            className={`rr-chip ${levelFilter === lvl ? "rr-chip-active" : ""}`}
            onClick={() => onFilter(lvl)}
          >
            {lvl}
          </button>
        ))}
      </div>

      {texts.length === 0 ? (
        <p className="rr-empty">No texts at this level yet. More coming soon.</p>
      ) : (
        <div className="rr-cards">
          {texts.map((t) => {
            const prog = stats.progress[t.id];
            const pct = prog && prog.pct ? Math.round(prog.pct) : 0;
            return (
              <button key={t.id} className="rr-card" onClick={() => onOpen(t.id)}>
                <div className="rr-card-top">
                  <div className="rr-card-titles">
                    <span className="rr-card-title">{t.title}</span>
                    <span className="rr-card-author">{t.author} · {t.kind}</span>
                  </div>
                  <span className={`rr-level rr-level-${t.level}`}>{t.level}</span>
                </div>
                <div className="rr-card-meta">
                  <span>🕑 ~{t.estMinutes} min</span>
                  <span>📄 {t.wordCount.toLocaleString()} words</span>
                  <span>📖 {glossarySize(t)} key words</span>
                  {pct > 0 && <span className="rr-card-prog">✓ {pct}% read</span>}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

// ─── Reader view ────────────────────────────────────────────────────

function Reader({ text }) {
  const [selected, setSelected] = useState(null); // {token, hit|null}
  const [toast, setToast] = useState(null);
  const [readPct, setReadPct] = useState(0);

  // Scroll-progress state (declared up here so the mount effect can use it).
  const articleRef = useRef(null);
  const [atEnd, setAtEnd] = useState(false);
  const [finished, setFinished] = useState(false);
  const saveTimer = useRef(null);

  // Destination lists for the picker, refreshed whenever a word opens.
  const [lists, setLists] = useState(() => buildListOptions());
  // The list to pre-select in the popup = the last one the user saved
  // into (falls back to the Reading Room list).
  const [defaultList, setDefaultList] = useState(() => {
    const last = readJson(READING_LAST_LIST_KEY, null);
    return last || READING_TARGET_LIST_NAME;
  });

  // Mark this text as opened + bump streak once on mount.
  useEffect(() => {
    bumpStreak();
    const prog = readJson(READING_PROGRESS_KEY, {});
    if (!prog[text.id]) {
      prog[text.id] = { pct: 0, updatedAt: Date.now() };
      writeJson(READING_PROGRESS_KEY, prog);
    }
    const savedPct = prog[text.id] ? prog[text.id].pct || 0 : 0;
    setReadPct(savedPct);
    if (savedPct >= 100) setFinished(true);
  }, [text.id]);

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 3000);
  };

  // After an action that could earn a badge (finishing a text, saving
  // words), check for newly-earned ones and celebrate with a toast.
  // Slightly delayed so it follows any save/finish toast rather than
  // clobbering it.
  const checkBadges = () => {
    const earned = getNewlyEarnedBadges();
    if (earned.length) {
      const b = earned[0]; // celebrate the first; rare to earn 2 at once
      window.setTimeout(() => {
        showToast(`${b.icon} Badge earned: ${b.name}!`);
      }, 1400);
    }
  };

  const handleWordTap = (token) => {
    const hit = lookupGlossary(text, token);
    setLists(buildListOptions()); // refresh in case lists changed elsewhere
    setSelected({ token, hit });
  };

  // Save into the list name the popup passes (existing or freshly typed).
  const handleSave = (targetName) => {
    if (!selected || !selected.hit) return;
    const listName = (targetName || READING_TARGET_LIST_NAME).trim();
    const res = saveWordToList(
      { en: selected.hit.en, es: selected.hit.es, pos: selected.hit.pos },
      listName
    );
    if (res.ok && res.added > 0) {
      bumpSavedCount(1);
      writeJson(READING_LAST_LIST_KEY, res.listName);
      setDefaultList(res.listName);
      setLists(buildListOptions()); // include any newly-created list
      showToast(`Saved to "${res.listName}"`);
      checkBadges();
    } else if (res.duplicate) {
      showToast(`Already in "${res.listName}"`);
    } else {
      showToast("Couldn't save — try again");
    }
  };

  // ── Scroll-based progress ──────────────────────────────────────
  // We measure how far the article has scrolled past the top of the
  // viewport. When the bottom of the article reaches the bottom of the
  // viewport, we're at ~100%. Progress is saved with a debounce so we
  // don't write to localStorage on every scroll frame.
  const persistPct = useCallback((pct) => {
    const prog = readJson(READING_PROGRESS_KEY, {});
    const prev = prog[text.id] && prog[text.id].pct ? prog[text.id].pct : 0;
    // Never let scroll progress overwrite a completed (100%) reading
    // with a lower number, and only move forward.
    const next = Math.max(prev === 100 ? 100 : 0, prev, pct);
    prog[text.id] = { pct: next, updatedAt: Date.now() };
    writeJson(READING_PROGRESS_KEY, prog);
  }, [text.id]);

  const computeProgress = useCallback(() => {
    const el = articleRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // Total scrollable distance for the article through the viewport:
    // from when its top hits the viewport bottom to when its bottom
    // hits the viewport top. We track how far we are along that range.
    const total = rect.height; // article height
    // How much of the article has passed the top of the viewport:
    const scrolledPast = Math.min(Math.max(-rect.top, 0), total);
    // Fraction visible-or-past, normalised so reaching the article's
    // end (bottom at/above viewport bottom) approaches 1.
    const denom = Math.max(total - vh + 80, 1); // 80 ≈ footer breathing room
    let pct = Math.round((scrolledPast / denom) * 100);
    if (pct < 0) pct = 0;
    if (pct > 100) pct = 100;

    // "At end" when the article bottom is within the viewport.
    const reachedEnd = rect.bottom <= vh + 40;
    setAtEnd(reachedEnd);

    setReadPct((cur) => {
      const shown = finished ? 100 : Math.max(cur, pct);
      return shown;
    });

    // Debounced save of the live progress (cap at 95 until "Finish").
    const toSave = finished ? 100 : Math.min(pct, 95);
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => persistPct(toSave), 400);
  }, [finished, persistPct]);

  // Attach scroll/resize listeners while reading.
  useEffect(() => {
    computeProgress(); // initial
    const onScroll = () => computeProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [computeProgress]);

  // "Finish" — mark the reading fully complete (counts for streak/badges).
  const finishReading = () => {
    setFinished(true);
    setReadPct(100);
    persistPct(100);
    showToast("Finished — nice work! 🎉");
    checkBadges();
  };

  return (
    <div className="rr-reader">
      <div className="rr-reader-head">
        <h2 className="rr-reader-title">{text.title}</h2>
        <p className="rr-reader-author">{text.author}</p>
        <span className={`rr-level rr-level-${text.level}`}>{text.level}</span>
      </div>

      <div className="rr-progress">
        <div className="rr-progress-fill" style={{ width: `${readPct}%` }} />
      </div>

      <article className="rr-text" ref={articleRef}>
        {text.paragraphs.map((para, pi) => (
          <p key={pi} className="rr-para">
            {tokenize(para).map((tok, ti) => {
              if (tok.isWord) {
                const inGloss = !!lookupGlossary(text, tok.text);
                return (
                  <span
                    key={ti}
                    className={`rr-word ${inGloss ? "rr-word-gloss" : ""}`}
                    onClick={() => handleWordTap(tok.text)}
                  >
                    {tok.text}
                  </span>
                );
              }
              return <span key={ti}>{tok.text}</span>;
            })}
          </p>
        ))}
      </article>

      <div className="rr-reader-foot">
        <p className="rr-hint">Tap any highlighted word to see its meaning and save it</p>
        {finished ? (
          <p className="rr-finished-msg">✓ You've finished this text</p>
        ) : atEnd ? (
          <button className="rr-mark-read" onClick={finishReading}>
            ✓ Finish
          </button>
        ) : (
          <p className="rr-hint rr-hint-muted">Keep scrolling — your progress saves automatically</p>
        )}
      </div>

      {selected && (
        <WordPopup
          key={selected.token}
          token={selected.token}
          hit={selected.hit}
          lists={lists}
          defaultList={defaultList}
          onSave={handleSave}
          onClose={() => setSelected(null)}
        />
      )}

      {toast && <div className="rr-toast">{toast}</div>}
    </div>
  );
}

// ─── Word popup ─────────────────────────────────────────────────────

function WordPopup({ token, hit, lists, defaultList, onSave, onClose }) {
  // "__new__" is a sentinel for the "+ New list…" option.
  const NEW = "__new__";
  // The chosen list lives HERE (per-popup), seeded from the last-used
  // default. This resets every time a new word opens (the popup is
  // keyed by token), so it never gets stuck on a previous word's choice.
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
    <div className="rr-popup-backdrop" onClick={onClose}>
      <div className="rr-popup" onClick={(e) => e.stopPropagation()}>
        {hit ? (
          <>
            <div className="rr-popup-word">{hit.en}</div>
            <div className="rr-popup-es">{hit.es}</div>
            {hit.pos && <div className="rr-popup-pos">{hit.pos}</div>}

            <div className="rr-popup-picker">
              <label className="rr-popup-picker-label">Save to list</label>
              <select
                className="rr-popup-select"
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
                  className="rr-popup-newname"
                  type="text"
                  placeholder="New list name"
                  value={newName}
                  maxLength={60}
                  onChange={(e) => { setNewName(e.target.value); setSavedMsg(false); }}
                  autoFocus
                />
              )}
            </div>

            <button
              className="rr-popup-save"
              onClick={handleSaveClick}
              disabled={saveDisabled}
            >
              {savedMsg ? "✓ Saved" : "+ Save word"}
            </button>
          </>
        ) : (
          <>
            <div className="rr-popup-word">{normalizeToken(token)}</div>
            <p className="rr-popup-nogloss">
              This word isn't in the glossary yet. The curated glossary
              covers the trickier words in each text.
            </p>
          </>
        )}
        <button className="rr-popup-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// ─── Hooks & helpers ────────────────────────────────────────────────

function useReadingStats() {
  // Read once on mount; the library re-mounts when you come back from
  // the reader, so stats refresh naturally.
  return useMemo(() => {
    const streak = readJson(READING_STREAK_KEY, { count: 0 }).count || 0;
    const progress = readJson(READING_PROGRESS_KEY, {});
    const inProgress = Object.values(progress).filter(
      (p) => p && p.pct > 0 && p.pct < 100
    ).length;
    const wordsSaved = readJson(READING_SAVED_KEY, 0) || 0;
    return { streak, progress, inProgress, wordsSaved };
  }, []);
}

function bumpSavedCount(by) {
  const cur = readJson(READING_SAVED_KEY, 0) || 0;
  writeJson(READING_SAVED_KEY, cur + by);
}

// Build the ordered list of save destinations for the picker:
// "Reading Room words" always first, then the user's other custom
// lists (de-duplicated, in their existing order).
function buildListOptions() {
  const names = getCustomListNames().map((l) => l.name);
  const ordered = [READING_TARGET_LIST_NAME];
  for (const n of names) {
    if (n && !ordered.includes(n)) ordered.push(n);
  }
  return ordered;
}

// Split a paragraph into word / non-word tokens, preserving spaces and
// punctuation so the rendered text reads naturally. Words get tappable
// spans; everything else is plain.
function tokenize(paragraph) {
  const out = [];
  // Match runs of letters (incl. accents, apostrophes, hyphens) as
  // words; everything else (spaces, punctuation) as separators.
  const re = /[A-Za-zÀ-ÿ]+(?:['-][A-Za-zÀ-ÿ]+)*/g;
  let last = 0;
  let mm;
  while ((mm = re.exec(paragraph)) !== null) {
    if (mm.index > last) {
      out.push({ isWord: false, text: paragraph.slice(last, mm.index) });
    }
    out.push({ isWord: true, text: mm[0] });
    last = mm.index + mm[0].length;
  }
  if (last < paragraph.length) {
    out.push({ isWord: false, text: paragraph.slice(last) });
  }
  return out;
}
