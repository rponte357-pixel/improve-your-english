// Custom user-created vocabulary lists.
//
// MVP scope (Round A1):
//   • Schema + storage I/O for user-defined word lists.
//   • Pure validators and id helpers, exported for unit testing.
//   • React hook `useCustomLists` exposing CRUD operations.
//   • NO UI yet — the hook will be consumed by the views added in A2/A3.
//
// Data shape:
//   List  = { id, name, createdAt, updatedAt, words: Word[] }
//   Word  = { en, es, example? }
//
// Storage:
//   • Lists themselves         → "iye:vocab:custom-lists"  (array of List)
//   • "Learned" progress       → reuses the existing
//                                "iye:vocab:progress" map, keyed by
//                                `${customProgressKey(listId)}`
//                                so that Flashcards / Quiz / Matching
//                                can keep using their existing
//                                markLearned(themeId, level, wordEn)
//                                signature without changes. We use
//                                themeId = `custom-<listId>` and
//                                level   = "all" as a synthetic level.
//
// Design decisions worth knowing:
//   • Lists are FLAT — no B1/B2/C1 levels per list. This was an explicit
//     product decision (A0): keeps creation and study UI simpler. If we
//     ever need leveled custom lists, we'd extend `level` here.
//   • Duplicate detection on `en` is case-insensitive WITHIN a list.
//     The same English word can appear in two different lists.
//   • Progress entries are kept in sync on rename/delete so stats don't
//     show stale "learned" counters for words that no longer exist.

import { useCallback, useEffect, useMemo, useState } from "react";

// ─────────────────────────────────────────────────────────────────────
// Storage keys & constants
// ─────────────────────────────────────────────────────────────────────

export const CUSTOM_LISTS_STORAGE_KEY = "iye:vocab:custom-lists";
export const PROGRESS_STORAGE_KEY     = "iye:vocab:progress";

// Synthetic "level" used when building the progress key for custom
// lists. Mirrors the `<themeId>-<level>` format used by curated themes so
// the existing study modes can stay completely agnostic.
export const CUSTOM_LEVEL = "all";

// Soft cap — surfaced as a warning in the UI (A2) when reached.
// Not enforced here so legitimate power users aren't blocked.
export const SOFT_TOTAL_WORDS_WARNING = 500;

// Length limits for sanity / sane UI sizing.
export const MAX_NAME_LENGTH    = 60;
export const MAX_WORD_LENGTH    = 80;
export const MAX_EXAMPLE_LENGTH = 240;

// ─────────────────────────────────────────────────────────────────────
// Pure helpers (no localStorage access — easy to unit-test)
// ─────────────────────────────────────────────────────────────────────

// Generate a stable-ish unique id for a new list. Time prefix + random
// suffix is enough for a single-user, single-device MVP.
export function makeListId() {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 7);
  return `cl_${t}_${r}`;
}

// Build the progress key for a given list. Exported so the views can
// read/write the same shared progress map used by curated themes.
export function customProgressKey(listId) {
  return `custom-${listId}-${CUSTOM_LEVEL}`;
}

// Validate a single word. Returns { ok: true } or { ok: false, error }.
//
// Schema (r35 / A3.2):
//   • en              required, 1–80 chars
//   • es              OPTIONAL — users can save a word without translating
//                     it yet; the Edit tab and Flashcards will treat
//                     missing `es` gracefully.
//   • example         optional, 0–240 chars
//   • example2        optional, 0–240 chars (added in r35 to support
//                     Quick check returning two dictionary examples)
//   • partOfSpeech    optional, short token like "noun", "phrasal verb"
//                     (added in r35 for the same reason; UI shows it as
//                     a small chip next to the word)
export function validateWord(word) {
  if (!word || typeof word !== "object") {
    return { ok: false, error: "Invalid word" };
  }
  const en = typeof word.en === "string" ? word.en.trim() : "";
  const es = typeof word.es === "string" ? word.es.trim() : "";

  // Optional fields. Each one accepts:
  //   • undefined / null / ""  → treated as absent
  //   • string                 → trimmed and length-checked
  //   • anything else          → invalid
  const normaliseOptional = (val) =>
    val == null || val === ""
      ? ""
      : typeof val === "string"
      ? val.trim()
      : null;

  const example       = normaliseOptional(word.example);
  const example2      = normaliseOptional(word.example2);
  const partOfSpeech  = normaliseOptional(word.partOfSpeech);

  if (!en) return { ok: false, error: "English word is required" };
  if (en.length > MAX_WORD_LENGTH) {
    return { ok: false, error: `English word is too long (max ${MAX_WORD_LENGTH})` };
  }
  // `es` is now OPTIONAL. Only enforce a length limit when present.
  if (es.length > MAX_WORD_LENGTH) {
    return { ok: false, error: `Spanish translation is too long (max ${MAX_WORD_LENGTH})` };
  }
  if (example === null) {
    return { ok: false, error: "Example must be text" };
  }
  if (example.length > MAX_EXAMPLE_LENGTH) {
    return { ok: false, error: `Example is too long (max ${MAX_EXAMPLE_LENGTH})` };
  }
  if (example2 === null) {
    return { ok: false, error: "Second example must be text" };
  }
  if (example2.length > MAX_EXAMPLE_LENGTH) {
    return { ok: false, error: `Second example is too long (max ${MAX_EXAMPLE_LENGTH})` };
  }
  if (partOfSpeech === null) {
    return { ok: false, error: "Part of speech must be text" };
  }
  // A part-of-speech label is always short. 40 chars accommodates
  // "phrasal verb", "transitive verb", etc. with comfortable margin.
  if (partOfSpeech.length > 40) {
    return { ok: false, error: "Part of speech tag is too long" };
  }

  return { ok: true };
}

// Validate a list name against the existing names in the store.
// Names compared case-insensitively after trimming.
export function validateListName(name, existingNames = []) {
  const trimmed = typeof name === "string" ? name.trim() : "";
  if (!trimmed) return { ok: false, error: "Name is required" };
  if (trimmed.length > MAX_NAME_LENGTH) {
    return { ok: false, error: `Name is too long (max ${MAX_NAME_LENGTH})` };
  }
  const norm = trimmed.toLowerCase();
  const clash = existingNames.some(
    (n) => typeof n === "string" && n.trim().toLowerCase() === norm
  );
  if (clash) return { ok: false, error: "A list with this name already exists" };
  return { ok: true };
}

// Defensive shape check used when reading from localStorage. Filters
// out anything that doesn't look like a List so a corrupted entry can't
// crash the app.
function isValidList(x) {
  return (
    x &&
    typeof x === "object" &&
    typeof x.id === "string" &&
    typeof x.name === "string" &&
    Array.isArray(x.words)
  );
}

// ─────────────────────────────────────────────────────────────────────
// Low-level storage I/O (with safe fallbacks)
// ─────────────────────────────────────────────────────────────────────

function readLists() {
  try {
    const raw = window.localStorage.getItem(CUSTOM_LISTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidList);
  } catch {
    return [];
  }
}

function writeLists(lists) {
  try {
    window.localStorage.setItem(
      CUSTOM_LISTS_STORAGE_KEY,
      JSON.stringify(lists)
    );
    return true;
  } catch {
    // Most likely QuotaExceededError. The UI in A2 will detect this
    // by re-reading and noticing nothing was persisted, and will show
    // a "storage full" message. For A1 we just swallow it.
    return false;
  }
}

// Remove a single progress key entirely from the shared progress map.
// Used when a list is deleted so stale "learned" data doesn't linger.
function removeProgressEntry(progressKey) {
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return;
    const progress = JSON.parse(raw);
    if (!progress || typeof progress !== "object") return;
    if (!(progressKey in progress)) return;
    delete progress[progressKey];
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(progress)
    );
  } catch {
    /* ignore */
  }
}

// Drop a single learned-word entry from a list's progress array.
// Called when a word is removed from a list so its "learned" flag
// doesn't keep counting toward stats.
function removeWordFromProgress(listId, wordEn) {
  try {
    const key = customProgressKey(listId);
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return;
    const progress = JSON.parse(raw);
    if (!progress || typeof progress !== "object") return;
    const arr = progress[key];
    if (!Array.isArray(arr)) return;
    const next = arr.filter((w) => w !== wordEn);
    if (next.length === arr.length) return;
    progress[key] = next;
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(progress)
    );
  } catch {
    /* ignore */
  }
}

// When the user edits a word's English headword, move its "learned"
// marker so it doesn't dangle under the old headword.
function renameWordInProgress(listId, oldEn, newEn) {
  if (oldEn === newEn) return;
  try {
    const key = customProgressKey(listId);
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return;
    const progress = JSON.parse(raw);
    if (!progress || typeof progress !== "object") return;
    const arr = progress[key];
    if (!Array.isArray(arr)) return;
    const idx = arr.indexOf(oldEn);
    if (idx === -1) return;
    const next = arr.slice();
    next[idx] = newEn;
    progress[key] = next;
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(progress)
    );
  } catch {
    /* ignore */
  }
}

// ─────────────────────────────────────────────────────────────────────
// React hook — public API for the UI
// ─────────────────────────────────────────────────────────────────────

// Builds a normalised Word object from raw input, stripping optional
// fields when empty so persisted data stays clean. Optional fields
// added in r35: `example2` and `partOfSpeech`.
function buildWord({ en, es, example, example2, partOfSpeech }) {
  const cleanEn  = en.trim();
  const cleanEs  = (es || "").trim();
  const cleanEx  = (example || "").trim();
  const cleanEx2 = (example2 || "").trim();
  const cleanPos = (partOfSpeech || "").trim();

  const out = { en: cleanEn };
  if (cleanEs)  out.es           = cleanEs;
  if (cleanEx)  out.example      = cleanEx;
  if (cleanEx2) out.example2     = cleanEx2;
  if (cleanPos) out.partOfSpeech = cleanPos;
  return out;
}

export function useCustomLists() {
  // Initial state read lazily so we don't touch localStorage on every
  // render. The fallback in readLists() makes this safe in SSR-ish
  // contexts (though the app is purely client-side).
  const [lists, setLists] = useState(() => readLists());

  // Mirror to localStorage on every change. writeLists() swallows
  // QuotaExceededError; the UI can detect failure by comparing state
  // and storage if needed.
  useEffect(() => {
    writeLists(lists);
  }, [lists]);

  // ─── List-level operations ─────────────────────────────────────────

  const createList = useCallback(
    (rawName) => {
      const existing = lists.map((l) => l.name);
      const v = validateListName(rawName, existing);
      if (!v.ok) return { ok: false, error: v.error, list: null };

      const now = Date.now();
      const newList = {
        id: makeListId(),
        name: rawName.trim(),
        createdAt: now,
        updatedAt: now,
        words: [],
      };
      setLists((prev) => [...prev, newList]);
      return { ok: true, list: newList };
    },
    [lists]
  );

  const renameList = useCallback(
    (listId, rawName) => {
      const others = lists
        .filter((l) => l.id !== listId)
        .map((l) => l.name);
      const v = validateListName(rawName, others);
      if (!v.ok) return { ok: false, error: v.error };

      setLists((prev) =>
        prev.map((l) =>
          l.id === listId
            ? { ...l, name: rawName.trim(), updatedAt: Date.now() }
            : l
        )
      );
      return { ok: true };
    },
    [lists]
  );

  const deleteList = useCallback((listId) => {
    setLists((prev) => prev.filter((l) => l.id !== listId));
    removeProgressEntry(customProgressKey(listId));
    return { ok: true };
  }, []);

  // Clears the "learned" state of a list without deleting any words.
  // Used by the "Reset progress for this list" button in the per-list
  // Stats view (A4).
  const resetListProgress = useCallback((listId) => {
    removeProgressEntry(customProgressKey(listId));
    return { ok: true };
  }, []);

  // ─── Word-level operations ─────────────────────────────────────────

  const addWord = useCallback(
    (listId, word) => {
      const v = validateWord(word);
      if (!v.ok) return { ok: false, error: v.error };

      const list = lists.find((l) => l.id === listId);
      if (!list) return { ok: false, error: "List not found" };

      const newWord = buildWord(word);
      const dup = list.words.some(
        (w) => w.en.toLowerCase() === newWord.en.toLowerCase()
      );
      if (dup) {
        return { ok: false, error: `"${newWord.en}" is already in this list` };
      }

      setLists((prev) =>
        prev.map((l) =>
          l.id === listId
            ? { ...l, words: [...l.words, newWord], updatedAt: Date.now() }
            : l
        )
      );
      return { ok: true, word: newWord };
    },
    [lists]
  );

  const editWord = useCallback(
    (listId, oldEn, updated) => {
      const v = validateWord(updated);
      if (!v.ok) return { ok: false, error: v.error };

      const list = lists.find((l) => l.id === listId);
      if (!list) return { ok: false, error: "List not found" };

      const next = buildWord(updated);
      const renamedEn = next.en.toLowerCase() !== oldEn.toLowerCase();

      if (renamedEn) {
        const collision = list.words.some(
          (w) =>
            w.en !== oldEn &&
            w.en.toLowerCase() === next.en.toLowerCase()
        );
        if (collision) {
          return { ok: false, error: `"${next.en}" is already in this list` };
        }
      }

      setLists((prev) =>
        prev.map((l) =>
          l.id !== listId
            ? l
            : {
                ...l,
                words: l.words.map((w) => (w.en === oldEn ? next : w)),
                updatedAt: Date.now(),
              }
        )
      );

      if (next.en !== oldEn) {
        renameWordInProgress(listId, oldEn, next.en);
      }
      return { ok: true, word: next };
    },
    [lists]
  );

  const removeWord = useCallback((listId, wordEn) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id !== listId
          ? l
          : {
              ...l,
              words: l.words.filter((w) => w.en !== wordEn),
              updatedAt: Date.now(),
            }
      )
    );
    removeWordFromProgress(listId, wordEn);
    return { ok: true };
  }, []);

  // ─── Derived values ────────────────────────────────────────────────

  const totalLists = lists.length;
  const totalWords = useMemo(
    () => lists.reduce((sum, l) => sum + l.words.length, 0),
    [lists]
  );

  const getList = useCallback(
    (listId) => lists.find((l) => l.id === listId) || null,
    [lists]
  );

  return {
    // data
    lists,
    totalLists,
    totalWords,
    getList,
    // list ops
    createList,
    renameList,
    deleteList,
    resetListProgress,
    // word ops
    addWord,
    editWord,
    removeWord,
  };
}
