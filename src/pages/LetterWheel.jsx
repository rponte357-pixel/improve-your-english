// ─── LetterWheel — find words by tapping letters in a circular wheel ───
//
// Mobile-first word game. A circular wheel shows N letters; the user
// taps them in sequence to build words. Words are validated against a
// fixed list. Optional hints guide the user.
//
// Props:
//   exercise: {
//     type: "letter_wheel",
//     prompt: "Find these words using the letters",
//     letters: ["A","E","I","M","R","S"],   // 5-8 letters
//     words: [                                 // valid words to find
//       { word: "AM",  hint: "Yo soy / estoy" },
//       { word: "IS",  hint: "Él/ella es / está" },
//       { word: "ARE", hint: "Nosotros somos / estamos" },
//     ],
//     explanation: "..."  // shown at the end
//   }
//   onAnswer(given, correct)  // called when all words are found OR user gives up
//
// Behaviour:
//   - User taps letters → they appear in the "current" row.
//   - Tap "Check" or letters until match → if valid + not found yet, fill the slot.
//   - Wrong/dup → red flash and clear.
//   - Find all words → bonus animation + onAnswer(true).
//   - "Give up" / "Skip" → reveals remaining words, onAnswer(false).
//   - "Hint" → reveals one letter of an unfound word (cost: visible to user).

import { useState, useEffect, useMemo, useRef } from "react";

export default function LetterWheel({ exercise, showFeedback, userAnswer, onAnswer }) {
  const totalWords = exercise.words.length;

  const [current, setCurrent] = useState([]);     // letters tapped, e.g. ["A","M"]
  const [foundIds, setFoundIds] = useState([]);   // indices of found words
  const [flash, setFlash] = useState(null);       // "ok" | "ko" | "dup" | null
  const [hintsUsed, setHintsUsed] = useState({}); // {wordIdx: letterCount revealed}
  const [gaveUp, setGaveUp] = useState(false);

  // Reset on new exercise
  useEffect(() => {
    setCurrent([]);
    setFoundIds([]);
    setFlash(null);
    setHintsUsed({});
    setGaveUp(false);
  }, [exercise]);

  // Wheel layout — compute positions in a circle
  const positions = useMemo(
    () => computeWheelPositions(exercise.letters.length, 110),
    [exercise.letters.length]
  );

  // Stable lookup: word → index
  const wordIndex = useMemo(() => {
    const map = new Map();
    exercise.words.forEach((w, i) => map.set(normalize(w.word), i));
    return map;
  }, [exercise.words]);

  function tapLetter(letter) {
    if (showFeedback || gaveUp) return;
    setCurrent([...current, letter]);
    setFlash(null);
  }

  function clearCurrent() {
    setCurrent([]);
    setFlash(null);
  }

  function backspace() {
    if (current.length === 0) return;
    setCurrent(current.slice(0, -1));
    setFlash(null);
  }

  function checkWord() {
    if (current.length === 0) return;
    const word = current.join("");
    const idx = wordIndex.get(normalize(word));
    if (idx === undefined) {
      // Not a valid word
      setFlash("ko");
      setTimeout(() => { setCurrent([]); setFlash(null); }, 600);
      return;
    }
    if (foundIds.includes(idx)) {
      // Already found
      setFlash("dup");
      setTimeout(() => { setCurrent([]); setFlash(null); }, 600);
      return;
    }
    // Found it!
    setFlash("ok");
    const newFound = [...foundIds, idx];
    setFoundIds(newFound);
    setTimeout(() => { setCurrent([]); setFlash(null); }, 500);

    // All found?
    if (newFound.length === totalWords) {
      setTimeout(() => onAnswer(newFound.length, true), 800);
    }
  }

  function useHint() {
    // Reveal one letter of the first unfound word.
    const firstUnfound = exercise.words.findIndex((_, i) => !foundIds.includes(i));
    if (firstUnfound === -1) return;
    const revealed = (hintsUsed[firstUnfound] || 0) + 1;
    setHintsUsed({ ...hintsUsed, [firstUnfound]: revealed });
  }

  function giveUp() {
    setGaveUp(true);
    // Reveal everything
    setTimeout(() => onAnswer(foundIds.length, foundIds.length === totalWords), 400);
  }

  // Build the slots display
  const slots = exercise.words.map((w, i) => {
    const found = foundIds.includes(i);
    const revealed = hintsUsed[i] || 0;
    return { word: w.word, hint: w.hint, found, revealed };
  });

  return (
    <div className="lw-container">
      <div className="lw-label">LETTER WHEEL</div>
      <div className="lw-prompt">{exercise.prompt}</div>

      {/* Score */}
      <div className="lw-score">
        {foundIds.length} / {totalWords} found
        {Object.keys(hintsUsed).length > 0 && (
          <span className="lw-hints-used"> · {Object.keys(hintsUsed).length} hints used</span>
        )}
      </div>

      {/* Word slots */}
      <div className="lw-slots">
        {slots.map((s, i) => (
          <WordSlot key={i} slot={s} revealed={gaveUp || showFeedback} />
        ))}
      </div>

      {/* Current word being built */}
      <div className={`lw-current lw-current-${flash || "idle"}`}>
        {current.length === 0
          ? <span className="lw-current-placeholder">Tap letters below…</span>
          : current.map((l, i) => <span key={i} className="lw-current-letter">{l}</span>)
        }
      </div>

      {/* Wheel */}
      <div className="lw-wheel">
        {exercise.letters.map((letter, i) => (
          <button
            key={i}
            type="button"
            className="lw-letter"
            style={{
              left: `calc(50% + ${positions[i].x}px)`,
              top:  `calc(50% + ${positions[i].y}px)`,
            }}
            onClick={() => tapLetter(letter)}
            disabled={showFeedback || gaveUp}
          >
            {letter}
          </button>
        ))}
        {/* Center button: Check */}
        <button
          type="button"
          className="lw-center"
          onClick={checkWord}
          disabled={current.length === 0 || showFeedback || gaveUp}
          aria-label="Check word"
        >
          ✓
        </button>
      </div>

      {/* Controls */}
      <div className="lw-controls">
        <button type="button" className="lw-control-btn" onClick={backspace} disabled={current.length === 0 || showFeedback || gaveUp}>
          ⌫ Delete
        </button>
        <button type="button" className="lw-control-btn" onClick={clearCurrent} disabled={current.length === 0 || showFeedback || gaveUp}>
          Clear
        </button>
        <button type="button" className="lw-control-btn lw-control-hint" onClick={useHint} disabled={foundIds.length === totalWords || showFeedback || gaveUp}>
          💡 Hint
        </button>
      </div>

      {!gaveUp && !showFeedback && foundIds.length < totalWords && (
        <button type="button" className="lw-giveup" onClick={giveUp}>
          Give up & see answers
        </button>
      )}
    </div>
  );
}

// ─── Word slot (the slots showing what to find) ──────────────────────

function WordSlot({ slot, revealed }) {
  const letters = slot.word.toUpperCase().split("");
  const showAll = slot.found || revealed;
  return (
    <div className={`lw-slot ${slot.found ? "lw-slot-found" : ""} ${revealed && !slot.found ? "lw-slot-revealed" : ""}`}>
      <div className="lw-slot-letters">
        {letters.map((letter, i) => {
          const shouldShow = showAll || i < slot.revealed;
          return (
            <span key={i} className="lw-slot-box">
              {shouldShow ? letter : ""}
            </span>
          );
        })}
      </div>
      {slot.hint && (
        <div className="lw-slot-hint">{slot.hint}</div>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────

function normalize(s) {
  return String(s).trim().toUpperCase();
}

// Compute positions on a circle, radius `r` from centre.
// Returns [{x, y}, ...]. Each letter is offset to center the button
// (button is 48px → 24px offset).
function computeWheelPositions(n, r) {
  const out = [];
  const buttonSize = 48; // matches CSS
  const half = buttonSize / 2;
  for (let i = 0; i < n; i++) {
    // Start from top (-90deg), go clockwise.
    const angle = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
    out.push({
      x: Math.cos(angle) * r - half,
      y: Math.sin(angle) * r - half,
    });
  }
  return out;
}
