// Dictionary client — wraps the free dictionaryapi.dev endpoint.
//
// API docs: https://dictionaryapi.dev/  (community project, no API key)
//   GET https://api.dictionaryapi.dev/api/v2/entries/en/<word>
//     → 200 with an array of entries (multiple senses possible)
//     → 404 if no definition exists
//
// We isolate this in its own module so:
//   • The Quick check button calls a single function with a consistent
//     shape, independent of the underlying service.
//   • When we add the AI-deep variant (Round A3.3), it slots in as a
//     sibling function with the same return contract.
//   • If dictionaryapi.dev disappears, swapping providers is a one-file
//     change.
//
// Return contract (lookupDictionary):
//   { ok: true,  data: { partOfSpeech, definition, examples: string[] } }
//   { ok: false, error: "human-friendly message" }
//
// What we deliberately do NOT do here:
//   • Translate to Spanish (dictionaryapi.dev doesn't offer that — by
//     design the user writes the translation themself, see A3.2 notes).
//   • Cache results in localStorage. The free API is fast (<300ms) and
//     caching would complicate the storage shape. Easy to add later if
//     needed.
//   • Retry on failure. A 404 means "no definition" and shouldn't
//     retry; a network blip is rare. We surface the error and let the
//     user retry by clicking the button again.

const ENDPOINT = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Maximum length of the query string we'll send. Avoids accidentally
// querying with paragraph-pasted text.
const MAX_QUERY = 80;

// Maximum number of examples to surface in the UI. The dictionary often
// returns 5-10 with varying quality — we pick the first two non-empty.
const MAX_EXAMPLES = 2;

/**
 * Look up an English word against dictionaryapi.dev.
 *
 * @param {string} word - The English word/phrase to look up.
 * @param {object} [opts]
 * @param {AbortSignal} [opts.signal] - Optional fetch abort signal so
 *   the UI can cancel a pending request if the user closes the panel.
 * @returns {Promise<
 *   | { ok: true, data: {
 *       partOfSpeech: string,
 *       definition:   string,
 *       examples:     string[],
 *     } }
 *   | { ok: false, error: string }
 * >}
 */
export async function lookupDictionary(word, opts = {}) {
  const query = typeof word === "string" ? word.trim() : "";
  if (!query) {
    return { ok: false, error: "Type a word first." };
  }
  if (query.length > MAX_QUERY) {
    return { ok: false, error: "Word is too long to look up." };
  }

  let response;
  try {
    response = await fetch(ENDPOINT + encodeURIComponent(query), {
      signal: opts.signal,
    });
  } catch (e) {
    // Network errors, CORS, offline, aborted — we collapse them into
    // one friendly message. The user can retry by clicking again.
    if (e?.name === "AbortError") {
      return { ok: false, error: "Lookup cancelled." };
    }
    return {
      ok: false,
      error: "Couldn't reach the dictionary. Check your connection and try again.",
    };
  }

  if (response.status === 404) {
    return {
      ok: false,
      error: `No definition found for "${query}". You can fill it in manually.`,
    };
  }
  if (!response.ok) {
    return {
      ok: false,
      error: `Dictionary returned an unexpected error (${response.status}).`,
    };
  }

  let json;
  try {
    json = await response.json();
  } catch {
    return { ok: false, error: "Dictionary response could not be read." };
  }

  // dictionaryapi.dev returns an array of entries. We mine the first
  // entry that has a meaning we can use. Each entry has a list of
  // `meanings`, each with `partOfSpeech` and `definitions[]`.
  if (!Array.isArray(json) || json.length === 0) {
    return {
      ok: false,
      error: `No definition found for "${query}". You can fill it in manually.`,
    };
  }

  let partOfSpeech = "";
  let definition   = "";
  const examples   = [];

  outer: for (const entry of json) {
    if (!entry || !Array.isArray(entry.meanings)) continue;
    for (const meaning of entry.meanings) {
      const pos = (meaning.partOfSpeech || "").trim();
      const defs = Array.isArray(meaning.definitions) ? meaning.definitions : [];
      // Pick the first definition we can use. Once we've locked in the
      // first definition's part of speech, we keep collecting examples
      // from any meaning to give the user more contextual variety.
      for (const def of defs) {
        const text = (def?.definition || "").trim();
        if (text && !definition) {
          definition   = text;
          partOfSpeech = pos;
        }
        const ex = (def?.example || "").trim();
        if (ex && !examples.includes(ex)) {
          examples.push(ex);
          if (examples.length >= MAX_EXAMPLES && definition) break outer;
        }
      }
    }
  }

  if (!definition) {
    return {
      ok: false,
      error: `Found "${query}" but couldn't extract a clean definition.`,
    };
  }

  return {
    ok: true,
    data: {
      partOfSpeech: normalisePartOfSpeech(partOfSpeech),
      definition,
      examples: examples.slice(0, MAX_EXAMPLES),
    },
  };
}

// dictionaryapi.dev returns things like "noun", "verb", "exclamation",
// "interjection", etc. We capitalise them for display as a chip and
// leave them otherwise as-is so the UI doesn't lie about classification.
function normalisePartOfSpeech(pos) {
  if (!pos) return "";
  return pos.charAt(0).toUpperCase() + pos.slice(1).toLowerCase();
}
