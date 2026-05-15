import { useState } from "react";
import { Link } from "react-router-dom";
import {
  passiveTypes,
  passiveTheory,
  passiveQuiz,
  passiveBuild,
} from "../data/passive";
import LessonTabs from "../components/LessonTabs";
import QuizRunner from "../components/QuizRunner";
import BuildRunner from "../components/BuildRunner";

const QUIZ_TOTAL = 8;
const shuffle = (a) => a.slice().sort(() => Math.random() - 0.5);

/* ─────────── LEARN ─────────── */
function LearnPanel() {
  return (
    <section className="passive-learn">
      {passiveTheory.map((card, i) => {
        const meta = passiveTypes[card.type];
        return (
          <div key={i} className="theory-card">
            <span
              className="theory-badge"
              style={{ background: meta.colorBg, color: meta.colorTxt }}
            >
              Type {i + 1} — {meta.label}
            </span>
            <p className="theory-rule">{card.rule}</p>
            {card.formulas.map((f, j) => (
              <div key={j} className="formula plain">
                {f}
              </div>
            ))}
            <div className="examples">
              {card.examples.map((ex, j) => (
                <div key={j} className="pair">
                  {ex.active && (
                    <div className="pair-row plain">{ex.active}</div>
                  )}
                  {ex.active && (
                    <div className="pair-arrow">
                      {ex.note ? `↓ ${ex.note}` : "↓"}
                    </div>
                  )}
                  <div className="pair-row inv">{ex.passive}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

/* ─────────── QUIZ ─────────── */
function QuizPanel() {
  const [filter, setFilter] = useState("all");
  const [set, setSet] = useState(null);

  const start = () => {
    let pool =
      filter === "all"
        ? passiveQuiz
        : passiveQuiz.filter((q) => q.type === filter);
    while (pool.length < QUIZ_TOTAL) pool = [...pool, ...pool];
    const picked = shuffle(pool)
      .slice(0, QUIZ_TOTAL)
      // QuizRunner expects {type: "stem", stem, opts, ans, hint, exp}
      .map((q) => ({ type: "stem", ...q }));
    setSet(picked);
  };

  if (!set) {
    return (
      <section className="passive-quiz">
        <p className="section-label">Pick a passive type</p>
        <div className="mode-grid">
          {[
            { id: "all", name: "All types", desc: "Full mix" },
            {
              id: "report",
              name: "Reporting verbs",
              desc: "It is said / believed",
            },
            { id: "caus", name: "Causative", desc: "Have / get done" },
            { id: "modal", name: "Modals", desc: "Must be / should have" },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              className={`mode-card ${filter === m.id ? "active" : ""}`}
              onClick={() => setFilter(m.id)}
            >
              <div className="mode-name">{m.name}</div>
              <div className="mode-desc">{m.desc}</div>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn-primary full-width"
          onClick={start}
        >
          Start quiz →
        </button>
      </section>
    );
  }

  return (
    <section className="passive-quiz">
      <QuizRunner
        questions={set}
        progressKey="passive/quiz"
        activity="quiz"
        onFinish={() => setSet(null)}
      />
      <div style={{ marginTop: 12 }}>
        <button
          type="button"
          className="link-btn"
          onClick={() => setSet(null)}
        >
          Change filter
        </button>
      </div>
    </section>
  );
}

/* ─────────── BUILD ─────────── */
function BuildPanel() {
  return (
    <section className="passive-build">
      <BuildRunner
        questions={passiveBuild.map((q) => ({
          sent: q.orig,
          words: q.words,
          ans: q.inv,
        }))}
        promptHeader="Rewrite as advanced passive:"
        progressKey="passive/build"
        activity="build"
      />
    </section>
  );
}

export default function Passive() {
  return (
    <article className="lesson" style={{ "--accent": "#3C3489" }}>
      <Link to="/grammar" className="back-link">
        ← Back to Grammar
      </Link>

      <header className="lesson-header">
        <h1>Advanced Passive</h1>
        <p className="lesson-subtitle">
          Six structures every C1 candidate should master.
        </p>
      </header>

      <LessonTabs
        initial="learn"
        tabs={[
          { id: "learn", label: "📖 Learn", render: () => <LearnPanel /> },
          { id: "quiz", label: "🎯 Quiz", render: () => <QuizPanel /> },
          { id: "build", label: "🔨 Build", render: () => <BuildPanel /> },
        ]}
      />
    </article>
  );
}
