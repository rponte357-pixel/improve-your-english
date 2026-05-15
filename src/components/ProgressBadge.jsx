// ProgressBadge — small visual indicator used in lists and bubbles.
//
// Variants:
//   "check"     — round ✓ shown when completed; nothing otherwise
//   "ring"      — a circular bar around 0..100 percent (still shows ✓ at 100)

export function ProgressBadge({ completed, percent = 0, variant = "check" }) {
  if (variant === "check") {
    if (!completed) return null;
    return (
      <span className="progress-badge check" aria-label="Completed">
        ✓
      </span>
    );
  }

  // ring variant
  const p = Math.max(0, Math.min(100, percent));
  const size = 24;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (p / 100) * c;
  return (
    <span
      className={`progress-badge ring ${completed ? "completed" : ""}`}
      aria-label={completed ? "Completed" : `${p}% progress`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {completed && (
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="currentColor"
          >
            ✓
          </text>
        )}
      </svg>
    </span>
  );
}
