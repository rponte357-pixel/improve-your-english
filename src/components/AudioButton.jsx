// AudioButton — plays an audio file with a clear "playing" state.
//
// Props:
//   src:        relative path inside /public, e.g. "audio/d_sound/Played.mp3"
//   label:      ARIA label and visible text (optional)
//   size:       "sm" (default) or "lg" for the explorer hero player
//   onPlay:     optional callback fired when playback starts (for stats)
//
// The component handles three states internally:
//   idle | loading | playing
// and switches the icon accordingly. Click again while playing to restart.

import { useEffect, useRef, useState } from "react";

export default function AudioButton({ src, label, size = "sm", onPlay }) {
  const [state, setState] = useState("idle");
  const audioRef = useRef(null);

  // Build the absolute URL respecting the Vite base path.
  // import.meta.env.BASE_URL ends with a slash, e.g. "/improve-your-english/".
  const baseUrl = import.meta.env.BASE_URL || "/";
  const fullSrc = `${baseUrl}${src}`.replace(/\/{2,}/g, "/");

  useEffect(() => {
    // Cleanup: stop audio when the component unmounts so it doesn't keep
    // playing in the background if the user navigates away mid-playback.
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const play = () => {
    // Stop any previous instance.
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setState("loading");

    const audio = new Audio(fullSrc);
    audioRef.current = audio;

    audio.addEventListener("playing", () => {
      setState("playing");
      if (onPlay) onPlay();
    });
    audio.addEventListener("ended", () => setState("idle"));
    audio.addEventListener("error", () => setState("idle"));

    audio.play().catch(() => {
      // Autoplay blocked or file missing — surface as idle.
      setState("idle");
    });
  };

  return (
    <button
      type="button"
      className={`audio-button audio-button-${size} audio-button-${state}`}
      onClick={play}
      aria-label={label || "Play audio"}
    >
      <span className="audio-icon" aria-hidden="true">
        {state === "playing" ? "🔊" : state === "loading" ? "⏳" : "▶"}
      </span>
      {label && <span className="audio-label">{label}</span>}
    </button>
  );
}
