// Vocabulary — EOI exam vocabulary practice across 5 themes and 3 levels.
//
// Four practice modes:
//   • Flashcards — flip card EN ↔ ES + example, with text-to-speech.
//   • Quiz       — pick the correct Spanish translation out of 4 options.
//   • Matching   — match shuffled EN words with their ES translations.
//   • Stats      — progress per theme/level, total words learned.
//
// Progress is persisted to localStorage under "iye:vocab:progress" as
//   { "<themeId>-<level>": [word1, word2, …], … }
//
// "Learning" a word means: getting it right in Quiz OR Matching, OR
// marking it Known in Flashcards.

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { VOCAB_THEMES, hasContent, getTotalWordCount } from "../data/vocabulary";
import "../styles/vocabulary.css";

const STORAGE_KEY = "iye:vocab:progress";
const LEVELS = ["B1", "B2", "C1"];
const MODES = [
  { id: "flashcards", label: "🃏 Flashcards" },
  { id: "quiz",       label: "❓ Quiz" },
  { id: "matching",   label: "🔀 Matching" },
  { id: "stats",      label: "📊 Stats" },
];

// --------- progress hook ----------
function useProgress() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const markLearned = (themeId, level, wordEn) => {
    setProgress((p) => {
      const key = `${themeId}-${level}`;
      const existing = p[key] || [];
      if (existing.includes(wordEn)) return p;
      const next = { ...p, [key]: [...existing, wordEn] };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const isLearned = (themeId, level, wordEn) => {
    const key = `${themeId}-${level}`;
    return (progress[key] || []).includes(wordEn);
  };

  const totalLearned = useMemo(
    () => Object.values(progress).reduce((sum, arr) => sum + arr.length, 0),
    [progress]
  );

  return { progress, markLearned, isLearned, totalLearned };
}

// =======================================================================
// Main component
// =======================================================================

export default function Vocabulary() {
  const [theme, setTheme] = useState("cities");
  const [level, setLevel] = useState("B1");
  const [mode, setMode] = useState("flashcards");
  const { progress, markLearned, isLearned, totalLearned } = useProgress();

  const themeData = VOCAB_THEMES[theme];
  const words = themeData?.levels[level] || [];
  const isEmpty = words.length === 0;
  const totalWords = getTotalWordCount();

  return (
    <section className="vocab">
      <div className="vocab-topbar">
        <Link to="/" className="vocab-back">← Back to home</Link>
        <div className="vocab-brand">
          <span className="vocab-brand-mark">🇬🇧 🇺🇸 🇦🇺</span>
          Vocabulary Lab
        </div>
        <div className="vocab-trophy" title="Words learned">
          🏆 <b>{totalLearned}</b>
          <span className="vocab-trophy-total">/ {totalWords}</span>
        </div>
      </div>

      <header className="vocab-hero">
        <div className="vocab-eye">EOI Exam Prep · B1 · B2 · C1</div>
        <h1 className="vocab-h1">Grow your Vocabulary</h1>
        <p className="vocab-sub">
          Essential vocabulary for EOI official exams, organised by theme and
          level. Practise with flashcards, quizzes and matching games.
        </p>
      </header>

      {/* Theme picker */}
      <div className="vocab-themes">
        {Object.entries(VOCAB_THEMES).map(([id, t]) => {
          const hasAny = LEVELS.some((lvl) => hasContent(id, lvl));
          return (
            <button
              key={id}
              className={`vocab-theme ${theme === id ? "vocab-theme-on" : ""} ${!hasAny ? "vocab-theme-soon" : ""}`}
              onClick={() => setTheme(id)}
              style={theme === id ? { borderColor: t.color } : undefined}
            >
              <span className="vocab-theme-icon">{t.icon}</span>
              <span className="vocab-theme-name">{t.name}</span>
              {!hasAny && <span className="vocab-theme-soon-pill">Coming soon</span>}
            </button>
          );
        })}
      </div>

      {/* Level picker */}
      <div className="vocab-levels">
        {LEVELS.map((lvl) => {
          const count = themeData?.levels[lvl]?.length || 0;
          return (
            <button
              key={lvl}
              className={`vocab-level vocab-level-${lvl.toLowerCase()} ${level === lvl ? "vocab-level-on" : ""}`}
              onClick={() => setLevel(lvl)}
              disabled={count === 0}
              title={count === 0 ? "No content yet" : `${count} words`}
            >
              <span className="vocab-level-badge">{lvl}</span>
              <span className="vocab-level-count">{count} words</span>
            </button>
          );
        })}
      </div>

      {/* Mode tabs */}
      <div className="vocab-tabs">
        {MODES.map((m) => (
          <button
            key={m.id}
            className={`vocab-tab ${mode === m.id ? "vocab-tab-on" : ""}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="vocab-content">
        {isEmpty && mode !== "stats" && <EmptyState themeName={themeData?.name} />}

        {!isEmpty && mode === "flashcards" && (
          <Flashcards
            words={words}
            themeId={theme}
            level={level}
            markLearned={markLearned}
            isLearned={isLearned}
          />
        )}

        {!isEmpty && mode === "quiz" && (
          <Quiz
            words={words}
            themeId={theme}
            level={level}
            markLearned={markLearned}
          />
        )}

        {!isEmpty && mode === "matching" && (
          <Matching
            words={words}
            themeId={theme}
            level={level}
            markLearned={markLearned}
          />
        )}

        {mode === "stats" && <Stats progress={progress} />}
      </div>
    </section>
  );
}

// =======================================================================
// Empty state — when a theme/level has no words yet
// =======================================================================

function EmptyState({ themeName }) {
  return (
    <div className="vocab-empty">
      <div className="vocab-empty-icon">🌱</div>
      <h3 className="vocab-empty-h">Coming soon</h3>
      <p className="vocab-empty-p">
        The vocabulary for <strong>{themeName}</strong> at this level is being
        prepared. In the meantime, try <strong>Cities &amp; Urban Life</strong>,
        which is complete across all three levels.
      </p>
    </div>
  );
}

// =======================================================================
// Flashcards mode
// =======================================================================

function Flashcards({ words, themeId, level, markLearned, isLearned }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Reset index when the word list changes (theme/level switch).
  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [words]);

  const word = words[index];

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const go = (dir) => {
    setFlipped(false);
    setIndex((i) => (i + dir + words.length) % words.length);
  };

  const learned = isLearned(themeId, level, word.en);

  return (
    <div className="vocab-fc">
      <div className="vocab-fc-counter">
        Card {index + 1} of {words.length}
      </div>

      <div
        className={`vocab-fc-card ${flipped ? "vocab-fc-flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
      >
        <div className="vocab-fc-inner">
          <div className="vocab-fc-front">
            <div className="vocab-fc-label">English</div>
            <div className="vocab-fc-word">{word.en}</div>
            <button
              type="button"
              className="vocab-fc-speak"
              onClick={(e) => { e.stopPropagation(); speak(word.en); }}
              aria-label="Listen to pronunciation"
            >
              🔊
            </button>
            <div className="vocab-fc-hint">Tap to reveal the translation</div>
          </div>
          <div className="vocab-fc-back">
            <div className="vocab-fc-label">Spanish</div>
            <div className="vocab-fc-word vocab-fc-word-es">{word.es}</div>
            {word.example && (
              <p className="vocab-fc-example">"{word.example}"</p>
            )}
          </div>
        </div>
      </div>

      <div className="vocab-fc-nav">
        <button className="vocab-fc-btn" onClick={() => go(-1)}>
          ← Previous
        </button>
        <button
          className={`vocab-fc-mark ${learned ? "vocab-fc-mark-on" : ""}`}
          onClick={() => markLearned(themeId, level, word.en)}
          disabled={learned}
        >
          {learned ? "✓ Learned" : "Mark as learned"}
        </button>
        <button className="vocab-fc-btn vocab-fc-btn-next" onClick={() => go(1)}>
          Next →
        </button>
      </div>
    </div>
  );
}

// =======================================================================
// Quiz mode — pick the correct Spanish translation
// =======================================================================

function Quiz({ words, themeId, level, markLearned }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);

  // Build a randomised question order on mount or word-list change.
  const order = useMemo(() => {
    const arr = words.map((_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [words]);

  useEffect(() => {
    setIndex(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  }, [words]);

  const word = words[order[index]];

  // Build 4 options: the correct ES translation + 3 distractors.
  const options = useMemo(() => {
    const distractors = words
      .filter((w) => w.en !== word.en)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((w) => w.es);
    const opts = [word.es, ...distractors];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [word, words]);

  const pick = (opt) => {
    if (picked !== null) return;
    setPicked(opt);
    if (opt === word.es) {
      setScore((s) => s + 1);
      markLearned(themeId, level, word.en);
    }
  };

  const next = () => {
    if (index + 1 >= order.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / order.length) * 100);
    return (
      <div className="vocab-qz vocab-qz-done">
        <div className="vocab-qz-trophy">🏆</div>
        <h3>Quiz completed!</h3>
        <div className="vocab-qz-result">
          <span className="vocab-qz-result-n">{score}</span>
          <span className="vocab-qz-result-sl">/ {order.length}</span>
        </div>
        <div className="vocab-qz-pct">{pct}% accuracy</div>
        <button className="vocab-qz-restart" onClick={restart}>
          Play again
        </button>
      </div>
    );
  }

  return (
    <div className="vocab-qz">
      <div className="vocab-qz-hud">
        <span className="vocab-qz-progress">Question {index + 1} / {order.length}</span>
        <span className="vocab-qz-score">⭐ {score}</span>
      </div>

      <div className="vocab-qz-prompt">
        What does <strong className="vocab-qz-word">{word.en}</strong> mean?
      </div>

      <div className="vocab-qz-opts">
        {options.map((opt) => {
          let cls = "vocab-qz-opt";
          if (picked !== null) {
            if (opt === word.es)        cls += " vocab-qz-opt-ok";
            else if (opt === picked)    cls += " vocab-qz-opt-ko";
            else                        cls += " vocab-qz-opt-dim";
          }
          return (
            <button
              key={opt}
              className={cls}
              onClick={() => pick(opt)}
              disabled={picked !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="vocab-qz-feedback">
          {word.example && (
            <p className="vocab-qz-example">
              <span className="vocab-qz-example-lbl">Example:</span>{" "}
              <em>"{word.example}"</em>
            </p>
          )}
          <button className="vocab-qz-next" onClick={next}>
            {index + 1 >= order.length ? "See result →" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

// =======================================================================
// Matching mode — match EN with ES under a 60-second timer
// =======================================================================

function Matching({ words, themeId, level, markLearned }) {
  const [difficulty, setDifficulty] = useState(6);
  const [items, setItems] = useState([]);
  const [shuffledEs, setShuffledEs] = useState([]);
  const [pickedEn, setPickedEn] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [running, setRunning] = useState(false);
  const [wrongPulse, setWrongPulse] = useState(null);
  const timerRef = useRef(null);

  const startGame = () => {
    const n = Math.min(difficulty, words.length);
    const pool = [...words].sort(() => Math.random() - 0.5).slice(0, n);
    setItems(pool);
    setShuffledEs([...pool].sort(() => Math.random() - 0.5));
    setPickedEn(null);
    setMatched(new Set());
    setScore(0);
    setTimeLeft(60);
    setRunning(true);
  };

  // Timer effect
  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [running]);

  // Auto-finish when all pairs matched
  useEffect(() => {
    if (running && matched.size > 0 && matched.size === items.length) {
      clearInterval(timerRef.current);
      setRunning(false);
    }
  }, [matched, items, running]);

  const onClickEn = (word) => {
    if (!running || matched.has(word.en)) return;
    setPickedEn(word.en);
  };

  const onClickEs = (esText) => {
    if (!running || !pickedEn) return;
    const correctEn = items.find((w) => w.en === pickedEn);
    if (correctEn && correctEn.es === esText) {
      const next = new Set(matched);
      next.add(pickedEn);
      setMatched(next);
      setScore((s) => s + 1);
      markLearned(themeId, level, pickedEn);
      setPickedEn(null);
    } else {
      setWrongPulse(esText);
      setTimeout(() => setWrongPulse(null), 450);
      setPickedEn(null);
    }
  };

  // Initial: show difficulty picker until startGame
  if (items.length === 0 && !running) {
    return (
      <div className="vocab-mt vocab-mt-setup">
        <h3>Choose difficulty</h3>
        <p className="vocab-mt-sub">You'll have 60 seconds to match them all.</p>
        <div className="vocab-mt-diff">
          {[4, 6, 8, 10].map((n) => (
            <button
              key={n}
              className={`vocab-mt-diff-btn ${difficulty === n ? "vocab-mt-diff-on" : ""}`}
              onClick={() => setDifficulty(n)}
              disabled={n > words.length}
            >
              {n} pairs
            </button>
          ))}
        </div>
        <button className="vocab-mt-start" onClick={startGame}>
          ▶ Start game
        </button>
      </div>
    );
  }

  const isFinished = !running;
  const allMatched = matched.size === items.length;

  return (
    <div className="vocab-mt">
      <div className="vocab-mt-hud">
        <span className="vocab-mt-time" data-low={timeLeft <= 10}>
          ⏱ {timeLeft}s
        </span>
        <span className="vocab-mt-score">
          {score} / {items.length}
        </span>
      </div>

      <div className="vocab-mt-grid">
        <div className="vocab-mt-col">
          <h4 className="vocab-mt-col-h vocab-mt-col-en">English</h4>
          {items.map((word) => {
            const isMatched = matched.has(word.en);
            const isPicked = pickedEn === word.en;
            let cls = "vocab-mt-cell";
            if (isMatched)      cls += " vocab-mt-done";
            else if (isPicked)  cls += " vocab-mt-picked";
            return (
              <button
                key={word.en}
                className={cls}
                onClick={() => onClickEn(word)}
                disabled={isMatched || !running}
              >
                {word.en}
              </button>
            );
          })}
        </div>
        <div className="vocab-mt-col">
          <h4 className="vocab-mt-col-h vocab-mt-col-es">Spanish</h4>
          {shuffledEs.map((word) => {
            const matchedEs = [...matched].some(
              (en) => items.find((w) => w.en === en)?.es === word.es
            );
            let cls = "vocab-mt-cell";
            if (matchedEs)               cls += " vocab-mt-done";
            if (wrongPulse === word.es)  cls += " vocab-mt-wrong";
            return (
              <button
                key={word.es}
                className={cls}
                onClick={() => onClickEs(word.es)}
                disabled={matchedEs || !running}
              >
                {word.es}
              </button>
            );
          })}
        </div>
      </div>

      {isFinished && (
        <div className="vocab-mt-end">
          {allMatched ? (
            <>
              <div className="vocab-mt-end-emoji">🎉</div>
              <h3>All matched!</h3>
              <p>Time remaining: {timeLeft}s</p>
            </>
          ) : (
            <>
              <div className="vocab-mt-end-emoji">⏱</div>
              <h3>Time's up</h3>
              <p>Matched: {score} out of {items.length}</p>
            </>
          )}
          <button className="vocab-mt-start" onClick={startGame}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

// =======================================================================
// Stats mode
// =======================================================================

function Stats({ progress }) {
  return (
    <div className="vocab-st">
      <h2 className="vocab-st-h">Your progress</h2>
      <div className="vocab-st-grid">
        {Object.entries(VOCAB_THEMES).map(([id, theme]) => {
          const themeTotal = LEVELS.reduce(
            (s, lvl) => s + (theme.levels[lvl]?.length || 0),
            0
          );
          const themeLearned = LEVELS.reduce(
            (s, lvl) => s + (progress[`${id}-${lvl}`]?.length || 0),
            0
          );
          const themePct = themeTotal > 0 ? Math.round((themeLearned / themeTotal) * 100) : 0;

          return (
            <div key={id} className="vocab-st-card">
              <div className="vocab-st-card-h">
                <span className="vocab-st-icon">{theme.icon}</span>
                <span className="vocab-st-name">{theme.name}</span>
              </div>
              <div className="vocab-st-bar">
                <div
                  className="vocab-st-bar-fill"
                  style={{ width: `${themePct}%`, background: theme.color }}
                />
              </div>
              <div className="vocab-st-rows">
                {LEVELS.map((lvl) => {
                  const total = theme.levels[lvl]?.length || 0;
                  const learned = progress[`${id}-${lvl}`]?.length || 0;
                  return (
                    <div key={lvl} className="vocab-st-row">
                      <span className={`vocab-st-lvl vocab-st-lvl-${lvl.toLowerCase()}`}>{lvl}</span>
                      <span className="vocab-st-row-count">
                        {learned} / {total}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="vocab-st-total">
                <span className="vocab-st-total-n">{themePct}%</span>
                <span className="vocab-st-total-l">learned</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
