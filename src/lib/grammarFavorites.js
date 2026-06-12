// ─── grammarFavorites — starred exercises for quick review (r97) ─────
//
// Stored in localStorage under "iye-grammar-favorites" as an array of:
//   { unitId, exIndex, prompt, label, unitName, level, addedAt }
//
// - unitId + exIndex locate the exercise in either catalogue
//   (Foundations grammar.js or Intermediate grammarIntermediate.js).
// - prompt is a snapshot used to re-validate the reference if a unit's
//   exercises are ever reordered in a content update.
// - label is the human-readable snippet shown in the review list.
//
// Like progress, favorites are per-browser/per-device (localStorage).

const KEY = "iye-grammar-favorites";

export function loadFavorites() {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function save(list) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Fail silently: favorites are a convenience, not critical data.
  }
}

export function isFavorite(unitId, exIndex) {
  return loadFavorites().some((f) => f.unitId === unitId && f.exIndex === exIndex);
}

// Adds if absent, removes if present. Returns true if it ended up added.
export function toggleFavorite(fav) {
  const list = loadFavorites();
  const i = list.findIndex((f) => f.unitId === fav.unitId && f.exIndex === fav.exIndex);
  if (i >= 0) {
    list.splice(i, 1);
    save(list);
    return false;
  }
  list.push({ ...fav, addedAt: Date.now() });
  save(list);
  return true;
}

export function removeFavorite(unitId, exIndex) {
  save(loadFavorites().filter((f) => !(f.unitId === unitId && f.exIndex === exIndex)));
}
