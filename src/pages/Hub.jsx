import Bubble from "../components/Bubble";

// ── Personal website link ────────────────────────────────────────────
// When your personal site is live, paste its URL here (keep the quotes),
// e.g. const PERSONAL_SITE_URL = "https://raquelponte.com";
// While this is null, the logo shows but isn't a link yet.
const PERSONAL_SITE_URL = null; // ← put your website URL here later

// The logo lives in /public, so it's served from the app's base path
// (works both in local dev and on GitHub Pages, which serves the app
// under /improve-your-english/). import.meta.env.BASE_URL gives us that
// prefix automatically. Put the transparent-background PNG at
// public/logo_rp.png
const LOGO_SRC = `${import.meta.env.BASE_URL || "/"}logo_rp.png`;

export default function Hub() {
  return (
    <>
      <header className="hub-header">
        <h1>C1 Mastery Hub</h1>
        <p>Pick a tool to get started.</p>
      </header>

      <div className="bubble-container">
        <Bubble
          variant="editorial"
          eyebrow="✦ Daily"
          title="Phrases"
          delay="0s"
          to="/phrases"
        />
        <Bubble
          variant="audio"
          eyebrow="Speak it right"
          title="Pronunciation"
          delay="0.1s"
          to="/pronunciation"
        />
        <Bubble
          variant="academic"
          eyebrow="Master C1"
          title="Grammar"
          delay="0.2s"
          to="/grammar"
        />
        <Bubble
          variant="playful"
          eyebrow="✦ Play"
          title="Games"
          delay="0.3s"
          to="/games"
        />
        <Bubble
          variant="flags"
          eyebrow="Grow your"
          title="Vocabulary"
          delay="0.4s"
          to="/vocabulary"
        />
        <Bubble
          variant="useful"
          eyebrow="How to say it"
          title="Useful Expressions"
          delay="0.45s"
          to="/useful-expressions"
        />
        <Bubble
          variant="guide"
          eyebrow="Aprobado seguro"
          title="Guía C1"
          delay="0.5s"
          to="/guia-c1"
        />
        <Bubble
          variant="reading"
          eyebrow="Read &amp; learn"
          title="Reading Room"
          delay="0.6s"
          to="/reading"
        />
        <Bubble
          variant="building"
          eyebrow="Build like LEGO"
          title="Word Building"
          delay="0.7s"
          to="/word-building"
        />
      </div>

      <footer className="hub-footer">
        <span className="hub-footer-credit">Created by</span>
        {PERSONAL_SITE_URL ? (
          <a
            className="hub-footer-logo-link"
            href={PERSONAL_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="R. Ponte — visit my website"
          >
            <img className="hub-footer-logo" src={LOGO_SRC} alt="R. Ponte" />
          </a>
        ) : (
          <img className="hub-footer-logo" src={LOGO_SRC} alt="R. Ponte" />
        )}
      </footer>
    </>
  );
}
