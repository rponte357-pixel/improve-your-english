import { Link } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";
import { ProgressBadge } from "./ProgressBadge";

// FamilyList: a vertical list of "family rows" used as the landing page for
// any lesson that branches into multiple sub-topics (Inversion, Connectors,
// Conditionals, Modals, Cleft).
//
// Props:
//   title, subtitle, backTo, backLabel:  same as before
//   families:        array of { id, name, hint, accent }
//   basePath:        url prefix; row links to `${basePath}/${family.id}`
//   progressBase:    optional. id namespace under which progress is stored
//                    (e.g. "inversion"). If provided, each row shows a ✓ when
//                    that family is completed. We can't infer this from
//                    basePath because the path can be plural ("connectors")
//                    while the progress key uses singular ("cleft").

export default function FamilyList({
  title,
  subtitle,
  backTo = "/grammar",
  backLabel = "← Back to Grammar",
  families,
  basePath,
  progressBase,
}) {
  const { get } = useProgress();

  return (
    <article className="lesson" style={{ "--accent": "#5D6D7E" }}>
      <Link to={backTo} className="back-link">
        {backLabel}
      </Link>

      <header className="lesson-header">
        <h1>{title}</h1>
        {subtitle && <p className="lesson-subtitle">{subtitle}</p>}
      </header>

      <div className="unit-list">
        {families.map((f, i) => {
          const p = progressBase
            ? get(`${progressBase}/${f.id}`)
            : null;
          return (
            <Link key={f.id} to={`${basePath}/${f.id}`} className="unit-row">
              <div
                className="unit-dot"
                style={{ background: f.accent, color: "#fff" }}
              >
                {i + 1}
              </div>
              <div className="unit-info">
                <div className="unit-name">
                  {f.name}
                  {p?.completed && <ProgressBadge completed variant="check" />}
                </div>
                <div className="unit-hint">{f.hint}</div>
              </div>
              <div className="unit-arrow">›</div>
            </Link>
          );
        })}
      </div>
    </article>
  );
}
