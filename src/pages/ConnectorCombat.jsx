// ─── Connector Combat ────────────────────────────────────────────────
// Hammer game: a gapped sentence + three connector targets. Tap a target
// and a hammer drops and strikes it (with a sound). Right = green, wrong
// = shows the correct one. 10 questions, 10s each (bar turns red), best
// score saved. Mute button. On desktop the cursor becomes a little hammer.

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  buildCombatRounds,
  recordCombatScore,
  getCombatBest,
  CC_SECONDS_PER_Q,
} from "../data/connectorCombat";
import "../styles/connectorCombat.css";

// Target ring colours (cycled across the 3 targets).
const RING_COLORS = ["#E76F51", "#2A9D8F", "#4A7FB5"];

export default function ConnectorCombat() {
  const [rounds, setRounds] = useState(() => buildCombatRounds());
  const [roundIdx, setRoundIdx] = useState(0); // which family-round
  const [idx, setIdx] = useState(0);            // question within the round
  const [phase, setPhase] = useState("transition"); // "transition" | "playing" | "done"
  const [score, setScore] = useState(0);        // cumulative across rounds
  const [picked, setPicked] = useState(null);
  const [striking, setStriking] = useState(null);
  const [timeLeft, setTimeLeft] = useState(CC_SECONDS_PER_Q);
  const [result, setResult] = useState(null);
  const [muted, setMuted] = useState(false);

  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const currentRound = rounds[roundIdx];
  const questions = currentRound ? currentRound.questions : [];
  const current = questions[idx];
  const totalQuestions = rounds.reduce((a, r) => a + r.questions.length, 0);
  const locked = picked !== null;

  // ── Sound: a synthesised hammer strike via Web Audio (no files) ──
  // Two layers: a short bright "clack" (the metal impact) + a low "thud"
  // with body that drops fast. Slightly brighter when the hit is correct.
  const playHit = (good) => {
    if (muted) return;
    try {
      if (!audioRef.current) {
        const AC = window.AudioContext || window.webkitAudioContext;
        audioRef.current = new AC();
      }
      const ctx = audioRef.current;
      const now = ctx.currentTime;

      // Layer 1 — low "thud" with body (sine, fast pitch drop).
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thud.type = "sine";
      thud.connect(thudGain);
      thudGain.connect(ctx.destination);
      thud.frequency.setValueAtTime(180, now);
      thud.frequency.exponentialRampToValueAtTime(55, now + 0.13);
      thudGain.gain.setValueAtTime(0.0001, now);
      thudGain.gain.exponentialRampToValueAtTime(0.6, now + 0.005);
      thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      thud.start(now);
      thud.stop(now + 0.2);

      // Layer 2 — short bright "clack" (square, very short) = impact.
      const clack = ctx.createOscillator();
      const clackGain = ctx.createGain();
      clack.type = "square";
      clack.connect(clackGain);
      clackGain.connect(ctx.destination);
      clack.frequency.setValueAtTime(good ? 900 : 600, now);
      clack.frequency.exponentialRampToValueAtTime(good ? 400 : 260, now + 0.04);
      clackGain.gain.setValueAtTime(0.0001, now);
      clackGain.gain.exponentialRampToValueAtTime(0.22, now + 0.003);
      clackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      clack.start(now);
      clack.stop(now + 0.07);
    } catch {
      /* audio not available — ignore silently */
    }
  };

  // ── Per-question countdown (only while actively playing) ──
  useEffect(() => {
    if (phase !== "playing" || locked) return;
    setTimeLeft(CC_SECONDS_PER_Q);
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
  }, [idx, roundIdx, phase, locked]);

  // Time ran out → count as a miss and reveal the answer.
  useEffect(() => {
    if (phase === "playing" && !locked && timeLeft === 0) {
      setPicked("__timeout__");
      playHit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const tapTarget = (word, targetIndex) => {
    if (locked) return;
    window.clearInterval(timerRef.current);
    setPicked(word);
    setStriking(targetIndex);
    const good = word === current.key;
    if (good) setScore((s) => s + 1);
    playHit(good);
    window.setTimeout(() => setStriking(null), 320);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      // End of this family-round.
      if (roundIdx + 1 >= rounds.length) {
        // Whole game finished.
        const res = recordCombatScore(score, totalQuestions);
        setResult(res);
        setPhase("done");
      } else {
        // Move to the transition screen for the next family.
        setRoundIdx((r) => r + 1);
        setIdx(0);
        setPicked(null);
        setStriking(null);
        setPhase("transition");
      }
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
      setStriking(null);
    }
  };

  const startRound = () => {
    setPicked(null);
    setStriking(null);
    setTimeLeft(CC_SECONDS_PER_Q);
    setPhase("playing");
  };

  const restart = () => {
    setRounds(buildCombatRounds());
    setRoundIdx(0);
    setIdx(0);
    setScore(0);
    setPicked(null);
    setStriking(null);
    setResult(null);
    setTimeLeft(CC_SECONDS_PER_Q);
    setPhase("transition");
  };

  // ── Final results screen ──
  if (phase === "done") {
    const pct = Math.round((score / totalQuestions) * 100);
    const msg =
      pct >= 90 ? "Devastating! 🏆" :
      pct >= 70 ? "Strong arm! 🎉" :
      pct >= 50 ? "Not bad — keep swinging 💪" :
      "Keep training 🌱";
    return (
      <section className="cc">
        <div className="cc-topbar">
          <Link to="/games" className="cc-back">← Games</Link>
        </div>
        <div className="cc-result">
          <div className="cc-result-score">{score}/{totalQuestions}</div>
          <div className="cc-result-msg">{msg}</div>
          {result && result.isRecord ? (
            <div className="cc-record">⭐ New best score!</div>
          ) : result ? (
            <div className="cc-best">Best: {result.best}/{totalQuestions}</div>
          ) : null}
          <button className="cc-btn" onClick={restart}>Play again</button>
          <Link to="/games" className="cc-btn cc-btn-ghost">Back to games</Link>
        </div>
      </section>
    );
  }

  // ── Round transition screen ──
  if (phase === "transition") {
    return (
      <section className="cc">
        <div className="cc-topbar">
          <Link to="/games" className="cc-back">← Games</Link>
          <span className="cc-progress">Round {roundIdx + 1} / {rounds.length}</span>
          <span className="cc-right">
            <span className="cc-score">★ {score}</span>
          </span>
        </div>
        <div className="cc-transition">
          <div className="cc-trans-round" style={{ color: currentRound.accent }}>
            Round {roundIdx + 1}
          </div>
          <div className="cc-trans-family">{currentRound.family}</div>
          <div className="cc-trans-count">{questions.length} connectors to smash</div>
          <button className="cc-btn" onClick={startRound}>
            {roundIdx === 0 ? "Start" : "Continue"}
          </button>
        </div>
      </section>
    );
  }

  const parts = current.sent.split("___");
  const lowTime = timeLeft <= 3;

  return (
    <section className="cc">
      <div className="cc-topbar">
        <Link to="/games" className="cc-back">← Games</Link>
        <span className="cc-progress">
          R{roundIdx + 1} · {idx + 1}/{questions.length}
        </span>
        <span className="cc-right">
          <span className="cc-score">★ {score}</span>
          <button
            className="cc-mute"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Activar sonido" : "Silenciar"}
            title={muted ? "Activar sonido" : "Silenciar"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </span>
      </div>

      {/* Timer bar */}
      <div className="cc-timerbar">
        <div
          className={`cc-timerbar-fill ${lowTime ? "cc-timerbar-low" : ""}`}
          style={{ width: `${(timeLeft / CC_SECONDS_PER_Q) * 100}%` }}
        />
      </div>

      {/* Sentence */}
      <div className="cc-sentence">
        <div className="cc-family">{current.family} · golpea el conector correcto</div>
        <p className="cc-sent-text">
          {parts[0]}
          <span className="cc-gap">{locked && picked !== "__timeout__" ? picked : "______"}</span>
          {parts[1]}
        </p>
      </div>

      {/* Targets */}
      <div className="cc-targets">
        {current.targets.map((word, i) => {
          const ring = RING_COLORS[i % RING_COLORS.length];
          let state = "";
          if (locked) {
            if (word === current.key) state = "cc-target-correct";
            else if (word === picked) state = "cc-target-wrong";
            else state = "cc-target-dim";
          }
          return (
            <div key={word} className="cc-target-slot">
              <button
                className={`cc-target ${state}`}
                style={{ borderColor: state ? undefined : ring, boxShadow: state ? undefined : `0 6px 16px ${ring}44` }}
                onClick={() => tapTarget(word, i)}
                disabled={locked}
              >
                {word}
              </button>
              {striking === i && <Hammer />}
            </div>
          );
        })}
      </div>

      {/* Feedback + next */}
      {locked && (
        <div className="cc-feedback">
          {picked === current.key ? (
            <span className="cc-fb-ok">✓ Correct</span>
          ) : (
            <span className="cc-fb-no">
              {picked === "__timeout__" ? "⏱ Time! " : "✗ "}It's “{current.key}”
            </span>
          )}
          {current.exp && <p className="cc-exp">{current.exp}</p>}
          <button className="cc-btn" onClick={next}>
            {idx + 1 >= questions.length ? "See score" : "Next →"}
          </button>
        </div>
      )}
    </section>
  );
}

// A little hammer that drops & strikes (CSS animation).
function Hammer() {
  return (
    <svg className="cc-hammer" width="78" height="78" viewBox="0 0 78 78" aria-hidden="true">
      <defs>
        <linearGradient id="cc-hm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfd6dd" />
          <stop offset="0.4" stopColor="#9aa4ad" />
          <stop offset="1" stopColor="#6b747c" />
        </linearGradient>
        <linearGradient id="cc-hh" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a9784a" />
          <stop offset="0.5" stopColor="#caa06c" />
          <stop offset="1" stopColor="#82572f" />
        </linearGradient>
      </defs>
      <rect x="36" y="20" width="7" height="50" rx="3.5" fill="url(#cc-hh)" />
      <rect x="20" y="8" width="38" height="20" rx="4" fill="url(#cc-hm)" stroke="#5c656d" strokeWidth="1" />
      <rect x="20" y="8" width="9" height="20" rx="3" fill="#bcc4cc" opacity="0.7" />
    </svg>
  );
}
