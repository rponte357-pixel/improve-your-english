// ─── Connector Combat — game data ───────────────────────────────────
// Pulls the "blank" quiz questions out of connectorFamilies and shapes
// them for the hammer game: a sentence with a gap, THREE targets (the
// correct connector + 2 distractors), and the family name for context.
//
// We use only `type: "blank"` questions (fill the gap) — they map
// cleanly to "hit the right connector". MCQ-style ones are skipped.

import { connectorFamilies } from "./connectors";

export const CC_SCORES_KEY = "iye:cc:scores";
export const CC_ROUND_SIZE = 10;
export const CC_SECONDS_PER_Q = 20;

// Gather all usable questions, tagged with their family.
function allBlankQuestions() {
  const out = [];
  for (const fam of connectorFamilies) {
    for (const q of fam.quiz || []) {
      if (q.type !== "blank") continue;
      if (!q.sent || !q.key || !Array.isArray(q.opts)) continue;
      if (!q.opts.includes(q.key)) continue;
      out.push({
        family: fam.name,
        accent: fam.accent || "#E76F51",
        sent: q.sent,
        key: q.key,
        opts: q.opts,
        exp: q.exp || "",
      });
    }
  }
  return out;
}

// Reduce options to THREE: the correct one + 2 distractors, shuffled.
function toThreeTargets(q, rng) {
  const distractors = q.opts.filter((o) => o !== q.key);
  const shuffledD = shuffle(distractors, rng).slice(0, 2);
  return shuffle([q.key, ...shuffledD], rng);
}

function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build a round: up to CC_ROUND_SIZE questions, each with 3 targets.
// Returns [{ sent, key, family, accent, targets:[w,w,w], exp }].
export function buildCombatRound(size = CC_ROUND_SIZE, rng = Math.random) {
  const pool = shuffle(allBlankQuestions(), rng).slice(0, size);
  return pool.map((q) => ({
    sent: q.sent,
    key: q.key,
    family: q.family,
    accent: q.accent,
    exp: q.exp,
    targets: toThreeTargets(q, rng),
  }));
}

// How many questions exist in total (for display / sanity).
export function combatQuestionCount() {
  return allBlankQuestions().length;
}

// Build ROUNDS grouped by family — one round per connector family, in a
// fixed order. Each round: { family, accent, questions:[{sent,key,...}] }.
// Within a round the questions are shuffled; the family order is fixed so
// the player progresses through all connector types.
export function buildCombatRounds(rng = Math.random) {
  const rounds = [];
  for (const fam of connectorFamilies) {
    const qs = (fam.quiz || [])
      .filter((q) => q.type === "blank" && q.sent && q.key && Array.isArray(q.opts) && q.opts.includes(q.key))
      .map((q) => ({
        sent: q.sent,
        key: q.key,
        family: fam.name,
        accent: fam.accent || "#E76F51",
        exp: q.exp || "",
        targets: toThreeTargets(q, rng),
      }));
    if (qs.length === 0) continue;
    rounds.push({
      family: fam.name,
      accent: fam.accent || "#E76F51",
      questions: shuffle(qs, rng),
    });
  }
  return rounds;
}

// ─── Best score ─────────────────────────────────────────────────────
export function getCombatBest() {
  try {
    const raw = window.localStorage.getItem(CC_SCORES_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function recordCombatScore(score, total) {
  try {
    const prev = getCombatBest();
    const isRecord = !prev || score > prev.best;
    if (isRecord) {
      const rec = { best: score, total, updatedAt: Date.now() };
      window.localStorage.setItem(CC_SCORES_KEY, JSON.stringify(rec));
      return { isRecord: true, best: score };
    }
    return { isRecord: false, best: prev.best };
  } catch {
    return { isRecord: false, best: score };
  }
}
