import { useMemo, useRef, useState, useEffect } from "react";
import { useProgress } from "../hooks/useProgress";

const shuffle = (a) => a.slice().sort(() => Math.random() - 0.5);

// QuizRunner: drives a series of multiple-choice questions with progress,
// optional hint button (penalises score), feedback and a result screen.
//
// Each question can be one of:
//   { type: "mcq",   sent, opts: [...strings], ans: string, hint?, exp? }
//   { type: "blank", sent: "… ___ …", opts: [...strings], key: string, hint?, exp? }
//   { type: "stem",  stem: htmlString, opts: [...strings], ans: number (index), hint?, exp? }
//
// Scoring inside the runner: correct without hint = 2, correct with hint = 1,
// wrong = 0. On the result screen we report (correct count / total) and
// separately persist a "no-hint" boolean to the progress store.
//
// Optional props:
//   progressKey  — string id to persist results under (e.g. "inversion/neg")
//   activity     — "quiz" or "build" (passed through to the store)
//   onFinish     — called when the user clicks "Try again" on the result screen

export default function QuizRunner({
  questions,
  progressKey,
  activity = "quiz",
  onFinish,
}) {
  const set = useMemo(
    () =>
      shuffle(questions).map((q) => ({
        ...q,
        shuffledOpts:
          q.type === "stem"
            ? shuffle(q.opts.map((o, i) => ({ o, i })))
            : shuffle(q.opts),
      })),
    [questions]
  );

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);     // current question
  const [showHint, setShowHint] = useState(false);
  const sessionHintsRef = useRef(false);                // any hint used in session?
  const { record } = useProgress();
  const [persisted, setPersisted] = useState(null);     // record result for the final screen

  // Persist when reaching the result screen.
  useEffect(() => {
    if (idx >= set.length && progressKey && !persisted) {
      // Score is points (max = set.length * 2). The progress hook treats it
      // as a fraction of the max for completion threshold purposes.
      const res = record(progressKey, activity, score, set.length * 2, sessionHintsRef.current);
      setPersisted(res);
    }
  }, [idx, set.length, progressKey, activity, score, record, persisted]);

  if (idx >= set.length) {
    return (
      <Result
        score={score}
        total={set.length * 2}
        completed={persisted?.completed}
        hintsUsed={sessionHintsRef.current}
        onRetry={() => {
          setIdx(0);
          setScore(0);
          setPicked(null);
          setHintUsed(false);
          setShowHint(false);
          sessionHintsRef.current = false;
          setPersisted(null);
          if (onFinish) onFinish();
        }}
      />
    );
  }

  const q = set[idx];
  const isCorrect = isAnswerCorrect(q, picked);

  const answer = (value) => {
    if (picked !== null) return;
    setPicked(value);
    const correct = isAnswerCorrect(q, value);
    if (correct) setScore((s) => s + (hintUsed ? 1 : 2));
  };

  const next = () => {
    setIdx(idx + 1);
    setPicked(null);
    setHintUsed(false);
    setShowHint(false);
  };

  return (
    <div className="quiz-runner">
      <div className="practice-meta">
        <span>
          ⭐ <b>{score}</b>
        </span>
        <span>
          Question <b>{idx + 1}</b> / {set.length}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(idx / set.length) * 100}%` }}
        />
      </div>

      <QuestionView q={q} picked={picked} onAnswer={answer} />

      {showHint && q.hint && (
        <div className="feedback hint">💡 {q.hint}</div>
      )}
      {picked !== null && (
        <div className={`feedback ${isCorrect ? "ok" : "ko"}`}>
          {isCorrect ? (
            <>
              ✓ Correct{hintUsed ? " (no points: hint used)" : " (+2)"}.
              {q.exp ? " " + q.exp : ""}
            </>
          ) : (
            <>
              <strong>✗ Incorrect.</strong>
              {q.exp ? " " + q.exp : " (No explanation available for this question.)"}
            </>
          )}
        </div>
      )}

      <div className="tile-actions">
        {q.hint && (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setShowHint(true);
              setHintUsed(true);
              sessionHintsRef.current = true;
            }}
            disabled={hintUsed || picked !== null}
          >
            💡 Hint
          </button>
        )}
        <button
          type="button"
          className="btn-primary"
          onClick={next}
          disabled={picked === null}
        >
          {idx + 1 >= set.length ? "See result" : "Next →"}
        </button>
      </div>
    </div>
  );
}

function isAnswerCorrect(q, value) {
  if (value === null || value === undefined) return false;
  if (q.type === "mcq") return value === q.ans;
  if (q.type === "blank") return value === q.key;
  if (q.type === "stem") return value === q.ans;
  return false;
}

function QuestionView({ q, picked, onAnswer }) {
  if (q.type === "mcq") {
    return (
      <div className="question-card">
        <p className="quiz-stem">{q.sent}</p>
        <div className="exercise-options">
          {q.shuffledOpts.map((o) => {
            const status =
              picked === null
                ? ""
                : o === q.ans
                ? "correct"
                : o === picked
                ? "wrong"
                : "";
            return (
              <button
                type="button"
                key={o}
                className={`option-btn ${status}`}
                onClick={() => onAnswer(o)}
                disabled={picked !== null}
              >
                {o}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (q.type === "blank") {
    const [before, after] = q.sent.split("___");
    const blankClass = !picked
      ? "blank"
      : picked === q.key
      ? "blank correct"
      : "blank wrong";
    return (
      <div className="question-card">
        <p className="quiz-stem">
          {before}
          <span className={blankClass}>{picked || "___"}</span>
          {after}
        </p>
        <div className="exercise-options">
          {q.shuffledOpts.map((o) => {
            const status =
              picked === null
                ? ""
                : o === q.key
                ? "correct"
                : o === picked
                ? "wrong"
                : "";
            return (
              <button
                type="button"
                key={o}
                className={`option-btn ${status}`}
                onClick={() => onAnswer(o)}
                disabled={picked !== null}
              >
                {o}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (q.type === "stem") {
    return (
      <div className="question-card">
        <p className="quiz-stem" dangerouslySetInnerHTML={{ __html: q.stem }} />
        <div className="exercise-options">
          {q.shuffledOpts.map(({ o, i }) => {
            const status =
              picked === null
                ? ""
                : i === q.ans
                ? "correct"
                : i === picked
                ? "wrong"
                : "";
            return (
              <button
                type="button"
                key={i}
                className={`option-btn ${status}`}
                onClick={() => onAnswer(i)}
                disabled={picked !== null}
              >
                {o}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

function Result({ score, total, completed, hintsUsed, onRetry }) {
  const pct = total === 0 ? 0 : Math.round((score / total) * 100);
  let msg;
  if (completed) {
    msg = hintsUsed
      ? "Great work. Try again without hints to mark this complete."
      : "Excellent — you've mastered this. ✓ Completed!";
  } else if (pct >= 50) {
    msg = "Good work. Keep practising to reach 75%.";
  } else {
    msg = "Review the Learn tab and try again.";
  }
  return (
    <div className="result-box">
      <div className="result-points">{score}</div>
      <div className="result-of">of {total} points ({pct}%)</div>
      <p className="result-msg">{msg}</p>
      <div className="result-actions">
        <button type="button" className="btn-primary" onClick={onRetry}>
          Try again
        </button>
      </div>
    </div>
  );
}
