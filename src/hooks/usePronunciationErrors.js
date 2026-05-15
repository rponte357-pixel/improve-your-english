// usePronunciationErrors — tracks which verbs the user has misclassified.
//
// Storage shape (key "iye:pronun_errors"):
//   {
//     "Wanted": { verb, correctSound: "id", wrongSounds: ["t", "d"], count: 3, lastError: "2026-05-15T..." },
//     ...
//   }
//
// Distinct from the grammar progress system (which lives under "iye:progress")
// because these errors are word-level, not lesson-level, and the data model
// is genuinely different.

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "iye:pronun_errors";

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
    /* quota or private mode — ignore silently */
  }
}

export function usePronunciationErrors() {
  const [errors, setErrors] = useState(() => readStorage());

  // Stay in sync with changes from other tabs.
  useEffect(() => {
    const handler = (e) => {
      if (e.key === STORAGE_KEY) setErrors(readStorage());
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    }
  }, []);

  const persist = useCallback((next) => {
    setErrors(next);
    writeStorage(next);
  }, []);

  const recordError = useCallback(
    (verb, correctSound, wrongSound) => {
      const prev = errors[verb] || {
        verb,
        correctSound,
        wrongSounds: [],
        count: 0,
      };
      const wrongSounds = prev.wrongSounds.includes(wrongSound)
        ? prev.wrongSounds
        : [...prev.wrongSounds, wrongSound];
      persist({
        ...errors,
        [verb]: {
          ...prev,
          wrongSounds,
          count: prev.count + 1,
          lastError: new Date().toISOString(),
        },
      });
    },
    [errors, persist]
  );

  // Mark a verb as resolved (e.g. user got it right after previous errors).
  // We keep the entry but cap count at 0 so the UI can decide whether to hide it.
  const clearError = useCallback(
    (verb) => {
      const next = { ...errors };
      delete next[verb];
      persist(next);
    },
    [errors, persist]
  );

  const clearAll = useCallback(() => {
    persist({});
  }, [persist]);

  return { errors, recordError, clearError, clearAll };
}
