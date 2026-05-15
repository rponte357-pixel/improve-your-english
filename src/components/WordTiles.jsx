import { useState, useEffect, useMemo } from "react";

// Tap-to-order word builder.
// Props:
//   words:        array of strings to display in the pool (in any order)
//   answer:       the correct concatenated answer (compared as joined string)
//   onResult:     callback({ correct: boolean, hintUsed: boolean }) when the
//                 user presses Check and the answer is correct.
//   onReset:      called when the user starts over (after a wrong answer)
//   hintLabel:    text for the hint button (default "Hint")
//   checkLabel:   text for the check button (default "Check")

export default function WordTiles({
  words,
  answer,
  onResult,
  onReset,
  hintLabel = "Hint",
  checkLabel = "Check",
}) {
  // Shuffle once per (words) input
  const shuffled = useMemo(
    () => words.slice().sort(() => Math.random() - 0.5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [words.join("|")]
  );

  const [selected, setSelected] = useState([]); // indices into shuffled
  const [feedback, setFeedback] = useState(null); // "ok" | "ko" | "hint" | null
  const [hintUsed, setHintUsed] = useState(false);
  const [locked, setLocked] = useState(false); // after correct answer

  // Reset internal state when the word list changes (next question)
  useEffect(() => {
    setSelected([]);
    setFeedback(null);
    setHintUsed(false);
    setLocked(false);
  }, [shuffled]);

  const pickWord = (i) => {
    if (locked) return;
    setSelected((s) => [...s, i]);
    if (feedback === "ko") setFeedback(null);
  };
  const removeWord = (pos) => {
    if (locked) return;
    setSelected((s) => s.filter((_, p) => p !== pos));
    if (feedback === "ko") setFeedback(null);
  };
  const clearAll = () => {
    if (locked) return;
    setSelected([]);
    setFeedback(null);
    if (onReset) onReset();
  };

  const check = () => {
    if (!selected.length) {
      setFeedback("empty");
      return;
    }
    const got = selected.map((i) => shuffled[i]).join(" ");
    if (got === answer) {
      setFeedback("ok");
      setLocked(true);
      if (onResult) onResult({ correct: true, hintUsed });
    } else {
      setFeedback("ko");
    }
  };

  const showHint = () => {
    setFeedback("hint");
    setHintUsed(true);
  };

  return (
    <div className="word-tiles">
      <div className={`tile-drop ${selected.length === 0 ? "empty" : ""}`} onClick={() => selected.length && removeWord(selected.length - 1)}>
        {selected.length === 0 ? (
          <span className="tile-placeholder">Your answer here…</span>
        ) : (
          selected.map((i, pos) => (
            <button
              type="button"
              key={`${i}-${pos}`}
              className="tile tile-answer"
              onClick={(e) => {
                e.stopPropagation();
                removeWord(pos);
              }}
              disabled={locked}
            >
              {shuffled[i]}
            </button>
          ))
        )}
      </div>

      {!locked && (
        <div className="tile-clear-row">
          <button type="button" className="link-btn" onClick={clearAll}>
            Clear all
          </button>
        </div>
      )}

      <div className="tile-pool">
        {shuffled.map((w, i) =>
          selected.includes(i) ? null : (
            <button
              type="button"
              key={i}
              className="tile tile-pool-item"
              onClick={() => pickWord(i)}
              disabled={locked}
            >
              {w}
            </button>
          )
        )}
      </div>

      {feedback === "empty" && (
        <div className="feedback hint">Pick the words first.</div>
      )}
      {feedback === "hint" && (
        <div className="feedback hint">
          Hint: the first word is <b>{words[0]}</b>
        </div>
      )}
      {feedback === "ok" && (
        <div className="feedback ok">
          ✓ Correct! {hintUsed ? "(+1 with hint)" : "(+2)"}
        </div>
      )}
      {feedback === "ko" && (
        <div className="feedback ko">✗ Not right. Try again or use the hint.</div>
      )}

      {!locked && (
        <div className="tile-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={showHint}
            disabled={hintUsed}
          >
            💡 {hintLabel}
          </button>
          <button type="button" className="btn-primary" onClick={check}>
            {checkLabel}
          </button>
        </div>
      )}
    </div>
  );
}
