import { Link, useParams, Navigate } from "react-router-dom";
import { inversionUnits } from "../data/inversion";
import LessonTabs from "../components/LessonTabs";
import QuizRunner from "../components/QuizRunner";
import BuildRunner from "../components/BuildRunner";

// Inversion data uses three positional levels per unit:
//   levels[0] = Easy   (2-option MCQ)        → goes into Quiz tab as type "mcq"
//   levels[1] = Medium (word tiles)          → goes into Build tab
//   levels[2] = Hard   (fill-blank with opts)→ goes into Quiz tab as type "blank"
//
// This mapping is the single source of truth. If the data shape changes, update
// here.

function buildQuiz(unit) {
  const easy = (unit.levels[0]?.qs ?? []).map((q) => ({
    type: "mcq",
    sent: q.sent,
    opts: q.opts,
    ans: q.ans,
    hint: q.hint,
    exp: q.exp,
  }));
  const hard = (unit.levels[2]?.qs ?? []).map((q) => ({
    type: "blank",
    sent: q.sent,
    opts: q.opts,
    key: q.key,
    hint: q.hint,
    exp: q.exp,
  }));
  return [...easy, ...hard];
}

function buildTiles(unit) {
  return (unit.levels[1]?.qs ?? []).map((q) => ({
    sent: q.sent,
    words: q.words,
    ans: q.ans,
  }));
}

function LearnPanel({ unit }) {
  return (
    <section className="lesson-theory">
      {unit.slides.map((s, i) => (
        <div key={i} className="theory-block">
          <div className="slide-label">{s.label}</div>
          <h2>{s.rule}</h2>
          <p>{s.desc}</p>
          <div
            className="formula"
            dangerouslySetInnerHTML={{ __html: s.formula }}
          />
          <div className="examples">
            {s.pairs.map((p, j) => (
              <div key={j} className="pair">
                <div className="pair-row plain">{p.a}</div>
                <div className="pair-arrow">↓</div>
                <div className="pair-row inv">{p.b}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default function InversionUnit() {
  const { unitId } = useParams();
  const unit = inversionUnits.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/grammar/inversion" replace />;

  const quizQuestions = buildQuiz(unit);
  const buildQuestions = buildTiles(unit);
  const progressKey = `inversion/${unit.id}`;

  return (
    <article className="lesson" style={{ "--accent": unit.accent }}>
      <Link to="/grammar/inversion" className="back-link">
        ← Back to Inversion
      </Link>

      <header className="lesson-header">
        <h1>{unit.name}</h1>
        <p className="lesson-subtitle">{unit.hint}</p>
      </header>

      <LessonTabs
        initial="learn"
        tabs={[
          {
            id: "learn",
            label: "📖 Learn",
            render: () => <LearnPanel unit={unit} />,
          },
          {
            id: "quiz",
            label: "🎯 Quiz",
            render: () =>
              quizQuestions.length ? (
                <QuizRunner questions={quizQuestions} progressKey={progressKey} activity="quiz" />
              ) : (
                <p className="empty-state">No quiz questions for this unit yet.</p>
              ),
          },
          {
            id: "build",
            label: "🔨 Build",
            render: () =>
              buildQuestions.length ? (
                <BuildRunner
                  questions={buildQuestions}
                  promptHeader="Tap the words to build the sentence:"
                  progressKey={progressKey}
                  activity="build"
                />
              ) : (
                <p className="empty-state">No build tasks for this unit yet.</p>
              ),
          },
        ]}
      />
    </article>
  );
}
