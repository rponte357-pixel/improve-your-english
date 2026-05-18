// Vocabulary — EOI exam vocabulary practice, organised in 4 thematic blocks.
//
// Navigation flow:
//   1. BlockSelector  — 4 large bubbles (Daily Life, Identity & Science,
//                       Politics & History, Economy & Challenges)
//   2. ThemeView      — pills with the 3-5 themes inside the chosen block,
//                       plus level picker, mode tabs, and the practice area
//
// Click a block bubble → it "crashes" (200ms shake then explodes into ~20
// coloured particles using a canvas), then the ThemeView renders.
//
// Four practice modes inside ThemeView:
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
import {
  VOCAB_THEMES,
  BLOCKS,
  hasContent,
  getTotalWordCount,
} from "../data/vocabulary";
import MyListsView from "../components/MyListsView";
import "../styles/vocabulary.css";

// ─────────────────────────────────────────────────────────────────────
// The "My Vocabulary" custom block is NOT defined in data/vocabulary.js.
// It lives here as a local pseudo-block so that:
//   • BLOCKS (the EOI data) stays pure — used by getTotalWordCount()
//     and other helpers without leaking custom-list concepts.
//   • The BlockSelector can render 5 bubbles using the same code path.
//   • The crash animation reuses the same gradients/particle colours
//     machinery as the 4 themed bubbles.
//
// This block has NO themeIds and NO levels because clicking it routes
// to MyListsView (custom lists) rather than ThemeView (EOI themes).
// =====================================================================
const CUSTOM_BLOCK_ID = "custom";
const CUSTOM_BLOCK = {
  id: CUSTOM_BLOCK_ID,
  name: "My Vocabulary",
  // The eyebrow "🗂️" is rendered by CSS on .vocab-block-custom::before
  // (so the static bubble matches the Phrases-card layout). This icon
  // is the one shown during the crash overlay, where the ::before is
  // disabled by the [data-block-id="custom"] rules — keep them in sync.
  icon: "🗂️",
  // The bubble itself is flat cream + terracotta border (Phrases-card
  // style) via CSS. These gradient stops are still used by the crash
  // animation overlay, which reuses the same .vocab-block visuals.
  gradientFrom: "#F8F4EE",
  gradientTo:   "#EDE7DB",
  // Particles when the bubble bursts: warm beiges + terracotta accent.
  // Stays in palette with the new bubble look so the transition feels
  // intentional rather than a colour clash.
  particleColors: ["#B5451B", "#D8A88A", "#EDE7DB", "#C9963A"],
  themeIds: [],
  levels: [],
};

const STORAGE_KEY = "iye:vocab:progress";
// All possible levels. Each block exposes its own subset via block.levels
// (Block 1 has B1/B2/C1; Blocks 2-4 also include C2).
const ALL_LEVELS = ["B1", "B2", "C1", "C2"];
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
// Main component — owns block selection and progress; delegates the actual
// theme/level/mode UI to <ThemeView> once a block is chosen.
// =======================================================================

export default function Vocabulary() {
  // null = show the BlockSelector. Otherwise it's a block id from BLOCKS
  // or the CUSTOM_BLOCK_ID for the user's custom lists.
  const [selectedBlock, setSelectedBlock] = useState(null);
  const { progress, markLearned, isLearned, totalLearned } = useProgress();
  const totalWords = getTotalWordCount();

  // Resolve the selected block. We look in EOI BLOCKS first, then fall
  // back to the local CUSTOM_BLOCK so the same selector state value
  // works for both worlds.
  const block =
    selectedBlock === CUSTOM_BLOCK_ID
      ? CUSTOM_BLOCK
      : selectedBlock
      ? BLOCKS[selectedBlock]
      : null;

  const isCustom = block && block.id === CUSTOM_BLOCK_ID;

  return (
    <section className="vocab">
      <div className="vocab-topbar">
        <Link to="/" className="vocab-back">← Back to home</Link>
        <div className="vocab-brand">
          <span className="vocab-brand-mark">🇬🇧 🇺🇸 🇦🇺</span>
          Vocabulary Lab
        </div>
        <div className="vocab-trophy" title="Words learned (EOI blocks)">
          🏆 <b>{totalLearned}</b>
          <span className="vocab-trophy-total">/ {totalWords}</span>
        </div>
      </div>

      {!block && (
        <BlockSelector onPick={(id) => setSelectedBlock(id)} />
      )}

      {block && isCustom && (
        <MyListsView
          onBack={() => setSelectedBlock(null)}
          onOpenList={(_listId) => {
            // The actual editor / study view for a specific custom list
            // is implemented in Round A3 (editor) and A4 (modes).
            // For now, surface a friendly notice rather than navigate
            // nowhere — keeps the prototype honest.
            // eslint-disable-next-line no-alert
            window.alert(
              "Opening individual lists arrives in the next round (A3).\n\n" +
              "For now you can create, see and delete lists here."
            );
          }}
        />
      )}

      {block && !isCustom && (
        <ThemeView
          block={block}
          onBack={() => setSelectedBlock(null)}
          progress={progress}
          markLearned={markLearned}
          isLearned={isLearned}
        />
      )}
    </section>
  );
}

// =======================================================================
// BlockSelector — 4 large bubbles, one per thematic block.
// Clicking a bubble triggers the crash animation and then calls onPick.
// =======================================================================

function BlockSelector({ onPick }) {
  // While a bubble is crashing we hide everything else and let the
  // BubbleCrash component own the screen. Stores the id of the block
  // being crashed, or null while idle.
  const [crashingId, setCrashingId] = useState(null);

  const handleClick = (id) => {
    if (crashingId) return; // ignore other clicks mid-crash
    setCrashingId(id);
  };

  const handleCrashEnd = (id) => {
    setCrashingId(null);
    onPick(id);
  };

  // Resolve the block being crashed: EOI block or the custom one.
  const crashingBlock =
    crashingId === CUSTOM_BLOCK_ID
      ? CUSTOM_BLOCK
      : crashingId
      ? BLOCKS[crashingId]
      : null;

  return (
    <>
      <header className="vocab-hero">
        <div className="vocab-eye">EOI Exam Prep · B1 · B2 · C1 · C2</div>
        <h1 className="vocab-h1">Grow your Vocabulary</h1>
        <p className="vocab-sub">
          Choose a thematic block to start. Each block groups related topics
          you'll see across EOI exams.
        </p>
      </header>

      <div className="vocab-blocks vocab-blocks-with-custom">
        {Object.values(BLOCKS).map((b) => {
          // Count words available in this block to decide whether it's
          // marked "ready" or "coming soon".
          const wordCount = b.themeIds.reduce((sum, themeId) => {
            const theme = VOCAB_THEMES[themeId];
            if (!theme) return sum;
            return sum + Object.values(theme.levels).reduce(
              (s, arr) => s + arr.length, 0
            );
          }, 0);
          const ready = wordCount > 0;

          // Preview text: list of theme names inside this block.
          const previewThemes = b.themeIds
            .map((id) => VOCAB_THEMES[id]?.name?.split(" & ")[0]
                          || VOCAB_THEMES[id]?.name)
            .filter(Boolean);

          // Render an invisible placeholder while this specific block is
          // crashing — keeps the grid layout stable.
          const isCrashing = crashingId === b.id;

          return (
            <button
              key={b.id}
              className={`vocab-block ${ready ? "" : "vocab-block-soon"} ${isCrashing ? "vocab-block-crashing" : ""}`}
              data-block-id={b.id}
              style={{
                "--block-from": b.gradientFrom,
                "--block-to":   b.gradientTo,
              }}
              onClick={() => handleClick(b.id)}
              disabled={!!crashingId}
            >
              <div className="vocab-block-icon">{b.icon}</div>
              <div className="vocab-block-title">{b.name}</div>
              <div className="vocab-block-preview">
                {previewThemes.join(" · ")}
              </div>
              <div className="vocab-block-badge">
                {ready ? `${b.themeIds.length} THEMES` : "COMING SOON"}
              </div>
            </button>
          );
        })}

        {/* 5th bubble — the user's own vocabulary lists.
            Visually it lives in the same grid as the 4 EOI bubbles, with
            its own amber-gold gradient. Sits centred in the 2nd row on
            desktop (via .vocab-blocks-with-custom .vocab-block-custom). */}
        <button
          key={CUSTOM_BLOCK.id}
          className={`vocab-block vocab-block-custom ${crashingId === CUSTOM_BLOCK.id ? "vocab-block-crashing" : ""}`}
          data-block-id={CUSTOM_BLOCK.id}
          style={{
            "--block-from": CUSTOM_BLOCK.gradientFrom,
            "--block-to":   CUSTOM_BLOCK.gradientTo,
          }}
          onClick={() => handleClick(CUSTOM_BLOCK.id)}
          disabled={!!crashingId}
        >
          <div className="vocab-block-icon">{CUSTOM_BLOCK.icon}</div>
          <div className="vocab-block-title">{CUSTOM_BLOCK.name}</div>
          <div className="vocab-block-preview">
            Your own word lists
          </div>
          <div className="vocab-block-badge">
            YOURS
          </div>
        </button>
      </div>

      {crashingBlock && (
        <BubbleCrash
          block={crashingBlock}
          onEnd={() => handleCrashEnd(crashingId)}
        />
      )}
    </>
  );
}

// =======================================================================
// BubbleCrash — full-screen overlay that animates the chosen bubble
// shaking, scaling up, fading out, and emitting ~20 coloured particles
// before invoking onEnd. Uses a canvas for the particle system.
// =======================================================================

function BubbleCrash({ block, onEnd }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("shake"); // shake → burst → done

  useEffect(() => {
    const shakeT = setTimeout(() => setPhase("burst"), 200);
    return () => clearTimeout(shakeT);
  }, []);

  useEffect(() => {
    if (phase !== "burst") return;
    const canvas = canvasRef.current;
    if (!canvas) { onEnd(); return; }

    // Size the canvas to the viewport pixel-for-pixel.
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width  = w + "px";
    canvas.style.height = h + "px";
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    // Emit 20 particles from the centre of the screen with random
    // outward velocity + a small upward bias.
    const N = 20;
    const cx = w / 2;
    const cy = h / 2;
    const particles = [];
    for (let i = 0; i < N; i++) {
      const angle = (Math.PI * 2 * i) / N + (Math.random() - 0.5) * 0.4;
      const speed = 4 + Math.random() * 5;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        r: 5 + Math.random() * 7,
        color: block.particleColors[Math.floor(Math.random() * block.particleColors.length)],
        life: 1.0,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.3,
      });
    }

    let raf;
    let ended = false;
    const safelyEnd = () => {
      if (ended) return;
      ended = true;
      onEnd();
    };

    // Safety net: in the worst case (browser bug, ctx error, weird device),
    // the animation must not strand the user. Force-end after 2s.
    const safetyTimer = setTimeout(safelyEnd, 2000);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      let alive = false;
      for (const p of particles) {
        if (p.life <= 0) continue;
        alive = true;
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.22;       // gravity
        p.vx *= 0.99;       // horizontal drag
        p.rot += p.vrot;
        p.life -= 0.018;

        // p.life can dip below 0 on the same frame it gets decremented, and
        // arc() throws on a negative radius. Clamp so the particle simply
        // collapses to 0 size on its last frame instead of crashing the
        // animation loop (which is what was breaking the second click).
        const radius = Math.max(0, p.r * p.life);
        if (radius <= 0) continue;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      if (alive) {
        raf = requestAnimationFrame(tick);
      } else {
        safelyEnd();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safetyTimer);
    };
  }, [phase, block, onEnd]);

  return (
    <div className="vocab-crash-overlay">
      <div
        className={`vocab-crash-bubble ${phase === "shake" ? "vocab-crash-shake" : "vocab-crash-burst"}`}
        data-block-id={block.id}
        style={{
          "--block-from": block.gradientFrom,
          "--block-to":   block.gradientTo,
        }}
      >
        <div className="vocab-block-icon">{block.icon}</div>
        <div className="vocab-block-title">{block.name}</div>
      </div>
      <canvas ref={canvasRef} className="vocab-crash-canvas" />
    </div>
  );
}

// =======================================================================
// ThemeView — the original screen (themes + levels + modes + practice),
// now scoped to a single block. Shows a "← Back to blocks" button.
// =======================================================================

function ThemeView({ block, onBack, progress, markLearned, isLearned }) {
  // Default to the first theme of this block.
  const [theme, setTheme] = useState(block.themeIds[0]);
  const [level, setLevel] = useState(block.levels[0]);
  const [mode, setMode] = useState("flashcards");

  // If the user comes back into a different block, reset the selection.
  useEffect(() => {
    setTheme(block.themeIds[0]);
    setLevel(block.levels[0]);
    setMode("flashcards");
  }, [block]);

  const themeData = VOCAB_THEMES[theme];
  const words = themeData?.levels[level] || [];
  const isEmpty = words.length === 0;

  return (
    <>
      <div className="vocab-blocknav">
        <button className="vocab-blocknav-back" onClick={onBack}>
          ← Back to blocks
        </button>
        <div className="vocab-blocknav-title">
          <span className="vocab-blocknav-icon">{block.icon}</span>
          <span>{block.name}</span>
        </div>
        <div className="vocab-blocknav-spacer" />
      </div>

      {/* Theme picker — only themes that belong to this block */}
      <div className="vocab-themes">
        {block.themeIds.map((id) => {
          const t = VOCAB_THEMES[id];
          if (!t) return null;
          const hasAny = block.levels.some((lvl) => hasContent(id, lvl));
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

      {/* Level picker — only the levels this block exposes */}
      <div className="vocab-levels">
        {block.levels.map((lvl) => {
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

        {mode === "stats" && <Stats progress={progress} block={block} />}
      </div>
    </>
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

  // Reset to setup screen whenever the theme or level changes (i.e. the
  // `words` prop is replaced with a different list). Without this, the
  // previous game's end state would linger and the user would be stuck
  // seeing the wrong content until they switched mode.
  useEffect(() => {
    setItems([]);
    setShuffledEs([]);
    setPickedEn(null);
    setMatched(new Set());
    setScore(0);
    setTimeLeft(60);
    setRunning(false);
    setWrongPulse(null);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [words]);

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

function Stats({ progress, block }) {
  // When invoked from ThemeView we always receive a block — scope the
  // stats to its themes and levels. Defensive default for safety.
  const themeIds = block ? block.themeIds : Object.keys(VOCAB_THEMES);
  const levels   = block ? block.levels   : ALL_LEVELS;

  return (
    <div className="vocab-st">
      <h2 className="vocab-st-h">Your progress</h2>
      <div className="vocab-st-grid">
        {themeIds.map((id) => {
          const theme = VOCAB_THEMES[id];
          if (!theme) return null;
          const themeTotal = levels.reduce(
            (s, lvl) => s + (theme.levels[lvl]?.length || 0),
            0
          );
          const themeLearned = levels.reduce(
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
                {levels.map((lvl) => {
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
