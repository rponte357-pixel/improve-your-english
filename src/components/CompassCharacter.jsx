// ─── Compass character (Tu Tutor) ────────────────────────────────────
// SVG of a brass compass with friendly eyes and a magnetic needle.
// Used in three sizes: hero (the welcome screen), small (next to a
// speech bubble), and the spinning version (the "trazando tu camino"
// moment). All CSS animations live in tutor.css.
//
// Props:
//   size      → "hero" | "small" | "icon"   (default "hero")
//   spinning  → boolean — needle spins (for the analyzing screen)

export default function CompassCharacter({ size = "hero", spinning = false }) {
  const dims = size === "icon" ? 44 : size === "small" ? 64 : 130;
  const heightFactor = size === "icon" ? 1.15 : 1.15;
  const cls = [
    "tu-compass",
    `tu-compass-${size}`,
    spinning ? "tu-compass-spinning" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      className={cls}
      width={dims}
      height={Math.round(dims * heightFactor)}
      viewBox="0 0 130 150"
      aria-label="Tu Tutor: una brújula amistosa"
    >
      <defs>
        <linearGradient id="tu-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4C77B" />
          <stop offset="0.5" stopColor="#D89B3F" />
          <stop offset="1" stopColor="#8E5A1A" />
        </linearGradient>
        <linearGradient id="tu-brassEdge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E89B2C" />
          <stop offset="1" stopColor="#6B3E0F" />
        </linearGradient>
        <radialGradient id="tu-face" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF8E7" />
          <stop offset="1" stopColor="#EFD9A8" />
        </radialGradient>
      </defs>

      {/* Body of the compass */}
      <circle cx="65" cy="78" r="56" fill="url(#tu-brass)" stroke="url(#tu-brassEdge)" strokeWidth="2" />
      <circle cx="65" cy="78" r="48" fill="url(#tu-face)" stroke="#8E5A1A" strokeWidth="1" />

      {/* Cardinal points */}
      <text x="65" y="40" textAnchor="middle" fontSize="9" fill="#6B3E0F" fontWeight="700" fontFamily="serif">N</text>
      <text x="65" y="123" textAnchor="middle" fontSize="9" fill="#6B3E0F" fontWeight="700" fontFamily="serif">S</text>
      <text x="28" y="82" textAnchor="middle" fontSize="9" fill="#6B3E0F" fontWeight="700" fontFamily="serif">W</text>
      <text x="102" y="82" textAnchor="middle" fontSize="9" fill="#6B3E0F" fontWeight="700" fontFamily="serif">E</text>

      {/* Top loop (the ring you hang it from) */}
      <circle cx="65" cy="14" r="6" fill="none" stroke="url(#tu-brassEdge)" strokeWidth="3" />
      <rect x="62" y="18" width="6" height="8" fill="url(#tu-brass)" />

      {/* Needle — wrapped so we can spin it */}
      <g className="tu-compass-needle">
        <polygon points="65,52 71,78 65,104 59,78" fill="#EC4899" stroke="#7C2D12" strokeWidth="0.6" />
        <polygon points="65,52 65,78 59,78" fill="#7C2D12" opacity="0.4" />
      </g>
      <circle cx="65" cy="78" r="4" fill="#7C2D12" />
      <circle cx="65" cy="78" r="2" fill="#F4C77B" />

      {/* Friendly face — only visible at hero/small (icon is too tiny) */}
      {size !== "icon" && (
        <g className="tu-compass-face">
          <ellipse cx="55" cy="68" rx="3" ry="3.5" fill="#1F2433" />
          <ellipse cx="75" cy="68" rx="3" ry="3.5" fill="#1F2433" />
          <ellipse cx="56" cy="67" rx="1" ry="1" fill="#fff" />
          <ellipse cx="76" cy="67" rx="1" ry="1" fill="#fff" />
          <path d="M 56 90 Q 65 96 74 90" stroke="#1F2433" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
