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
    <>
      <span className="bubble-content">
        {eyebrow && <span className="bubble-eyebrow">{eyebrow}</span>}
        <span className="bubble-title">{title}</span>
      </span>
      {variant === "flags" && <FlagsRow />}
    </>
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

// Three hand-drawn flags for the Vocabulary bubble: UK, US, Australia.
// Drawn in SVG (not emojis) so they render identically on every OS,
// including Windows which doesn't ship country flag glyphs.
function FlagsRow() {
  return (
    <span className="bubble-flags-row" aria-hidden="true">
      <FlagUK />
      <FlagUS />
      <FlagAU />
    </span>
  );
}

function FlagUK() {
  return (
    <svg width="34" height="22" viewBox="0 0 60 30" className="bubble-flag">
      <rect width="60" height="30" fill="#012169" />
      {/* White diagonals (saltire) */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      {/* Red diagonals on top, slightly thinner */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3.5" />
      {/* White cross */}
      <path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" strokeWidth="10" />
      {/* Red cross on top */}
      <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function FlagUS() {
  return (
    <svg width="34" height="22" viewBox="0 0 60 30" className="bubble-flag">
      <rect width="60" height="30" fill="#fff" />
      {/* Seven red stripes evenly spaced */}
      <g fill="#B22234">
        <rect y="0"    width="60" height="2.3" />
        <rect y="4.6"  width="60" height="2.3" />
        <rect y="9.2"  width="60" height="2.3" />
        <rect y="13.8" width="60" height="2.3" />
        <rect y="18.4" width="60" height="2.3" />
        <rect y="23.0" width="60" height="2.3" />
        <rect y="27.7" width="60" height="2.3" />
      </g>
      {/* Blue canton with a small white dot suggesting stars */}
      <rect width="24" height="16.1" fill="#3C3B6E" />
      <g fill="#fff">
        <circle cx="6"  cy="4"  r="0.8" />
        <circle cx="12" cy="4"  r="0.8" />
        <circle cx="18" cy="4"  r="0.8" />
        <circle cx="6"  cy="8"  r="0.8" />
        <circle cx="12" cy="8"  r="0.8" />
        <circle cx="18" cy="8"  r="0.8" />
        <circle cx="6"  cy="12" r="0.8" />
        <circle cx="12" cy="12" r="0.8" />
        <circle cx="18" cy="12" r="0.8" />
      </g>
    </svg>
  );
}

function FlagAU() {
  return (
    <svg width="34" height="22" viewBox="0 0 60 30" className="bubble-flag">
      <rect width="60" height="30" fill="#012169" />
      {/* Top-left quadrant is the Union Jack, simplified */}
      <g>
        <path d="M0,0 L30,15 M30,0 L0,15" stroke="#fff" strokeWidth="3" />
        <path d="M0,0 L30,15 M30,0 L0,15" stroke="#C8102E" strokeWidth="1.8" />
        <path d="M15,0 L15,15 M0,7.5 L30,7.5" stroke="#fff" strokeWidth="5" />
        <path d="M15,0 L15,15 M0,7.5 L30,7.5" stroke="#C8102E" strokeWidth="3" />
      </g>
      {/* Federation star (under the Union Jack) */}
      <circle cx="15" cy="22" r="1.6" fill="#fff" />
      {/* Southern Cross stars on the fly */}
      <circle cx="44" cy="9"  r="1.4" fill="#fff" />
      <circle cx="52" cy="14" r="1.6" fill="#fff" />
      <circle cx="44" cy="20" r="1.4" fill="#fff" />
      <circle cx="38" cy="16" r="1.0" fill="#fff" />
      <circle cx="49" cy="24" r="1.0" fill="#fff" />
    </svg>
  );
}
