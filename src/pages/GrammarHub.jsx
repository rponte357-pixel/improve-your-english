import { Link } from "react-router-dom";
import { grammarIndex } from "../data/lessons";
import { useProgress, computeCompletion } from "../hooks/useProgress";
import Bubble from "../components/Bubble";

// Section visual config — base colour and a per-section progress-ring colour.
const SECTION_STYLE = {
  core:     { base: "#5D6D7E", ringDone: "#27ae60" },
  advanced: { base: "#7D3C98", ringDone: "#27ae60" },
};

export default function GrammarHub() {
  const { all, resetAll } = useProgress();

  // Per-lesson completion %.
  const lessonCompletion = Object.fromEntries(
    grammarIndex.map((g) => {
      const ids = g.familyIds.map((id) => `${g.progressBase}/${id}`);
      return [g.slug, Math.round(computeCompletion(all, ids) * 100)];
    })
  );

  const overall = Math.round(
    Object.values(lessonCompletion).reduce((a, b) => a + b, 0) / grammarIndex.length
  );

  const core = grammarIndex.filter((g) => g.section === "core");
  const advanced = grammarIndex.filter((g) => g.section === "advanced");

  const handleReset = () => {
    if (window.confirm("Reset all grammar progress? This can't be undone.")) {
      resetAll();
    }
  };

  return (
    <>
      <header className="hub-header">
        <h1>Grammar</h1>
        <p>
          {overall > 0
            ? `${overall}% complete · ${grammarIndex.length} topics`
            : `${grammarIndex.length} topics — Core + Advanced`}
        </p>
        {overall > 0 && (
          <div className="overall-progress">
            <div
              className="overall-progress-fill"
              style={{ width: `${overall}%` }}
            />
          </div>
        )}
      </header>

      <section className="grammar-section">
        <h2 className="section-heading">Core C1</h2>
        <div className="bubble-container">
          {core.map((g, i) => (
            <ProgressBubble
              key={g.slug}
              title={g.title}
              to={g.path}
              delay={`${i * 0.06}s`}
              percent={lessonCompletion[g.slug]}
              section="core"
            />
          ))}
        </div>
      </section>

      <section className="grammar-section">
        <h2 className="section-heading">Advanced topics</h2>
        <div className="bubble-container">
          {advanced.map((g, i) => (
            <ProgressBubble
              key={g.slug}
              title={g.title}
              to={g.path}
              delay={`${i * 0.06}s`}
              percent={lessonCompletion[g.slug]}
              section="advanced"
            />
          ))}
        </div>
      </section>

      <div className="grammar-footer">
        <Bubble title="Back to home" color="#bbb" to="/" />
        {overall > 0 && (
          <button
            type="button"
            className="link-btn reset-progress"
            onClick={handleReset}
          >
            Reset progress
          </button>
        )}
      </div>
    </>
  );
}

function ProgressBubble({ title, to, delay, percent, section = "core" }) {
  const completed = percent === 100;
  const style = SECTION_STYLE[section] || SECTION_STYLE.core;
  const bgColor = completed ? style.ringDone : style.base;
  const size = 180;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <Link
      to={to}
      className="bubble progress-bubble"
      style={{
        backgroundColor: bgColor,
        animationDelay: delay,
      }}
      aria-label={`${title} — ${percent}% complete`}
    >
      {percent > 0 && (
        <svg
          className="progress-bubble-ring"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#fff"
            strokeWidth={stroke}
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
      )}
      <span className="bubble-content">
        {title}
        {percent > 0 && (
          <span className="bubble-percent">
            {completed ? "✓" : `${percent}%`}
          </span>
        )}
      </span>
    </Link>
  );
}
