import { useEffect, useMemo, useRef, useState } from "react";
import WordTiles from "./WordTiles";
import { useProgress } from "../hooks/useProgress";

const shuffle = (a) => a.slice().sort(() => Math.random() - 0.5);

// BuildRunner: drives a series of word-tile build tasks.
//   questions:    [{ sent, words, ans }]
//   progressKey:  optional id (e.g. "inversion/neg") for persistence
//   activity:     "build" by default

export default function BuildRunner({
  questions,
  promptHeader,
  progressKey,
  activity = "build",
}) {
  const set = useMemo(() => shuffle(questions), [questions]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [solved, setSolved] = useState(false);
  const sessionHintsRef = useRef(false);
  const { record } = useProgress();
  const [persisted, setPersisted] = useState(null);

  useEffect(() => {
    if (idx >= set.length && progressKey && !persisted) {
      const res = record(progressKey, activity, score, set.length * 2, sessionHintsRef.current);
      setPersisted(res);
    }
  }, [idx, set.length, progressKey, activity, score, record, persisted]);

  if (idx >= set.length) {
    const total = set.length * 2;
    const pct = Math.round((score / total) * 100);
    let msg;
    if (persisted?.completed) {
      msg = sessionHintsRef.current
        ? "Great work. Try again without hints to mark this complete."
        : "Excellent — ✓ Completed!";
    } else if (pct >= 50) {
      msg = "Solid. Keep practising to reach 75%.";
    } else {
      msg = "Review the Learn tab and try again.";
    }
    return (
      <div className="result-box">
        <div className="result-points">{score}</div>
        <div className="result-of">of {total} points ({pct}%)</div>
        <p className="result-msg">{msg}</p>
        <div className="result-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setIdx(0);
              setScore(0);
              setSolved(false);
              sessionHintsRef.current = false;
              setPersisted(null);
            }}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const q = set[idx];

  const onResult = ({ correct, hintUsed }) => {
    if (correct) setScore((s) => s + (hintUsed ? 1 : 2));
    if (hintUsed) sessionHintsRef.current = true;
    setSolved(true);
  };

  const next = () => {
    setIdx(idx + 1);
    setSolved(false);
  };

  return (
    <div className="build-runner">
      <div className="practice-meta">
        <span>
          ⭐ <b>{score}</b>
        </span>
        <span>
          Item <b>{idx + 1}</b> / {set.length}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(idx / set.length) * 100}%` }}
        />
      </div>

      <div className="question-card">
        {promptHeader && <p className="exercise-instruction">{promptHeader}</p>}
        <p className="quiz-stem">{q.sent}</p>
        <WordTiles key={idx} words={q.words} answer={q.ans} onResult={onResult} />
      </div>

      {solved && (
        <button type="button" className="btn-primary next-btn" onClick={next}>
          {idx + 1 >= set.length ? "See result" : "Next →"}
        </button>
      )}
    </div>
  );
}
