import { Link } from "react-router-dom";

/**
 * Bubble — the round nav button used across the hub.
 *
 *   <Bubble title="Grammar" color="#2E4053" to="/grammar" />          (internal route)
 *   <Bubble title="Daily Phrases" color="#FF6B6B" href="https://…" /> (external link)
 *   <Bubble title="Back" color="#bbb" onClick={…} />                  (button)
 *
 * Only one of `to`, `href`, or `onClick` should be provided.
 */
export default function Bubble({ title, color, delay = "0s", to, href, onClick }) {
  const style = { backgroundColor: color, animationDelay: delay };
  const content = <span className="bubble-content">{title}</span>;

  if (to) {
    return (
      <Link to={to} className="bubble" style={style} aria-label={title}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className="bubble" style={style} aria-label={title}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className="bubble" style={style} onClick={onClick} aria-label={title}>
      {content}
    </button>
  );
}
