// ─── grammarProgress — unit completion stored in localStorage (r96) ──
//
// A unit is marked "completed" the first time the user finishes ALL
// its exercises (regardless of score). We also keep the best score
// percentage, which the UI can use later (e.g. medals on bubbles).
//
// Shared by Foundations (A1/A2) and Intermediate (B1/B2): unit ids
// don't collide between the two catalogues.

const KEY = "iye-grammar-progress";

export function loadProgress() {
  try {
    return JSON.parse(window.localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function saveUnitResult(unitId, pct) {
  if (!unitId) return;
  const progress = loadProgress();
  const prev = progress[unitId] || {};
  progress[unitId] = {
    completed: true,
    bestPct: Math.max(prev.bestPct || 0, Math.round(pct) || 0),
  };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    // localStorage full or unavailable: fail silently, it's only progress.
  }
}

export function isUnitCompleted(unitId) {
  const p = loadProgress()[unitId];
  return Boolean(p && p.completed);
}

export function getUnitBestPct(unitId) {
  const p = loadProgress()[unitId];
  return p ? p.bestPct || 0 : 0;
}
