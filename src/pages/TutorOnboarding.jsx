// ─── Tutor onboarding ────────────────────────────────────────────────
// The narrative path: welcome → level → goal → time → analysing → your
// route. Skippable at any step. Saves answers + a "seen" flag so we
// don't reopen it next time (the Hub will offer a discreet "see your
// route" link instead).

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompassCharacter from "../components/CompassCharacter";
import {
  LEVELS,
  GOALS,
  TIMES,
  buildPath,
  saveTutorState,
} from "../data/tutor";
import "../styles/tutor.css";

const STEPS = ["welcome", "level", "goal", "time", "analysing", "route"];

export default function TutorOnboarding() {
  const nav = useNavigate();
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({ level: null, goal: null, time: null });
  const step = STEPS[stepIdx];

  // After picking the time, sit on "analysing" for a short moment, then
  // reveal the route. Persist answers + the "seen" flag.
  useEffect(() => {
    if (step !== "analysing") return;
    const t = window.setTimeout(() => setStepIdx((i) => i + 1), 1600);
    return () => window.clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step === "route") {
      saveTutorState({ seen: true, answers, completedAt: Date.now() });
    }
  }, [step, answers]);

  const goNext = () => setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));
  const skip = () => {
    // Remember the user dismissed it; we won't auto-offer again.
    saveTutorState({ seen: true, skipped: true, completedAt: Date.now() });
    nav("/");
  };

  const pickAndAdvance = (key, value) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    goNext();
  };

  return (
    <section className="tu">
      <Topbar stepIdx={stepIdx} onSkip={skip} canSkip={step !== "route"} />

      {step === "welcome" && <WelcomeScreen onStart={goNext} />}
      {step === "level" && (
        <QuestionScreen
          n={1}
          title="¿Cuál es tu nivel?"
          options={LEVELS}
          onPick={(id) => pickAndAdvance("level", id)}
        />
      )}
      {step === "goal" && (
        <QuestionScreen
          n={2}
          title="¿Cuál es tu objetivo?"
          options={GOALS}
          onPick={(id) => pickAndAdvance("goal", id)}
        />
      )}
      {step === "time" && (
        <QuestionScreen
          n={3}
          title="¿Cuánto tiempo puedes dedicar al día?"
          options={TIMES}
          onPick={(id) => pickAndAdvance("time", id)}
        />
      )}
      {step === "analysing" && <AnalysingScreen />}
      {step === "route" && <RouteScreen answers={answers} />}

      <Dots total={STEPS.length} active={stepIdx} />
    </section>
  );
}

// ── Subcomponents ──

function Topbar({ stepIdx, onSkip, canSkip }) {
  const labels = ["Bienvenida", "Tu nivel", "Tu objetivo", "Tu tiempo", "Trazando tu camino", "Tu camino"];
  return (
    <div className="tu-topbar">
      <span className="tu-step-label">{stepIdx + 1} · {labels[stepIdx]}</span>
      {canSkip && (
        <button type="button" className="tu-skip" onClick={onSkip}>
          Saltar →
        </button>
      )}
    </div>
  );
}

function WelcomeScreen({ onStart }) {
  return (
    <div className="tu-welcome">
      <div className="tu-hero">
        <CompassCharacter size="hero" />
        <div className="tu-hero-name">Tu Tutor</div>
      </div>
      <div className="tu-bubble">
        <div className="tu-bubble-tag">¡Hola, viajero/a! ✦</div>
        <p className="tu-bubble-text">
          Soy tu brújula. Te ayudaré a encontrar tu camino en inglés en solo 3 preguntas. ¿Empezamos?
        </p>
      </div>
      <button className="tu-btn-primary" onClick={onStart}>Empezar →</button>
    </div>
  );
}

function QuestionScreen({ n, title, options, onPick }) {
  return (
    <div className="tu-question">
      <div className="tu-q-head">
        <CompassCharacter size="small" />
        <div className="tu-bubble tu-bubble-inline">
          <p className="tu-bubble-text">
            <strong>{title}</strong>
          </p>
        </div>
      </div>
      <div className="tu-options">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`tu-option ${opt.soft ? "tu-option-soft" : ""}`}
            onClick={() => onPick(opt.id)}
          >
            <span>{opt.label}</span>
            {opt.hint && <span className="tu-option-hint">· {opt.hint}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function AnalysingScreen() {
  return (
    <div className="tu-analysing">
      <div className="tu-spin-wrap">
        <CompassCharacter size="hero" spinning />
        <span className="tu-spark tu-spark-1">✦</span>
        <span className="tu-spark tu-spark-2">✧</span>
        <span className="tu-spark tu-spark-3">✦</span>
      </div>
      <p className="tu-analysing-text">Mmm… veo tu camino…</p>
    </div>
  );
}

function RouteScreen({ answers }) {
  const path = buildPath(answers);
  return (
    <div className="tu-route">
      <div className="tu-q-head">
        <CompassCharacter size="small" />
        <div className="tu-bubble tu-bubble-inline">
          <p className="tu-bubble-text">
            ¡Listo! <strong>Aquí está tu ruta.</strong>
          </p>
          <p className="tu-route-intro">{path.intro}</p>
        </div>
      </div>

      <ol className="tu-steps">
        {path.steps.map((s, i) => (
          <li key={s.id} className="tu-step" style={{ borderLeftColor: s.accent }}>
            <span className="tu-step-num" style={{ background: s.accent }}>{i + 1}</span>
            <div className="tu-step-body">
              <div className="tu-step-title">
                <span className="tu-step-icon">{s.icon}</span>
                <Link to={s.route} className="tu-step-link">{s.label}</Link>
              </div>
              <div className="tu-step-tip">{s.tip}</div>
            </div>
          </li>
        ))}
      </ol>

      <Link to="/" className="tu-btn-primary">¡Empezar mi camino! →</Link>
    </div>
  );
}

function Dots({ total, active }) {
  return (
    <div className="tu-dots" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`tu-dot ${i === active ? "tu-dot-active" : ""}`} />
      ))}
    </div>
  );
}
