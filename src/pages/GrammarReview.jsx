// ─── GrammarReview — "Mi repaso": starred exercises (r97) ────────────
//
// Global review screen at /grammar/review. Lists every exercise the
// user starred (Foundations + Intermediate mixed) and lets them:
//   - practice them all as a normal exercise run (same engine), or
//   - remove individual ones (already mastered).
//
// Resolution: each favorite stores unitId + exIndex + a prompt
// snapshot. We resolve against both catalogues; if a content update
// reordered the unit, we fall back to matching by prompt; if the
// exercise no longer exists, the item is shown as stale and skipped
// from practice.

import { useState } from "react";
import { Link } from "react-router-dom";
import { loadFavorites, removeFavorite } from "../lib/grammarFavorites";
import { getUnit } from "../data/grammar";
import { getUnitInt } from "../data/grammarIntermediate";
import GrammarExercises from "./GrammarExercises";
import "../styles/vocabulary.css";

function resolveFavorite(fav) {
  const unit = getUnit(fav.unitId) || getUnitInt(fav.unitId);
  if (!unit || !unit.exercises) return null;
  const byIndex = unit.exercises[fav.exIndex];
  if (byIndex && (!fav.prompt || byIndex.prompt === fav.prompt)) return byIndex;
  // Content may have been reordered: try matching by prompt snapshot.
  if (fav.prompt) {
    const byPrompt = unit.exercises.find((e) => e.prompt === fav.prompt);
    if (byPrompt) return byPrompt;
  }
  return null;
}

export default function GrammarReview() {
  const [favorites, setFavorites] = useState(loadFavorites);
  const [practising, setPractising] = useState(false);

  const resolved = favorites.map((f) => ({ fav: f, exercise: resolveFavorite(f) }));
  const playable = resolved.filter((r) => r.exercise).map((r) => r.exercise);

  function handleRemove(fav) {
    removeFavorite(fav.unitId, fav.exIndex);
    setFavorites(loadFavorites());
  }

  // ── Practice mode: same engine, no unitId (no completion marking) ──
  if (practising) {
    return (
      <section className="vocab">
        <div className="gr-review">
          <button
            type="button"
            className="foundations-back gr-back-btn"
            onClick={() => setPractising(false)}
          >
            ← Back to Mi repaso
          </button>
          <header className="foundations-header">
            <h1 className="foundations-title">★ Mi repaso</h1>
            <p className="foundations-subtitle">{playable.length} ejercicios guardados</p>
          </header>
          <GrammarExercises exercises={playable} unitName="Mi repaso" />
        </div>
      </section>
    );
  }

  // ── List mode ──────────────────────────────────────────────────────
  return (
    <section className="vocab">
      <div className="gr-review">
        <Link to="/grammar" className="foundations-back">
          ← Back to Grammar
        </Link>

        <header className="foundations-header">
          <h1 className="foundations-title">★ Mi repaso</h1>
          <p className="foundations-subtitle">
            {favorites.length === 0
              ? "Tus ejercicios guardados para repasar"
              : `${favorites.length} ejercicio${favorites.length === 1 ? "" : "s"} guardado${favorites.length === 1 ? "" : "s"}`}
          </p>
        </header>

        {favorites.length === 0 ? (
          <div className="gr-empty">
            <div className="gr-empty-icon">☆</div>
            <p>
              Aún no has guardado ningún ejercicio. Mientras practicas,
              toca la estrella de un ejercicio para tenerlo aquí y
              repasarlo cuando quieras.
            </p>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="gr-practice-btn"
              onClick={() => setPractising(true)}
              disabled={playable.length === 0}
            >
              ▶ Practicar mi repaso ({playable.length})
            </button>

            <div className="gr-list">
              {resolved.map(({ fav, exercise }) => (
                <div key={`${fav.unitId}#${fav.exIndex}`} className={`gr-item ${!exercise ? "gr-item-stale" : ""}`}>
                  <div className="gr-item-main">
                    <div className="gr-item-label">{fav.label || fav.prompt}</div>
                    <div className="gr-item-meta">
                      {fav.unitName}{fav.level ? ` · ${fav.level}` : ""}
                      {!exercise && " · (ya no disponible)"}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="gr-item-remove"
                    onClick={() => handleRemove(fav)}
                    aria-label="Quitar de Mi repaso"
                    title="Quitar de Mi repaso"
                  >
                    ★
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
