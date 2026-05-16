// InversionsGame — adapted from the standalone HTML game to a React
// component. Same 5 question types, same 28 questions, same gamification
// (score, streak, lives, end-game stats).
//
// Differences from the original:
//   • Routing is React Router (Link / useNavigate), not screen switching.
//   • State lives in useState/useReducer instead of module-level vars.
//   • Confetti is a small canvas rendered via useEffect when correct.
//   • Best score persists to localStorage under "iye:games:inversions:best".

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { QUESTIONS, JOKES } from "../data/inversions-game";
import "../styles/games.css";

const STORAGE_BEST = "iye:games:inversions:best";
const STORAGE_PLAYED = "iye:games:inversions:played";

// Pick & shuffle a subset of questions for the chosen mode.
function buildRound(mode) {
  let pool;
  if (mode === "all")      pool = QUESTIONS.slice();
  else if (mode === "mix") pool = QUESTIONS.slice();
  else                      pool = QUESTIONS.filter((q) => q.level === mode);

  // Fisher-Yates shuffle for proper randomness.
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  // Speed Mix takes only 10 questions; the rest take up to 20.
  return mode === "mix" ? pool.slice(0, 10) : pool.slice(0, 20);
}

function readNumber(key, fallback = 0) {
  try {
    return parseInt(window.localStorage.getItem(key) || String(fallback), 10);
  } catch {
    return fallback;
  }
}

function writeNumber(key, value) {
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    /* ignore */
  }
}

export default function InversionsGame() {
  const [phase, setPhase] = useState("home"); // home | play | end
  const [mode, setMode]   = useState(null);
  const [round, setRound] = useState([]);
  const [cur, setCur]     = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [perf, setPerf] = useState({ B1: { c: 0, t: 0 }, B2: { c: 0, t: 0 }, C1: { c: 0, t: 0 } });

  const bestScore = readNumber(STORAGE_BEST);
  const played    = readNumber(STORAGE_PLAYED);

  const startGame = (m) => {
    setMode(m);
    setRound(buildRound(m));
    setCur(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrect(0);
    setPerf({ B1: { c: 0, t: 0 }, B2: { c: 0, t: 0 }, C1: { c: 0, t: 0 } });
    setPhase("play");
  };

  const onAnswer = (isCorrect, points, q) => {
    setPerf((p) => ({
      ...p,
      [q.level]: { c: p[q.level].c + (isCorrect ? 1 : 0), t: p[q.level].t + 1 },
    }));
    if (isCorrect) {
      setScore((s) => s + points);
      setStreak((s) => {
        const ns = s + 1;
        setBestStreak((bs) => (ns > bs ? ns : bs));
        return ns;
      });
      setCorrect((c) => c + 1);
    } else {
      setStreak(0);
    }
  };

  const onNext = () => {
    if (cur + 1 >= round.length) {
      // End of round — persist stats.
      writeNumber(STORAGE_BEST, Math.max(score, bestScore));
      writeNumber(STORAGE_PLAYED, played + 1);
      setPhase("end");
    } else {
      setCur((c) => c + 1);
    }
  };

  return (
    <section className="games games-inv">
      <div className="games-topbar">
        <Link to="/games" className="games-back">
          ← Back to arcade
        </Link>
        <div className="games-brand">
          <span className="games-brand-mark">🔄</span> Master Inversions
        </div>
      </div>

      {phase === "home" && (
        <HomeScreen
          onStart={startGame}
          bestScore={bestScore}
          played={played}
        />
      )}

      {phase === "play" && round.length > 0 && (
        <PlayScreen
          q={round[cur]}
          index={cur}
          total={round.length}
          score={score}
          streak={streak}
          onAnswer={onAnswer}
          onNext={onNext}
        />
      )}

      {phase === "end" && (
        <EndScreen
          score={score}
          correct={correct}
          total={round.length}
          bestStreak={bestStreak}
          perf={perf}
          newBest={score > bestScore}
          onAgain={() => setPhase("home")}
        />
      )}
    </section>
  );
}

// -----------------------------------------------------------------------
// Home
// -----------------------------------------------------------------------

function HomeScreen({ onStart, bestScore, played }) {
  return (
    <div className="inv-home">
      <div className="inv-logo">Master Inversions</div>
      <div className="inv-sub">Train your ear for advanced sentence structure</div>

      <div className="inv-card">
        <h3>Pick your challenge</h3>

        <button className="inv-mode" onClick={() => onStart("all")}>
          <span className="inv-mode-ico">🎯</span>
          <span className="inv-mode-info">
            <strong>Full Game</strong>
            <span>All levels · 20 questions · 5 types</span>
          </span>
          <span className="inv-mode-badge inv-badge-all">ALL</span>
        </button>

        <button className="inv-mode" onClick={() => onStart("B1")}>
          <span className="inv-mode-ico">🌱</span>
          <span className="inv-mode-info">
            <strong>B1 Practice</strong>
            <span>Beginner inversions: So/Neither, Here/There</span>
          </span>
          <span className="inv-mode-badge inv-badge-b1">B1</span>
        </button>

        <button className="inv-mode" onClick={() => onStart("B2")}>
          <span className="inv-mode-ico">🚀</span>
          <span className="inv-mode-info">
            <strong>B2 Practice</strong>
            <span>Conditional, Not until, Hardly, Only then…</span>
          </span>
          <span className="inv-mode-badge inv-badge-b2">B2</span>
        </button>

        <button className="inv-mode" onClick={() => onStart("C1")}>
          <span className="inv-mode-ico">✨</span>
          <span className="inv-mode-info">
            <strong>C1 Mastery</strong>
            <span>Not only, So + adj, Subjunctive, Such was…</span>
          </span>
          <span className="inv-mode-badge inv-badge-c1">C1</span>
        </button>

        <button className="inv-mode" onClick={() => onStart("mix")}>
          <span className="inv-mode-ico">⚡</span>
          <span className="inv-mode-info">
            <strong>Speed Mix</strong>
            <span>10 random questions — beat your best score</span>
          </span>
          <span className="inv-mode-badge inv-badge-mix">MIX</span>
        </button>
      </div>

      <div className="inv-stats">
        <div className="inv-stat">
          <div className="inv-stat-n">{bestScore}</div>
          <div className="inv-stat-l">Best score</div>
        </div>
        <div className="inv-stat">
          <div className="inv-stat-n">{played}</div>
          <div className="inv-stat-l">Games played</div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Play screen — dispatches to the right question type
// -----------------------------------------------------------------------

function PlayScreen({ q, index, total, score, streak, onAnswer, onNext }) {
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null); // {ok, msg}

  // Reset local state when the question changes.
  useEffect(() => {
    setAnswered(false);
    setFeedback(null);
  }, [index]);

  const submit = (ok, points = 10) => {
    if (answered) return;
    setAnswered(true);
    setFeedback({ ok });
    onAnswer(ok, ok ? points : 0, q);
  };

  return (
    <div className="inv-play">
      <div className="inv-hud">
        <span className="inv-hud-score">⭐ <b>{score}</b></span>
        <span className="inv-hud-progress">{index + 1} / {total}</span>
        <span className="inv-hud-streak">🔥 <b>{streak}</b></span>
      </div>

      <div className="inv-progress-bar">
        <div className="inv-progress-fill" style={{ width: `${(index / total) * 100}%` }} />
      </div>

      <div className={`inv-level inv-level-${q.level.toLowerCase()}`}>{q.level}</div>

      <p className="inv-question">{q.q}</p>
      {q.sentence && <p className="inv-sentence">{q.sentence}</p>}

      {q.type === "quiz"      && <QuizUI q={q} answered={answered} submit={submit} />}
      {q.type === "fill"      && <FillUI q={q} answered={answered} submit={submit} />}
      {q.type === "order"     && <OrderUI q={q} answered={answered} submit={submit} />}
      {q.type === "match"     && <MatchUI q={q} answered={answered} submit={submit} />}
      {q.type === "transform" && <TransformUI q={q} answered={answered} submit={submit} />}

      {answered && (
        <div className={`inv-feedback ${feedback?.ok ? "ok" : "ko"}`}>
          <div className="inv-feedback-head">{feedback?.ok ? "✓ Correct!" : "✗ Not quite"}</div>
          <div
            className="inv-feedback-body"
            dangerouslySetInnerHTML={{ __html: q.explain }}
          />
          <button className="inv-next" onClick={onNext}>
            {index + 1 >= total ? "See results →" : "Next question →"}
          </button>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// Quiz UI — 4 multiple choice options
// -----------------------------------------------------------------------

function QuizUI({ q, answered, submit }) {
  const [picked, setPicked] = useState(null);

  const pick = (idx) => {
    if (answered) return;
    setPicked(idx);
    submit(idx === q.ans);
  };

  return (
    <div className="inv-opts">
      {q.opts.map((opt, i) => {
        let cls = "inv-opt";
        if (answered) {
          if (i === q.ans)   cls += " inv-opt-ok";
          else if (i === picked) cls += " inv-opt-ko";
          else                cls += " inv-opt-dim";
        }
        return (
          <button key={i} className={cls} onClick={() => pick(i)} disabled={answered}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// -----------------------------------------------------------------------
// Fill UI — type the missing word
// -----------------------------------------------------------------------

function FillUI({ q, answered, submit }) {
  const [val, setVal] = useState("");
  const [showHint, setShowHint] = useState(false);

  const check = () => {
    if (!val.trim()) return;
    const ok = val.trim().toLowerCase() === q.blank.toLowerCase();
    submit(ok);
  };

  return (
    <div className="inv-fill">
      <input
        type="text"
        className="inv-fill-input"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !answered) check(); }}
        placeholder="Type the missing word…"
        disabled={answered}
        autoFocus
      />
      {!answered && (
        <div className="inv-fill-actions">
          <button
            className="inv-fill-hint"
            onClick={() => setShowHint(true)}
            disabled={showHint}
          >
            {showHint ? `💡 ${q.hint}` : "💡 Show hint"}
          </button>
          <button className="inv-fill-check" onClick={check} disabled={!val.trim()}>
            Check answer
          </button>
        </div>
      )}
      {answered && (
        <div className="inv-fill-correct">
          Correct answer: <b>{q.blank}</b>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// Order UI — reorder shuffled words into the correct sentence
// -----------------------------------------------------------------------

function OrderUI({ q, answered, submit }) {
  // Shuffle the words once per question render.
  const shuffled = useMemo(() => {
    const arr = q.words.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [q.words]);

  const [picked, setPicked]   = useState([]); // indexes in `shuffled` already chosen
  const [available, setAvail] = useState(shuffled.map((_, i) => i));

  const pickWord = (idx) => {
    if (answered) return;
    setPicked((p) => [...p, idx]);
    setAvail((a) => a.filter((x) => x !== idx));
  };

  const undoPick = (idxInPicked) => {
    if (answered) return;
    const original = picked[idxInPicked];
    setPicked((p) => p.filter((_, i) => i !== idxInPicked));
    setAvail((a) => [...a, original]);
  };

  const check = () => {
    if (picked.length !== q.words.length) return;
    const built = picked.map((i) => shuffled[i]).join(" ");
    submit(built === q.ans);
  };

  return (
    <div className="inv-order">
      <div className="inv-order-tray">
        {picked.length === 0 && (
          <span className="inv-order-empty">Tap words below to build the sentence…</span>
        )}
        {picked.map((srcIdx, i) => (
          <button
            key={`${srcIdx}-${i}`}
            className="inv-pill inv-pill-picked"
            onClick={() => undoPick(i)}
            disabled={answered}
          >
            {shuffled[srcIdx]}
          </button>
        ))}
      </div>
      <div className="inv-order-pool">
        {available.map((srcIdx) => (
          <button
            key={srcIdx}
            className="inv-pill"
            onClick={() => pickWord(srcIdx)}
            disabled={answered}
          >
            {shuffled[srcIdx]}
          </button>
        ))}
      </div>
      {!answered && (
        <button
          className="inv-order-check"
          onClick={check}
          disabled={picked.length !== q.words.length}
        >
          Check sentence
        </button>
      )}
      {answered && (
        <div className="inv-order-correct">
          Correct sentence: <b>{q.ans}</b>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// Match UI — click left, click right, link them
// -----------------------------------------------------------------------

function MatchUI({ q, answered, submit }) {
  // Two parallel arrays — left side fixed, right side shuffled.
  const leftItems  = useMemo(() => q.pairs.map((p) => p[0]), [q.pairs]);
  const rightItems = useMemo(() => {
    const arr = q.pairs.map((p) => p[1]);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [q.pairs]);

  const [pickedLeft,  setPickedLeft]  = useState(null);
  const [pickedRight, setPickedRight] = useState(null);
  const [matches,     setMatches]     = useState({}); // leftIdx -> rightIdx
  const [wrongPulse,  setWrongPulse]  = useState(null);

  useEffect(() => {
    if (pickedLeft !== null && pickedRight !== null) {
      const correctRight = q.pairs.findIndex((p) => p[0] === leftItems[pickedLeft]);
      // The right item displayed at `pickedRight` corresponds to `rightItems[pickedRight]`.
      // That maps back to the pair whose original right is rightItems[pickedRight].
      const isCorrect = q.pairs[correctRight][1] === rightItems[pickedRight];
      if (isCorrect) {
        setMatches((m) => ({ ...m, [pickedLeft]: pickedRight }));
        // If all pairs matched, submit.
        const newCount = Object.keys(matches).length + 1;
        if (newCount === q.pairs.length) {
          setTimeout(() => submit(true), 350);
        }
      } else {
        setWrongPulse({ left: pickedLeft, right: pickedRight });
        setTimeout(() => setWrongPulse(null), 500);
      }
      setPickedLeft(null);
      setPickedRight(null);
    }
  }, [pickedLeft, pickedRight, q.pairs, leftItems, rightItems, matches, submit]);

  const isLeftMatched  = (i) => Object.prototype.hasOwnProperty.call(matches, i);
  const isRightMatched = (i) => Object.values(matches).includes(i);

  return (
    <div className="inv-match">
      <div className="inv-match-col">
        {leftItems.map((txt, i) => {
          let cls = "inv-match-item";
          if (isLeftMatched(i))           cls += " inv-match-done";
          else if (pickedLeft === i)      cls += " inv-match-picked";
          if (wrongPulse?.left === i)     cls += " inv-match-wrong";
          return (
            <button
              key={i}
              className={cls}
              onClick={() => !isLeftMatched(i) && setPickedLeft(i)}
              disabled={answered || isLeftMatched(i)}
            >
              {txt}
            </button>
          );
        })}
      </div>
      <div className="inv-match-col">
        {rightItems.map((txt, i) => {
          let cls = "inv-match-item";
          if (isRightMatched(i))          cls += " inv-match-done";
          else if (pickedRight === i)     cls += " inv-match-picked";
          if (wrongPulse?.right === i)    cls += " inv-match-wrong";
          return (
            <button
              key={i}
              className={cls}
              onClick={() => !isRightMatched(i) && setPickedRight(i)}
              disabled={answered || isRightMatched(i)}
            >
              {txt}
            </button>
          );
        })}
      </div>
      {!answered && Object.keys(matches).length < q.pairs.length && (
        <button
          className="inv-match-give-up"
          onClick={() => submit(Object.keys(matches).length === q.pairs.length)}
        >
          Give up
        </button>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// Transform UI — rewrite the sentence using inversion
// -----------------------------------------------------------------------

function TransformUI({ q, answered, submit }) {
  const [val, setVal] = useState("");

  const normalise = (s) => s.trim().replace(/\s+/g, " ").replace(/[.!?]+$/, "").toLowerCase();

  const check = () => {
    if (!val.trim()) return;
    const ok = normalise(val) === normalise(q.target);
    submit(ok);
  };

  return (
    <div className="inv-transform">
      <div className="inv-transform-original">
        Original: <em>{q.original}</em>
      </div>
      <textarea
        className="inv-transform-input"
        rows={2}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Rewrite the sentence using inversion…"
        disabled={answered}
      />
      {!answered && (
        <button
          className="inv-transform-check"
          onClick={check}
          disabled={!val.trim()}
        >
          Check
        </button>
      )}
      {answered && (
        <div className="inv-transform-correct">
          Expected: <b>{q.target}</b>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// End screen
// -----------------------------------------------------------------------

function EndScreen({ score, correct, total, bestStreak, perf, newBest, onAgain }) {
  const joke = useMemo(() => JOKES[Math.floor(Math.random() * JOKES.length)], []);
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="inv-end">
      <div className="inv-end-hero">
        {newBest && <div className="inv-end-newbest">🎉 New best score!</div>}
        <div className="inv-end-score">{score}</div>
        <div className="inv-end-label">final score</div>
      </div>

      <div className="inv-end-grid">
        <div className="inv-end-stat">
          <div className="inv-end-stat-n">{correct}/{total}</div>
          <div className="inv-end-stat-l">Correct</div>
        </div>
        <div className="inv-end-stat">
          <div className="inv-end-stat-n">{accuracy}%</div>
          <div className="inv-end-stat-l">Accuracy</div>
        </div>
        <div className="inv-end-stat">
          <div className="inv-end-stat-n">{bestStreak}</div>
          <div className="inv-end-stat-l">Best streak</div>
        </div>
      </div>

      {(perf.B1.t > 0 || perf.B2.t > 0 || perf.C1.t > 0) && (
        <div className="inv-end-perf">
          <div className="inv-end-perf-h">By level</div>
          {["B1", "B2", "C1"].map((lvl) => {
            if (perf[lvl].t === 0) return null;
            const pct = Math.round((perf[lvl].c / perf[lvl].t) * 100);
            return (
              <div key={lvl} className="inv-end-perf-row">
                <span className={`inv-level inv-level-${lvl.toLowerCase()}`}>{lvl}</span>
                <span>{perf[lvl].c}/{perf[lvl].t}</span>
                <span className="inv-end-perf-pct">{pct}%</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="inv-joke">
        <div className="inv-joke-s">{joke.s}</div>
        <div className="inv-joke-p">{joke.p}</div>
      </div>

      <button className="inv-end-again" onClick={onAgain}>
        Play again
      </button>
      <Link to="/games" className="inv-end-arcade">
        ← Back to arcade
      </Link>
    </div>
  );
}
