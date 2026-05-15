import { Link } from "react-router-dom";
import LessonTabs from "./LessonTabs";
import QuizRunner from "./QuizRunner";
import BuildRunner from "./BuildRunner";

// FamilyLesson: renders Learn / Quiz / Build tabs for a "family" object shaped
// like the entries in connectors.js, conditionals.js, modals.js:
//   { name, hint, accent, intro, items, quiz, build }
//
// Each `item` is rendered as a coloured card (badge + use + example).
// The Quiz and Build tabs reuse the generic runners.
//
// Props:
//   family:     the data object
//   backTo:     URL for the back link
//   backLabel:  text for the back link

function LearnPanel({ family }) {
  return (
    <section className="connector-learn">
      {family.intro && <p className="family-intro">{family.intro}</p>}
      {family.items.map((item, i) => (
        <div key={i} className="connector-card">
          <span
            className="connector-tag"
            style={{ background: family.accent, color: "#fff" }}
          >
            {item.word}
          </span>
          <p className="connector-use">{item.use}</p>
          {item.example && (
            <div className="connector-example">{item.example}</div>
          )}
        </div>
      ))}
    </section>
  );
}

export default function FamilyLesson({ family, backTo, backLabel, progressKey }) {
  return (
    <article className="lesson" style={{ "--accent": family.accent }}>
      <Link to={backTo} className="back-link">
        {backLabel}
      </Link>

      <header className="lesson-header">
        <h1>{family.name}</h1>
        <p className="lesson-subtitle">{family.hint}</p>
      </header>

      <LessonTabs
        initial="learn"
        tabs={[
          {
            id: "learn",
            label: "📖 Learn",
            render: () => <LearnPanel family={family} />,
          },
          {
            id: "quiz",
            label: "🎯 Quiz",
            render: () =>
              family.quiz?.length ? (
                <QuizRunner questions={family.quiz} progressKey={progressKey} activity="quiz" />
              ) : (
                <p className="empty-state">No quiz questions yet.</p>
              ),
          },
          {
            id: "build",
            label: "🔨 Build",
            render: () =>
              family.build?.length ? (
                <BuildRunner
                  questions={family.build}
                  promptHeader="Tap the words to build the sentence:"
                  progressKey={progressKey}
                  activity="build"
                />
              ) : (
                <p className="empty-state">No build tasks yet.</p>
              ),
          },
        ]}
      />
    </article>
  );
}
