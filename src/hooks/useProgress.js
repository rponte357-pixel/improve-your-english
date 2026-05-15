// useProgress — tiny abstraction over localStorage for tracking lesson progress.
//
// Data shape stored under key "iye:progress" (JSON):
//   {
//     "<lessonId>/<familyId>": {
//        quizBest:  0..100,   // best % score on quiz, only counted without hints
//        buildBest: 0..100,   // best % score on build, only counted without hints
//        completed: boolean,  // true once any activity reaches ≥75% no-hint
//        attempted: boolean,  // true after at least one attempt
//     }
//   }
//
// A family is "completed" when at least one activity (quiz OR build) reached
// the threshold without hints. The hint-discount avoids gaming the score.
//
// Hooks export:
//   useProgress()                       → { all, get, record, reset, resetAll }
//   computeCompletion(progress, ids)    → number 0..1
//
// SSR safety: window/localStorage may be missing during SSR or in tests.
// All access is wrapped in try/catch.

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "iye:progress";
export const COMPLETION_THRESHOLD = 75; // percent

function readStorage() {
  try {
    if (typeof window === "undefined") return {};
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStorage(data) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* quota or private mode — ignore */
  }
}

// Compute a percentage for a single result.
//   correct = number of correct answers (or points earned)
//   total   = number of answers (or total possible points)
const pct = (correct, total) =>
  total === 0 ? 0 : Math.round((correct / total) * 100);

export function useProgress() {
  const [all, setAll] = useState(() => readStorage());

  // Sync with other tabs (cheap, optional).
  useEffect(() => {
    const handler = (e) => {
      if (e.key === STORAGE_KEY) setAll(readStorage());
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    }
  }, []);

  const persist = useCallback((next) => {
    setAll(next);
    writeStorage(next);
  }, []);

  const get = useCallback(
    (key) => all[key] || { quizBest: 0, buildBest: 0, completed: false, attempted: false },
    [all]
  );

  // Record a result for a given lesson/family key.
  //   key:       string id (e.g. "inversion/neg")
  //   activity:  "quiz" | "build"
  //   correct:   number
  //   total:     number
  //   hintUsed:  boolean — if true, score still recorded but completion blocked
  const record = useCallback(
    (key, activity, correct, total, hintUsed = false) => {
      const score = pct(correct, total);
      const prev = all[key] || {
        quizBest: 0,
        buildBest: 0,
        completed: false,
        attempted: false,
      };

      const field = activity === "quiz" ? "quizBest" : "buildBest";
      const newBest = hintUsed ? prev[field] : Math.max(prev[field], score);

      const justCompleted = !hintUsed && score >= COMPLETION_THRESHOLD;

      const next = {
        ...all,
        [key]: {
          ...prev,
          [field]: newBest,
          attempted: true,
          completed: prev.completed || justCompleted,
        },
      };
      persist(next);
      return { score, completed: next[key].completed };
    },
    [all, persist]
  );

  const reset = useCallback(
    (key) => {
      const next = { ...all };
      delete next[key];
      persist(next);
    },
    [all, persist]
  );

  const resetAll = useCallback(() => {
    persist({});
  }, [persist]);

  return { all, get, record, reset, resetAll };
}

// Compute the share of completed items in a list of ids.
// Returns 0..1.
export function computeCompletion(progress, ids) {
  if (!ids.length) return 0;
  const done = ids.filter((id) => progress[id]?.completed).length;
  return done / ids.length;
}
