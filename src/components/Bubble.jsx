import { Link } from "react-router-dom";

/**
 * Bubble — the round nav button used across the hub.
 *
 * Two ways to use it:
 *
 *   1. Themed variant (recommended for the main hub):
 *
 *      <Bubble variant="editorial" title="Daily Phrases" to="/phrases" />
 *      <Bubble variant="audio"     title="Pronunciation" to="/pronunciation" />
 *      <Bubble variant="academic"  title="Grammar" to="/grammar" />
 *
 *      Each variant has its own personality (palette, typography, ornament)
 *      that hints at the section it leads to. Defined in App.css.
 *
 *   2. Plain colored variant (for back buttons, secondary nav, etc.):
 *
 *      <Bubble title="Back" color="#bbb" onClick={…} />
 *
 *      Uses the legacy API. No personality, just a colored disc.
 *
 * Only one of `to`, `href`, or `onClick` should be provided.
 */
export default function Bubble({
  title,
  variant,        // "editorial" | "audio" | "academic" — themed style
  eyebrow,        // optional small uppercase text above the title
  color,          // legacy: backgroundColor for plain bubbles
  delay = "0s",
  to,
  href,
  onClick,
}) {
  // Themed variants ignore `color` and pull their palette from CSS classes.
  const className = variant
    ? `bubble bubble-${variant}`
    : "bubble";
  const style = variant
    ? { animationDelay: delay }
    : { backgroundColor: color, animationDelay: delay };

  const content = (
    <span className="bubble-content">
      {eyebrow && <span className="bubble-eyebrow">{eyebrow}</span>}
      <span className="bubble-title">{title}</span>
    </span>
  );

  if (to) {
    return (
      <Link to={to} className={className} style={style} aria-label={title}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={className} style={style} aria-label={title}>
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={onClick}
      aria-label={title}
    >
      {content}
    </button>
  );
}
